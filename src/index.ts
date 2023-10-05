import { Server } from "./server";

let server = new Server().app; // start server
let port = 3000; // port to listen

server.listen(port, ()=> {
    console.log(`Server is running at port ${port}`);
});









