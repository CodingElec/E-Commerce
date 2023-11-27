import {Router} from "express";
import { UserController } from "../controllers/UserController";
import { body,validationResult } from "express-validator";
import { UserValidators } from "../validators/UserValidators";
import { GlobalMiddleWare } from "../middlewares/globalMiddleware";

class userRouter {
    public router: Router;

    constructor(){
        this.router = Router();
        this.getRoutes();
        this.postRoutes();
        this.patchRoutes();
        this.putRoutes();
        this.deleteRoutes();
   

    }

    getRoutes () {
                      
      //  this.router.get('/test', UserController.test1, UserController.test2);
        //this.router.get('/send/verification/email',GlobalMiddleWare.auth, UserValidators.checkResetPasswordEmail(), UserController.resendVerificationEmail,GlobalMiddleWare.checkError);
        this.router.get('/send/verification/email',GlobalMiddleWare.auth, UserController.resendVerificationEmail);
        this.router.get('/login', UserValidators.login(),GlobalMiddleWare.checkError, UserController.login);
        this.router.get('/send/reset/password/token', UserValidators.checkResetPasswordEmail(),GlobalMiddleWare.checkError,UserController.sendResetPasswordOTP);
        this.router.get('/verify/resetPasswordToken', UserValidators.verifyResetPasswordToken(),GlobalMiddleWare.checkError,UserController.verifyResetPasswordToken);
        this.router.get('/profile',GlobalMiddleWare.auth,UserController.profile);
    }

    postRoutes () {
        this.router.post('/signup', 
        UserValidators.signup(), 
        GlobalMiddleWare.checkError, 
        UserController.signup);

        
    }

    patchRoutes () {
        this.router.patch('/verify/emailOtp', 
        GlobalMiddleWare.auth, 
        UserValidators.verifyUserEmailToken(),
        GlobalMiddleWare.checkError,        
        UserController.verifyUserEmailToken);

        this.router.patch('/reset/password', 
        UserValidators.resetPassword(),
        GlobalMiddleWare.checkError,
        UserController.resetPassword);

        this.router.patch('/update/phone',
        GlobalMiddleWare.auth,
        UserValidators.verifyPhoneNumber(),
        GlobalMiddleWare.checkError,
        UserController.updatePhoneNumber);

        this.router.patch('/update/profile',
        GlobalMiddleWare.auth,  
        UserValidators.verifyUserProfile(),
        GlobalMiddleWare.checkError,
        UserController.updateUserProfile);
    }

    putRoutes () {}

    deleteRoutes () {}

}

export default new userRouter().router;