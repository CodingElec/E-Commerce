import * as nodeMailer from 'nodemailer';
import * as sendGrid from 'nodemailer-sendgrid-transport';
import { getEnvironmentVariables } from '../environments/environment';

export class NodeMailer{
    
    static initiateTransport(){
       return nodeMailer.createTransport(sendGrid({
            auth: {
                api_key: getEnvironmentVariables().sendgrid_api_key
            }
        })
        
        );
    }

    static sendMail(data: {to: [string], subject: string, html:string}): Promise<any>{
      
        return NodeMailer.initiateTransport().sendMail({
            from: 'rfmldonotreply@gmail.com',
            to: data.to,
            subject: data.subject,
            html: data.html
        })
    }
}

