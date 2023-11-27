import { query } from "express";
import User from "../models/User";
import { Utils } from "../utils/utils";
import { NodeMailer } from "../utils/NodeMailer";
import { PasswordHandler } from "../utils/EncryptPassword";
import { UtilsJWT } from "../utils/jwt";



export class UserController {

    static async signup (req,res,next){
        
        

        const name = req.body.name;
        const phone = req.body.phone;
        const email = req.body.email;
        
        const type = req.body.type;
        const status = req.body.status;
        const verification_token = Utils.generateVerificationToken();
              
      

        try{
            
            const hash = await PasswordHandler.encrypt(req.body.password);
            const data = {
                email,
                verification_token,
                verification_token_time: Date.now() + new Utils().MAX_TOKEN_TIME,
                password:hash,
                name,
                phone,
                type,
                status
            };
            
            let user = await new User(data).save();
            


            const payload = {
                aud: user._id,
                email: user.email,
                type: user.type
                
            }
            const token = UtilsJWT.jwtSign(payload);
                    
            res.json({
                token,
                user
            });
            
            //send email to user for verification
           
        //    await NodeMailer.sendMail({
        //         to: [email],
        //         subject: 'Email Verification',
        //         html: `<h1> Your OTP is ${verification_token}<h1>`
        //     });
            
       
        } catch(e){
            next(e);
        }
    }

    static test1 (req,res,next){
        console.log ('test');
            (req as any).msg = 'This is a test';
            next();
        }

    static test2 (req,res) {
        res.status(200).send((req as any).msg); 
     
    }

    static async verifyUserEmailToken(req, res, next) {
        const verification_token = req.body.verification_token;
        const email = req.user.email;
        try{
            const user = await User.findOneAndUpdate(
                {
                    email: email,
                    verification_token: verification_token,
                    verification_token_time: {$gt: Date.now()},
                    // type:'user'||'admin',
                },
                {
                    email_verified:true,
                    updated_at: new Date(),
                },
                {
                    new:true,
                }                   
            
            )
            if (user){
                res.send(user);
            } else {                
                throw new Error('Email verification Token is Expired. Please try again...');
            }
        } catch(e){
            next(e);
        }
       
    }

    static async resendVerificationEmail(req,res,next){  
        const verification_token = Utils.generateVerificationToken();
        const email = req.user.email;
        try{
            const user = await User.findOneAndUpdate(
                {
                    email:email,                    
                },
                {
                    updated_at: new Date(),
                    verification_token: verification_token,
                    verification_token_time: Date.now() + new Utils().MAX_TOKEN_TIME,
                }
                
            );

            if(user) {
                res.json({success:true});
        //    await NodeMailer.sendMail({
        //         to: [user.email],
        //         subject: 'Resend Email Verification',
        //         html: `<h1> Your OTP is ${verification_token}<h1>`
        //     });
       
            } else {
                throw new Error ('USer does not exist.')
            }

        } catch (e){
            next (e)
        }
    }

    static async login(req, res, next){
        const user = req.user
        const password = req.query.password;
       

        const data = {
            password,
            encrypt_password: user.password
        };
        try {            
               await PasswordHandler.comparePassword(data);
                const payload = {
                    aud: user._id,
                    email: user.email,
                    type: user.type
                    
                }
                const token = UtilsJWT.jwtSign(payload);
                
                res.json({
                    token,
                    user
                });
            } catch(e){
                next(e);
            } 
    }

    static async sendResetPasswordOTP(req,res,next){
        const reset_password_token = Utils.generateVerificationToken();
        const email = req.query.email;
      
        try{
            const user = await User.findOneAndUpdate(
                {
                    email:email,                    
                },
                {
                    updated_at: new Date(),
                    reset_password_token: reset_password_token,
                    reset_password_token_time: Date.now() + new Utils().MAX_TOKEN_TIME
                }
                
            );

            if(user) {
                res.json({success:true});
        //    await NodeMailer.sendMail({
        //         to: [user.email],
        //         subject: 'Reset Password Email Verfification OTP',
        //         html: `<h1> Your OTP is ${reset_password_token}<h1>`
        //     });
        
            } else {
                throw new Error ('USer does not exist.')
            }

        } catch (e){
            next (e)
        }
    }

    static verifyResetPasswordToken(req,res,next){

        try{
            res.json({success:true})
        }catch(e){
            next(e);
        }

    }

    static async resetPassword(req,res,next){
        const user = req.user;
        const new_password = req.body.new_password;

      
        try{
            const encrypted_password = await PasswordHandler.encrypt(new_password); 
            const updateduser = await User.findByIdAndUpdate(
                user._id,                
                {
                    updated_at: new Date(),
                    password: encrypted_password,
                }, {new:true}
                
            );

            if(updateduser) {
                res.send(updateduser);
        //    await NodeMailer.sendMail({
        //         to: [user.email],
        //         subject: 'Reset Password Email Verfification OTP',
        //         html: `<h1> Your OTP is ${reset_password_token}<h1>`
        //     });
        
            } else {
                throw new Error ('User does not exist.')
            }

        } catch (e){
            next (e)
        }
    }


    static async profile(req,res,next) {
        const user = req.user;   
                   
        try{
            const profile = await User.findById(user.aud);     
            if (profile) {
                res.send(profile);
            } else {
                throw new Error('User does not exist.');
            }             
            } catch (e){
            next (e)
        }
    }

    static async updatePhoneNumber(req,res,next){
        const user = req.user;
        const phone = req.body.phone;

        try{
           const userData = await User.findByIdAndUpdate(
            user.aud,
            {
                phone: phone,
                updated_at: new Date(),
            },
            {new: true}
           )
           res.send(userData);
        } catch(e){
            next(e);
        }

    }

    static async updateUserProfile(req,res,next){
        const user = req.user;
        const phone = req.body.phone;
        const new_email = req.body.email;
        const plain_password = req.body.password;
        const verification_token = Utils.generateVerificationToken();

        try{
           const userData = await User.findById(user.aud);
           if(!userData) throw new Error('User does not exist.');
           await PasswordHandler.comparePassword({
            password: plain_password,
            encrypt_password: userData.password,
           })
           const updatedUser = await User.findByIdAndUpdate(
            user.aud,
            {
                phone: phone,
                email: new_email,
                updated_at: new Date(),
                email_verified: false,
                verification_token: verification_token,
                verification_token_time:  Date.now() + new Utils().MAX_TOKEN_TIME,
                
                
            },
            {new:true});
            const payload = {
                aud: user.aud,
                email: updatedUser.email,
                type: updatedUser.type
                
            }
            const token = UtilsJWT.jwtSign(payload);
                    
            res.json({
                token,
                updatedUser
            });
            
            //send email to user for verification
           
        //    await NodeMailer.sendMail({
        //         to: [email],
        //         subject: 'Email Verification',
        //         html: `<h1> Your OTP is ${verification_token}<h1>`
        //     });



        } catch(e){
            next(e);
        }

    }


   

}


    
