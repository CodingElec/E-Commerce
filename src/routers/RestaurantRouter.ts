import { Router } from "express";
import { RestaurantController } from "../controllers/RestaurantController";
import { GlobalMiddleWare } from "../middlewares/globalMiddleware";
import { Utils } from "../utils/utils";
import { RestaurantValidators } from "../validators/RestaurantValidators";
import { ImgHandler } from "../utils/ImageHandling";

class RestaurantRouter {

    public router: Router;

    constructor() {
        this.router = Router();
        this.getRoutes();
        this.postRoutes();
        this.patchRoutes();
        this.putRoutes();
        this.deleteRoutes();
    }

    getRoutes() {
        this.router.get('/getRestaurants', GlobalMiddleWare.auth, GlobalMiddleWare.adminRole, RestaurantController.getRestaurants);
        this.router.get('/nearbyRestaurants', GlobalMiddleWare.auth, RestaurantValidators.getNearbyRestaurants(), GlobalMiddleWare.checkError, RestaurantController.getNearbyRestaurants);
        this.router.get('/searchNearbyRestaurants', GlobalMiddleWare.auth, RestaurantValidators.searchNearbyRestaurants(), GlobalMiddleWare.checkError, RestaurantController.searchNearbyRestaurants);
    }

    postRoutes() {
        this.router.post('/create', GlobalMiddleWare.auth, GlobalMiddleWare.adminRole, new ImgHandler().multer.single('restaurantImages'), RestaurantValidators.addRestaurant(), GlobalMiddleWare.checkError, RestaurantController.addRestaurant);
    }

    patchRoutes() {
    }

    putRoutes() {}

    deleteRoutes() {}

}

export default new RestaurantRouter().router;