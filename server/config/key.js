//환경변수(process.env.NODE_ENV)를 구분하여 어떤 js을 사용할지 정해준다. production or development
if(process.env.NODE_ENV==='production'){
    module.exports=require('./prod.js');
}else{
    module.exports=require('./dev.js')
}