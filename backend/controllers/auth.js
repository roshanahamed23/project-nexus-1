import jwt from "jsonwebtoken"

export const auth = (req,res)=>{
    const {token}= req.body;
    if(token){
     try{
        const decode = jwt.verify(token,process.env.SECRET_KEY);
        res.json({
            auth:true,
            data: decode
        })
     }catch(err){
        res.json({
            auth: false,
            data:err.message
        })
     }
    }
    else{
        res.json({
            auth: false,
            data:"token not found in the request"
            })
        }
}
