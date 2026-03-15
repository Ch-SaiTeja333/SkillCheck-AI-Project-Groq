import jwt from 'jsonwebtoken';
const {verify}=jwt;
export const verifyToken=(req,res,next)=>{
    try {
        // console.log("cookies:", req.cookies);
        let userToken=req.cookies?.token;
        if(userToken == null){
            console.log("please login...")
            return res.status(400).json({
                message:'please login...'
            })
        }
        try {
            let decoded=verify(userToken,'abcde');
            req.user=decoded;
            // console.log(req.user);
            next();
        } catch (err) {
            console.log(err)
            return res.status(400).json({message:`session expired please login again...`});
        }
    } catch (err) {
        return res.status(401).json({
            message:`err in verifyToken middleware [BACKEND]...${err.message}`
        });
    }
}