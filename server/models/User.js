const mongoose=require('mongoose')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
//salt는 받은 password에 다시 몇가지 단어를 추가하여 암호화한다.
let salt=10
const userSchema = mongoose.Schema({

    name:{
        type: String,
        maxlength : 50
    },
    email:{
        type:String,
        trim:true,
        //trim은 공백삭제
        unique:1
    },
    password:{
        type:String,
        maxlength:50
    },

    //권한(관리자, 유저, 클라이언트 등등,,의 권한관리)
    role:{
        type:Number,
        default:0
    },
    image:String,

    //유효성검사용 토큰
    token:{
        type:String
    },

    //토큰의 유효시간(기간)
    tokenExp:{
        type:Number
    }
})

//비밀번호 암호화///////////////////////////////////////////////////////
//.pre는 어떠한 명령을 실행하기전(pre)에 지정한 펑션을 수행한다.
userSchema.pre('save',function(next){
    let user= this;
    //this 해당 스키마를 가르킴.
    //패스워드 스키마가 바뀔때만
    if(user.isModified('password')){
        //1.솔트를 생성하고 생성된 솔트 콜백함수로 받아 암호화에 더한다.
        bcrypt.genSalt(salt,function(err,salt){
            //에러처리 : 솔트 생성시 에러가나면 에러메세지와함께 다음으로 넘긴다
            if(err) return next(err)
            
            bcrypt.hash(user.password,salt,function(err,hash){
                
                //에러처리 : 암호 생성시 에러가나면 에러메세지와함께 다음으로 넘긴다
                if(err) return next(err)
                
                //2.이후 암호화한뒤 스키마의 password의 값을 바꾼뒤 다음으로 넘긴다.
                user.password=hash
                
                next();

            })
        })
    } else{
        //패스워드가 바뀌지 않는다면 그냥 다음으로 넘긴다.
        next()
    }
  
})
/////////////////////////////////////////////////////////////////////////////

//로그인시 비밀번호 비교///////////////////////
userSchema.statics.comparePassword=function(plainPassword,bcryptPassword,cb){
    //플레인 패스워드를 가져온다.
    
    bcrypt.compare(plainPassword,bcryptPassword, function(err,isMatch){
    
        //각각의 결과를 콜백 파라미터에 담는다(에러가 날경우 에러메세지만, 에러가 없을경우 그 결과를 담는다.)
        if(err) return cb(err)
        cb(null, isMatch)
    })
}
////////////////////////////////////////////////////////////////////////////

//로그인 완료시 토큰 생성/////////////////////////////////////////////////
userSchema.statics.generateToken=function(userid,cb){
    let user=this;
    //jsonwebtoken을 이용해서 토큰 발행 추후 loginToken으로 _id의 값을 알아낼 수 있다.
    let token = jwt.sign(userid.toHexString(),'loginToken')
    cb(token)
}
///////////////////////////////////////////////////////////////////////////

//권한 관련 token 가져오기////////////////////////////////////////////////

userSchema.statics.findByToken=function(token,cb){
    let user = this;
    jwt.verify(token,'loginToken',(err,decoded)=>{
        //유저아이디를 이용해서 유저를 찾은 다음 클라이언트에 저장된 토큰과 DB에 저장된 토큰이 일치하는지 확인
        //토큰은 최초 생성시 유저정보가 들어있는 문서의 _id와 + 토큰명으로 기록되어있다. 때문에 토큰명으로 디코드한뒤 순수한 _id를 가져온다. 
        user.findOne({ _id : decoded, token : token}, (err,user)=>{
            if(err) return cb(err)
            cb(null,user)
        })
    })
    //토큰일 decode한다.
}

////유저 정보 변경////////////////////////////////////////
userSchema.statics.modifyUser=function(token,modifyInfo,cb){
    
    let user =this;
    
    jwt.verify(token,'loginToken',(err,decoded)=>{
        if(err) return cb(err)
        user.findOneAndUpdate({_id:decoded, token:token},modifyInfo,(err,modifyInfo)=>{
            if(err) return cb(err)
            cb(null,modifyInfo)
        })
    })
}
///////////////////////////////////////////////////////////

//유저 탈퇴////////////////////////////////////////////////
//userSchema.function.펑션 명 은 인스턴스 선언시에만 사용가능
userSchema.statics.deleteUser=function(token,cb){
    
    let user =this;

    jwt.verify(token,'loginToken',(err,decoded)=>{
        console.log(token)
        if(err) return cb(err)
        user.findOneAndDelete({_id:decoded, token:token},(err,info)=>{
            if(err) return cb(err)
            return cb(null,info)
        })
    })
}
///////////////////////////////////////////////////////////////
const User =mongoose.model('User',userSchema)

module.exports={User}