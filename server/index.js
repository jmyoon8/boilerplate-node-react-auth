const express= require('express');
const app = express();
const port=5000;
const config=require('./config/key')
const mongoose = require('mongoose')
const cookieParser=require('cookie-parser')

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect(config.mongoDBURI).then(console.log("mongoDB Connect success...")).catch((err)=>console.log(err))

const userRouter=require('./router/UserRouter');

//post방식의 값을 받을수있게한다
app.use(express.json())
//쿠키파서
app.use(cookieParser())
//x-www-form-unlencoded형식의 데이터를 받을 수 있게 한다.
app.use(express.urlencoded({ extended: true }));

app.use('/user',userRouter)

app.post('/hello',(req,res)=>{

    res.send("안녕하세요~")
})


app.listen(port,()=>{
    console.log(`server localhost:${port} listen`)
})



