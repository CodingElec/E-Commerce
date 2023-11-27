import {Router} from "express";
import { GlobalMiddleWare } from "../middlewares/globalMiddleware";
import { BannerValidators } from "../validators/BannerValidators";
import { BannerController } from "../controllers/BannerController";
import { ImgHandler } from "../utils/ImageHandling";

class BannerRouter {
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
        this.router.get('/banners',GlobalMiddleWare.auth, BannerController.getBanners);                      
       
    }

    postRoutes () {
        this.router.post('/create',
        GlobalMiddleWare.auth,
        GlobalMiddleWare.adminRole,
        new ImgHandler().multer.single('banner'),
        BannerValidators.addBanner(), 
        GlobalMiddleWare.checkError, 
        BannerController.createBanner);
        
        
    }

    patchRoutes () {
        
    }

    putRoutes () {}

    deleteRoutes () {}

}

export default new BannerRouter().router;