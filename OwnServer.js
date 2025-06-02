const http = require("http");
const PORT = 3000;
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/html" });

  fs.readFile(path.join(__dirname, "index.html"), (err, data) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.write("404 Not Found");
    } else {
      res.write(data);
    }
    res.end();
  });

});

server.listen(PORT, (error) => {
  if (error) {
    console.log(`error while running`, error);
  } else {
    console.log(`Server is running on port ${PORT}`);
  }
});
