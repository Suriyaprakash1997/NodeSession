const {format} = require('date-fns');

const {v4: uuidv4} = require('uuid');

const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

const logEvent = async(message)=>{
const logItem = `${format(new Date(), 'yyyy-MM-dd HH:mm:ss')}\t${uuidv4()}\t${message}\n`;
console.log(logItem)
console.log(message)
try{
if(!fs.existsSync('./logs')){
    await fsPromises.mkdir(path.join(__dirname,'logs'));
  }
  await fsPromises.appendFile(path.join(__dirname,'logs','eventLog.txt'), logItem);
}
catch(err){
    console.error(err);
    throw new Error('Error logging event');
  }
}


module.exports = logEvent;