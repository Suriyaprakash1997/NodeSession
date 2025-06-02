const fs = require("fs");

if (fs.existsSync("./Main")) {
  fs.rmdir("./Main", (err) => {
    if (err) throw err;
    console.log("Directory removed successfully");
  });
}

if (!fs.existsSync("./Main")) {
  fs.mkdir("./Main", (err) => {
    if (err) throw err;
    console.log("Directory created successfully");
  });
}

process.on("exit", (err) => {
  console.log("Process exited with code:", err);
  process.exit(1);
});
