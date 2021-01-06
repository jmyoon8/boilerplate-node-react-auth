//여기서 dev상티와 production 상태를 분기처리해준다.
//만약 프로젝트가 배포전 개발단개면 아래 변수는 development가 되고
//프로젝트가 배포후 프로덕트 상태이면 production으로 나온다.

if(process.env.NODE_ENV==='production'){
    //프로덕션상태면 prod에서(해로쿠의 키값을 가져오는 형식)
    module.exports=require('./prod')
}else{

    module.exports=require('./dev')
    
}