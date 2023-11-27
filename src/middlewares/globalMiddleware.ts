import { validationResult } from "express-validator";
import { UtilsJWT } from "../utils/jwt";

export class GlobalMiddleWare {

    static checkError(req,res,next){

        const errors = validationResult(req);

        if (!errors.isEmpty()){
            next (new Error(errors.array()[0].msg))
         } else {
            next();
         }
    }

    static async auth(req,res,next){
        const header_auth = req.headers.authorization; // bearer token
        const token = header_auth ? header_auth.slice(7, header_auth.length) : null;
       

        try {
            
            req.errorStatus = 401;
            if(!token) next(new Error('User does not exist!'))
            const decoded = await UtilsJWT.jwtVerity(token)
            req.user = decoded;
            console.log(req.user)
            next()
        } catch(e) {
            next(e)
        }
    }

    static  adminRole(req,res,next){
       const user = req.user;            
        if(user.type !== 'admin'){
            req.errorStatus = 401;
            next(new Error('You are an Unauthorised User'))
        }            
        next();
    }

    
}
