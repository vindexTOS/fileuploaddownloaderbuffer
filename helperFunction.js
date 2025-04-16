function fileType(bodyBuffer) {
  if (!Buffer.isBuffer(bodyBuffer)) return "Unknown";

  const text = bodyBuffer.toString("binary");
  
   const headerEnd = text.indexOf("\r\n\r\n");
  if (headerEnd === -1) {
    console.log("❌ Multipart headers not found.");
    return "Unknown";
  }

   const binaryPart = text.slice(headerEnd + 4);
  const fileBuffer = Buffer.from(binaryPart, "binary");

  const signature = fileBuffer.toString("hex", 0, 4).toUpperCase();

  let type = "Unknown";
  if (signature === "89504E47") type = "PNG";
  else if (signature.startsWith("FFD8FF")) type = "JPG";
  else if (signature === "47494638") type = "GIF";
  else if (signature === "25504446") type = "PDF";
  else if (signature === "504B0304") type = "ZIP";

  console.log("🔍 Signature:", signature);
  console.log("📁 Detected Type:", type);
  return type;
}

  
  module.exports = fileType;
  