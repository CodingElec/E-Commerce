import {Router} from "express";
import { GlobalMiddleWare } from "../middlewares/globalMiddleware";
import { CityValidators } from "../validators/CityValidators";
import { CityController } from "../controllers/CityController";

class CityRouter {
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
        this.router.get('/cities', CityController.getCities);                      
       
    }

    postRoutes () {
        this.router.post('/create',
        CityValidators.addCity(), 
        GlobalMiddleWare.checkError, 
        CityController.addCities);
    }

    patchRoutes () {
        
    }

    putRoutes () {}

    deleteRoutes () {}

}

export default new CityRouter().router;