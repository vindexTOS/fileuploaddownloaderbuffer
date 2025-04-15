const http = require("http");
const fs = require("fs");
const crypto = require("crypto");
const fileType = require("./helperFunction.js");
const server = http.createServer((req, res) => {
  if (req.method === "POST" && req.url === "/upload") {
 
    const contentType = req.headers["content-type"];
    // console.log("🧾 Content-Type:", contentType);
    let body = "";
  
    req.setEncoding("binary");  
    req.on("data", chunk => {
        // console.log(chunk)
     body += chunk;
  
    });

 req.on("end", (()=>{

   let type = fileType(body)
   if(type === "Unknown"){
    console.log("Unknown file type")
    return
   }
   const randomName = crypto.randomUUID({  disableEntropyCache:false})
   fs.writeFileSync(`${randomName}.${type}`, body, err => {
    if(err){
         throw err
    }
}
  
)
    // console.log("bopdyyyyyyyyy.....................", body)
 }))
   
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Hello, World!\n");
  }
});

server.listen(2300, () => {
  console.log("LISTENING on http://localhost:2300");
});
