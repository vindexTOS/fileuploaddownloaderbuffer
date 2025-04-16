const http = require("http");
const fs = require("fs");
const crypto = require("crypto");
const os = require("os");
const path = require("path");
const fileType = require("./helperFunction.js");
const server = http.createServer((req, res) => {
  if (req.method === "POST" && req.url === "/upload") {
    const contentType = req.headers["content-type"];
    const boundary = contentType.split("boundary=")[1];
    const boundaryBuffer = Buffer.from(`--${boundary}`);

    let filename = null;
    let fileStream = null;
    let headerParsed = false;
    let leftover = Buffer.alloc(0);

    req.on("data", (chunk) => {
      const data = Buffer.concat([leftover, chunk]);

      if (!headerParsed) {
        const headerEndIndex = data.indexOf("\r\n\r\n");
        if (headerEndIndex !== -1) {
          const header = data.slice(0, headerEndIndex).toString();
          const match = header.match(/filename="(.+?)"/);

          if (!match) {
            res.writeHead(400);
            return res.end("❌ No filename found in header");
          }

          filename = match[1];
          const outputPath = path.join(__dirname, filename);
          fileStream = fs.createWriteStream(outputPath);

          const fileData = data.slice(headerEndIndex + 4);
          fileStream.write(fileData);

          headerParsed = true;
          leftover = Buffer.alloc(0);
        } else {
          leftover = data;
        }
      } else {
        // Look for boundary (end of file)
        const boundaryIndex = data.indexOf(boundaryBuffer);
        if (boundaryIndex !== -1) {
          const fileContent = data.slice(0, boundaryIndex - 4); // remove trailing \r\n--
          fileStream.write(fileContent);
          fileStream.end();
        } else {
          fileStream.write(data);
        }
      }
    });

    req.on("end", () => {
      res.writeHead(200);
      res.end(`✅ File uploaded as ${filename}`);
    });

    req.on("error", (err) => {
      console.error("❌ Upload failed", err);
      res.writeHead(500);
      res.end("❌ Upload failed");
    });
 
  }else if(req.method === "POST" && req.url === "/just"){
    // console.log("SHMEOSVLA REQUESTSHI")
   req.on("end", ()=>{
     
    res.writeHead(200, {
      "Content-Type": "application/json"
    });


   })

   res.end("HIIIIII")
  }
});

server.listen(2300, () => {
  console.log("LISTENING on http://localhost:2300");
});
