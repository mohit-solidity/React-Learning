import http from "http";
import data from "./data.json" with {type: "json"};

const server = http.createServer((req,res)=>{
    if(req.url==="/"){
        res.end(`Home Page`);
        return;
    }
    if(req.url==="/users" && req.method==="GET"){
        res.setHeader("content-type","application/json")
        res.statusCode = 200;
        res.end(`Data : ${JSON.stringify(data)}`)
        return
    }
    if(req.url.startsWith("/users/") && req.method==="GET"){
        const stringNumber = req.url.split("/")[2];
        const id = Number(stringNumber);
        const user = data.find(users=>users.id===id);
        if (!user) {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "User not found" }));
            return;
        }
        console.log(`User : ${user} And Id : ${id}`)
        res.statusCode = 200;
        res.end(JSON.stringify(user))
        return
    }
})
server.listen(3000)