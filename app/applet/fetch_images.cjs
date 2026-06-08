const fs = require("fs");
const https = require("https");
const path = require("path");

function download(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      console.log(url, res.statusCode);
      if (res.statusCode === 200) {
        const file = fs.createWriteStream(dest);
        res.pipe(file);
        file.on("finish", () => {
          file.close();
          resolve(true);
        });
      } else {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          console.log("Redirecting to", res.headers.location);
          resolve(download(res.headers.location, dest));
        } else {
          resolve(false);
        }
      }
    }).on("error", reject);
  });
}

(async () => {
  const images = [
    "logo.png",
    "logo.jpg",
    "logo.svg",
    "logo.webp",
    "assets/logo.png",
    "assets/logo.svg",
    "images/logo.png"
  ];
  for (const img of images) {
    const destPath = path.join(__dirname, "public", "images", "logo.png");
    // Ensure dir exists
    fs.mkdirSync(path.dirname(destPath), { recursive: true });
    
    // Write temporarily to another extension if needed
    const tempPath = path.join(__dirname, "public", "images", "logo_temp");
    
    const success = await download(`https://pinnacle.creativefringe.digital/${img}`, tempPath);
    if (success) {
      console.log(`Downloaded ${img}`);
      fs.renameSync(tempPath, destPath);
      break;
    }
  }
})();
