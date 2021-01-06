const express=require('express')
const userRouter= express.Router();
const {User}=require('../models/User')
const {auth}=require('../middleware/auth')


userRouter.post('/register',(req,res)=>{
    
    //회원가입이 필요한 정보들을 client에서 가져오면 그것들을 DB에 insert한다.
    //body에서 올라오는 password를 비밀번호 암호화시켜놔야한다 때문에 schema에서 그 설정을 해준다.
    User(req.body).save((err,userInfo)=>{
        if(err) return res.json({success: false, err})
        return res.status(200).json({success : true, userInfo})
    });
   
})

userRouter.post('/logIn',(req,res)=>{
    
    //요청된 이메일을 데이터베이스에서 있는지 찾는다.
     User.findOne({email : req.body.email},(err,user)=>{
        
        //찾아온값이 없다면
        if(!user){
            return res.json({loginSuccess: false,
            message : "제공된 이메일에 해당하는 유저가 없습니다."}) 
        }

        //요청한 이메일이 데이터베이스에있다면 비밀번호가 같은지 찾아본다.
        User.comparePassword(req.body.password, user.password,(err,isMatch)=>{
            
            //비밀번호가 틀렸으면?
            if(!isMatch)
                return res.json({loginSuccess :false , message : '비밀번호가 틀렸습니다.'})
                
            //비밀번호 까지 맞다면 토큰을 생성후 저장한다.
            User.generateToken(user._id,(token)=>{
                if(err) return res.status(400).send(err)
                
                //생성된 토큰을 DB에 저장
                User.findOneAndUpdate({_id:user._id},{token:token},(err,result)=>{
                    if(err) return res.json({err:err})
                   
                    //생성된 토큰은 쿠키에도 저장한다.
                    return res.cookie("loginToken",token)
                    .status(200)
                    .json({loginSuccess: true, userId:user._id})
                })
            })
        })
    })
})

userRouter.get('/auth',auth,(req,res)=>{
    
    res.status(200).json({
        _id:req.user._id,
        isAdmin : req.user.role===0?false:true,
        isAuth: true,
        eamil : req.user.email,
        lastname : req.user.lastname,
        role:req.user.role,
        image:req.user.image
    })
})

userRouter.post('/logOut', auth, (req,res)=>{
    //auth을 통해 인증이 완료되면 req객체에 user변수에 로그인된 회원의 정보가 들어있다.
    User.findOneAndUpdate({_id:req.user._id},{token:""},(err,user)=>{
        if(err) return res.json({success: false, err});
        res.clearCookie('loginToken').status(200).send({
            success:true
        })
        
      
    })
})

userRouter.post('/modify',auth,(req,res)=>{

    User.modifyUser(req.token, req.body.modifyInfo, (err,modifiedInfo)=>{
        if(err) return res.json({modify:err})
        return res.json({modifiedInfo:modifiedInfo})
    })
})

userRouter.post('/delete',auth,(req,res)=>{
    User.deleteUser(req.token,(err,info)=>{
        console.log(err)
        if(err) return res.json({deleteUser:false})
        return res.json({deleteUser:true})
    })
})

module.exports=userRouter