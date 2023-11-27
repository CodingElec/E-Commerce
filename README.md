# Rest APIs for E-commerce & Food Delivery  

A fun side project building an E-commerce, like a delivery/restaurant APIs.

Parking is after building User APIs and starting restaurant/location APIs.

Mostly Typescript + MongoDB and Node-Express. 

check 
./src/models for swaggers.
./src/routers for the routes.
./src/validators and ./src/controllers should give you a good north on how to make the calls to CRUD Users, Restaurants, Cities and Banners.

Users are you normal app users.
Restaurants are your adm / restaurant controllers.
Banners are a way to store the pictures I was going to use on the web app.
Cities are all about geo location of a given restaurant.

To run:

- on ./src/environments - add your mongoDB uri to  'db_uri:' on all environments.

npm start - server will be running at port 3000.
It should give you a MongoDB connection success if you add the variables correctly to the env variables.






