import * as bcrypt from 'bcryptjs'
import { promisify } from 'util';
export class PasswordHandler {

   static async encrypt(myPlaintextPassword: String) {
        
        return new Promise((resolve, reject)=> {
            bcrypt.hash(myPlaintextPassword, 10, (err, hash)=> {
                // Store hash in your password DB.
                if (err){
                    reject(err)
                } else {
                    resolve(hash);
                }
            });
        })   
    }

    static comparePassword(data :{password: string, encrypt_password}): Promise<any>{
        return new Promise((resolve, reject)=> {
            bcrypt.compare(data.password,data.encrypt_password,(err, same)=> {
                // Store hash in your password DB.
                if (err){
                    reject(err)
                } else if (!same){
                    reject (new Error('The user and password does not match'))
                    
                } else {
                    resolve(same);
                }
            });
        })   
    }

}