import path from "path";
import fs from "fs";

const __dirName = import.meta.dirname;
const filePath = path.join("testTexts","Test.txt")
const AnotherFolder = path.join(__dirName,"..","components","TestFile.txt")
console.log(`Hello World`);

// Learning File Path Is Very Important,
// cuz in mac and windows, the file path system works different
// like in matchesGlob, the file path looks like this -> react-learning/backend/testTexts/Test.txt, the forward slash(/)
// and in windows, it looks like this -> react-learning\backend\testTexts\Test.txt the backward slash(\)
// so, if a user opens it in windows, but we set as forward slash, the website crash
// the path module detects your computer OS and change the file path to that 

fs.readFile(filePath,"utf-8",(error,data)=>{
    if(error){
        console.log(`Error Happened : ${error}`);
        return;
    }
    console.log(`File Data : ${data}`)
})
fs.readFile(AnotherFolder,"utf-8",(error,data)=>{
    if(error){
        console.log(`Error : ${error}`);
        return;
    }
    console.log(`Component File Data : ${data}`);
    
})