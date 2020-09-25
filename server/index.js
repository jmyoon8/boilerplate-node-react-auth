//익스프레스 모둘 가져오기
const express = require('express')
//익스프레스 옙 가져오기
const app = express()
//로컬호스트 번호 지정
const port = 5000
//바디파서는 html의 body에서 보내는 정보를 서버에서 낚아채는 기능을한다. 
const bodyParser = require('body-parser')
//쿠키파서를 가져온다.
const cookieParser = require('cookie-parser');
//application/x-www-form-urlencoded 형식의 정보를 가져옴
app.use(bodyParser.urlencoded({extended: true}));
//application/json
app.use(bodyParser.json());
app.use(cookieParser());

//인증관련 js페이지를가져온다
const {auth}=require("./middleware/auth")
//회원가입에 필요한 유저정보를 가져온다
const {User}=require("./models/User")

//몽구스 DB연결 url 비밀설정 객체
const config = require('./config/key')

//몽구스(몽고DB에 사용되는 객체)객체
const mongoose = require('mongoose')

//몽고 디비에서 가져온 url을 다음과같이 작성해준다. <password> 부분에 설정한 패스워드를 작성한다
mongoose.connect(config.mongoURI,{
  useNewUrlParser : true, useUnifiedTopology : true, useCreateIndex:true , useFindAndModify :false
}).then(()=>console.log('MongoDB connected...')).catch(err=>console.log(err))

app.get('/', (req, res) => {  res.send('Hello World! 반갑다 난 node.js다!!')})



app.get('/api/hello',(req,res)=>{
  res.send("안녕하세요")
})



app.post('/api/users/register', (req, res) => {
    //회원가입 할때 필요한 정보들을 client에서 가져오면
    //그것들을 데이터 베이스에 넣준다.
    
    //req.body는 body-parser가 body에서 가져온 정보를 가져오기떄문에 사용가능하다.
    const user = new User(req.body)
    
    //유저정보(비밀번호가 암호화된)세이브
    user.save((err,userInfo)=>{
      if(err) return res.json({success: false, err})
      return res.status(200).json({
        success : true
    })
  })  
})

//유저정보 확인(login)
app.post('/api/users/login',(req,res)=>{
  //로그인 요청된 아이디를 데이터베이터에서 찾는다.
  User.findOne({email:req.body.email}, (err,user)=>{
    //아이디가 없을경우
    if(!user){
      return res.json({
        loginSuccess : false,
        message:"제공된 이메일에 해당하는유저가 없습니다."
      })
    }

    //요청된 아이디가 데이터베이스에 있다면 비밀번호 체크
    user.comparePassword(req.body.password, (err,isMatch)=>{
      
      //비밀번호가 틀렸을때
      
      if(!isMatch)
      return res.json({loginSuccess:false, message:"비밀번호가 틀렸습니다."})
      
      
      //비밀번호까지 맞다면 해당 유저에게 TOKENS을 발행
      user.generateToken((err, user)=>{
        if(err) return res.status(400).send(err);
        //토큰을 어디다가 저장할 것인지? (쿠키, 로컬스토z리지, 세션)
        
        //키,벨류
        res.cookie("x_auth",user.token)
        .status(200)
        .json({loginSuccess:true,userId:user._id});
      })
    })
  })
})

app.post('/api/users/auth',auth,(req,res)=>{
  
  //여기까지 미들웨어를 통과해 왔다는 얘기는 Authentication 이 True라는 말(인증이 완료되었다는 말이다.)
  req.status(200).json({
    _id:req.user._id,
    isAdmin:req.user.role==0 ? false : true,
    //role이 0이면 일반 1이면 어드민 2이면 특정부서 어드민이다.
    isAuth :true,
    email : req.user.email,
    name:req.user.name,
    lastname:req.user.lastname,
    role: req.user.role,
    image:req.user.image
  })
})
//로그아웃
app.get('/api/users/logout',auth,(req,res)=>{

  User.findOneAndUpdate({_id : req.user._id},
    {token:""}
    ,(err,user)=>{
      if(err) return res.json({success:false, err});
      return res.status(200).send({
        success:true 
      })
    })
})

app.listen(port, () => { console.log(`Example app listening at http://localhost:${port}`)})