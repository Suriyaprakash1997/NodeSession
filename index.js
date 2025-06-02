const logEvents = require('./logEvent');
const MyEmitter = require('events')


class emiter extends MyEmitter{}

const myEmiter = new emiter()


myEmiter.on('logs',(msg)=>{
    logEvents(msg);
})

myEmiter.emit('logs','log event created')