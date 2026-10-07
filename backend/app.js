import http from "http";
import path from "path"
import fs from "fs"


const server = http.createServer((req,res)=>{
    if(req.url==="/"){
        res.end(`Home Page`)
        return
    }
    if(req.url==="/data"){
        fs.readFile("Hello.txt","utf-8",(errr,data)=>{
            if(errr){
                res.end(`Error : ${errr}`);
                return
            }
            res.end(`Data : ${data}`)
        })
        return
    }
    if(req.url==="/mohit"){
        res.end(`Mohit's Page`)
        return
    }
    res.statusCode = 404;
    res.end(`Error`)
})
server.listen(3000)