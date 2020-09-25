const mongoose= require('mongoose');
//const는 변하지않는 변수를 의미
const bcrypt =require('bcrypt');
const saltRounds=10;
const jwt=require('jsonwebtoken');
const UserSchema =mongoose.Schema({
    name:{
    type : String,
    maxlength : 50
    },
    email:{
        type:String,
        //trim 해당 컬럼에 들어오는 데이터는 공란을 제거하겠다
        trim:true,
        unique:1
    },
    password:{
        type:String,
        minlength:5
    },
    lastname:{
        type:String,
        maxlength:50
    },
    //role 권한
    role:{
        type:Number,
        default:0
    },
    image: String,

    //token 유효성관리
    token :{
        type:String
    },
    //유효성기간
    tokenExp:{
        type:Number
    }
})
//pre함수는 해당 객체가 사용되기 "전"에 실행할 행동을 정해준다.
UserSchema.pre('save',function(next){
    //this는 자신을감싸고있는 것을 의미한다 즉 UserSchema를 가르킨다.
    var user=this;
    //비밀번호 변경시에만 비밀번호를 암호화하는 조건을 걸어준다.
    if(user.isModified('password')){
    //유저정보를 save시키기전 비밀번호를 암호화 시킨다. salt를 뿌려서 
        bcrypt.genSalt(saltRounds, function(err,salt){
        //에러발생시 에러 매새지 생성
            if(err) return next(err)
            //myPlaintextPassword hash 전 순수한 비밀번호 =UserSchema의 password를 가르키자
            bcrypt.hash(user.password, salt, function(err,hash){
                if(err) return next(err)
                //hash된 비밀번호로 바꾼다.
                user.password=hash
                //next는 자신을 객체선언한 곳으로 돌아가라라는뜻
                next()
            });
            
        });
    } else{
        //비밀번호를 바꾸는 것이 아닌 것은 바로 next를 탄다.
        next()
    }
})
//패스워드 채크
UserSchema.methods.comparePassword=function(plainPassword, cb){
    //plainPassword 유저가 입력한 비밀번호와 DB에 암호화된 비밀번호(userSchema안에 passWord)가 같은지 체크해야한다.
    bcrypt.compare(plainPassword,this.password, function(err, isMatch){
        if(err)return cb(err);
        cb(null,isMatch)
    })
}
//로그인 성공시 Token제공
UserSchema.methods.generateToken=function(cb){
    var user =this;
    //jsonwebtoken을 이용해서 토큰을 생성하기 user._id는 몽구스DB에 입력된 object 아이디
    jwt.sign(user._id.toHexString(),'secretToken')//user._id+secretToken=token 생성 이후 secretToken을 키값으로 넣으면 user._id가 나온다.
    user.token=cb.token
    user.save(function(err, user){
        if(err) return cb(err)
        cb(null,user)
    })
}
//토큰을 가져와 복호화하는 과정
UserSchema.statics.findByToken=function(token,cb){
    var user = this;
    //토큰 디코드
    jwt.verify(token,'secretToken', function(err,decode){
        //유저아이디를 이용해서 유저를 찾은 다음에
        //클라이언트에서 가져온 token과 DB에 보관된 토큰이 일치하는지 확인

        user.findOne({"_id" : decoded,"token":token},function(err,user){
            if(err) return cb(err);
            cb(null,user)
        });

    })
}
//스키마를 모델(모델은 스키마담아주는 역할)로 감싸준다.
const User=mongoose.model('User',UserSchema)
//module.exports는 스키마를 다른곳에서도 상요할 수 있도록 하는 기능이다
module.exports={User}