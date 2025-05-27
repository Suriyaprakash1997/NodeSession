const fs = require('fs');
const path = require('path');

const rs = fs.createReadStream(path.join(__dirname,'files','input.txt'), {
    encoding: 'utf8',
    });

const ws = fs.createWriteStream(path.join(__dirname,'files', 'output.txt'));

rs.on('data', (chunk) => {
    ws.write(chunk);
    console.log('Writing chunk completed', chunk);
});

//rs.pipe(ws);