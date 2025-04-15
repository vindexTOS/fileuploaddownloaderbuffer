function fileType(body) {
    const boundaryIndex = body.indexOf("\r\n\r\n");
    console.log(boundaryIndex)
    if (boundaryIndex === -1) {
      console.log("No binary content found.");
      return;
    }
  
    // Get the binary data after headers
    const binaryBody = body.slice(boundaryIndex + 4); // skip \r\n\r\n
    const buffer = Buffer.from(binaryBody, "binary");
  
    const signature = buffer.toString("hex", 0, 4).toUpperCase();
    let type = "Unknown";
  
    if (signature === "89504E47") type = "PNG";
    else if (signature.startsWith("FFD8FF")) type = "JPG";
    else if (signature === "47494638") type = "GIF";
    else if (signature === "25504446") type = "PDF";
    else if (signature === "504B0304") type = "ZIP";
    else type = "Unknown";
  
    console.log("🔍 Signature:", signature);
    console.log("📁 Detected Type:", type);
    return type
  }
  
  module.exports = fileType;
  