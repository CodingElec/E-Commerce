import { Environment } from "./environment";

export const ProdEnvironment: Environment = {
    db_uri:'mongodb+srv://fareslopes:IALw3akxfIZVm8Gu@cluster0.glgmdep.mongodb.net/?retryWrites=true&w=majority',
    jwt_secret_key: 'secretkeyproduction',
    sendgrid_api_key: '',
    gmail_auth: {
        user: '',
        pass: ''
    }
}