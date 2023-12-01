# Rest APIs for E-commerce & Food Delivery  

A side project building an E-commerce, the original idea was delivery/restaurant APIs.

Parking is after building User APIs and starting restaurant/location APIs.

Mostly Typescript + MongoDB and Node-Express. 

check 
./src/models for schemas.
./src/routers for the routes.
./src/validators and ./src/controllers should give you a good north of how to make the calls to CRUD Users, Restaurants, Cities and Banners.

Users are your normal app users.
Restaurant users are adm / restaurant controllers.
Banners are a way to store the pictures I was going to use on the web app.
Cities are all about the geo location of a given restaurant for proximity search.

To run:

- on ./src/environments - add your mongoDB uri to  'db_uri:' on all environments.

npm start - server will be running at port 3000.
It should give you a MongoDB connection success if you add the variables correctly to the env variables.






