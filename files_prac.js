//import * as fs from 'node:fs';
const fs=require('fs');
const fsPromises=require('fs').promises;
const path=require('path');

const fileOps= async()=>{
    try{
        const data=await fsPromises.readFile(path.join(__dirname,'lorem.txt'),'utf8');
        console.log(data);
        await fsPromises.unlink(path.join(__dirname,'lorem.txt'));
        await fsPromises.writeFile(path.join(__dirname,'l.txt'),'hello mister');
        await fsPromises.appendFile(path.join(__dirname,'l.txt'),'thik he ');
        await fsPromises .rename(path.join(__dirname, 'l.txt'),path.join(__dirname, 'i.txt'));
        const newdata=await fsPromises.readFile(path.join(__dirname,'i.txt'),'utf8');
        console.log(newdata);
        
    }
    catch (err){
        console.error(err);
    }
}
fileOps();



// fs.readFile(path.join(__dirname,'lorem.txt') , 'utf8',(err,data)=>{
//     if(err) throw err;
//     console.log(data.toString());
// }) 
//console.log('hello..!!!'); // files and node in general that is function and methods are asyncronous
// exit on uncaught errors

// fs.writeFile(path.join(__dirname, 'l.txt'),'noce to meet u' ,(err)=>{
//     if(err) throw err;
//     console.log('write complete');
//     // call back of write function
//     fs.appendFile(path.join(__dirname, 'l.txt'),'\nli lo ni no ' ,(err)=>{
//         if(err) throw err;
//         console.log('append complete');
//     }) 
//     // call back of append 
//     fs.rename(path.join(__dirname, 'l.txt'),path.join(__dirname, 'i.txt') ,(err)=>{
//         if(err) throw err;
//         console.log('rename complete');
//     }) 
    
// })


  


process.on ('uncaughtException',err=>{
    console.error(`there was an uncaught error: ${err}`);
    process.exit(1);
})