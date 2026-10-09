import http from "http";
import data from "./data.json" with {type: "json"};

const server = http.createServer((req,res)=>{
    if(req.url==="/"){
        res.end("Hello World Page")
    }
    if(req.url.startsWith("/findUser/") && req.method==="GET"){
        try{
            console.log(`Entered`);

            const url = new URL(req.url, `http://${req.headers.host}`)
            console.log(`URL : ${url.pathname}`);

            const stringId = req.url.split("/")[2];
            console.log(`String ID : ${stringId}`);
            
            const id = Number(stringId);
            console.log(`ID : ${id}`);
            
            const user = data.find((users)=>users.id===id);
            console.log(`User Found ? : ${JSON.stringify(user)}`);
            if(!user){
                req.statusCode = 404;
                res.end(`User Not Found`)
            }
            res.end(`User Found : \nName : ${user.name}\nID : ${user.id}`);
        }catch(err){
            req.statusCode = 404
            res.end(`UnExpected Error : ${err}`)
        }
    }
    if(req.url.startsWith("/users/") && req.method==="GET"){
        const url =new URL(req.url, `http://${req.headers.host}`)
        console.log(`URL Path Name : ${url.pathname}`)
        console.log(`Splitting : ${req.url.split("/")[2]}`);
        
        console.log(`URL Params : ${url.searchParams.get("name")}`);
        res.end(`Server Is Running /Users Page`)
    }
})

server.listen(3000);