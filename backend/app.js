import fs from "fs";

async function getData(){
    console.log(`This Is Starting of Function A`);

    const data =await fs.readFile("Hello.txt", ()=>{
        console.log(`Data : ${data}`);
        
        console.log(`This Done`);
        
    });
    console.log(`Data : ${data}`);
    
    console.log(`This Is Ending Of B`);
    
}

console.log(`A`);
getData();
console.log(`B`);
