import http from 'http'
import dotenv from 'dotenv'
import app from './app.js'

dotenv.config()


const server=http.createServer(app);

let PORT= process.env.PORT

server.listen(PORT,(err)=> {
    if(err) console.log(err);
    console.log("Server is running");
})


