import JWT from 'jsonwebtoken'

const userAuth= (req,res,next) =>{
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith("Bearer")){
        next("Auth failed")
    }

    const token = authHeader.split(' ')[1]

    try{
        const payload = JWT.verify(token,process.env.SECRET_KEY)
        req.body.user = {userId : payload.userId} 
        next()
    }
    catch(error){
        next("auth failed")
    }
}

export default userAuth