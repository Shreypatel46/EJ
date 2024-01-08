console.log('testing')

const { format }=require('date-fns');
const { v4: uuid}=require('uuid');

const fs=require('fs');
const fsPromises=require('fs').promises;
const path=require('path');

const logEvents= async(msg,logname)=>{
    const dataTime= `${format(new Date(),'yyyy-MM-dd\tHH:mm:ss')}`;
    const logOtem =`${dataTime}\t${uuid()}\t${msg}\n`;
    console.log(logOtem);
    try{
        if(!fs.existsSync(path.join(__dirname,'..','logs')))
            await fsPromises.mkdir(path.join(__dirname,'..','logs'));
        await fsPromises.appendFile(path.join(__dirname,'..','logs',logname),logOtem);
    }
    catch(err){
        console.log(err);
    }
}
module.exports=logEvents;
