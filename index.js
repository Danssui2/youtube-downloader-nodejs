const express = require("express");
const app = express();

const ytdl = require("ytdl-core");
const ytsr = require('ytsr');

app.get("/", (req, res) => {
	res.send("Api is active!");
});

app.get("/down", async (req, res) => {
  if (ytdl.validateURL(req.query.url)) {
    
    const metainfo = await ytdl.getBasicInfo(req.query.url);
    res.json({"info": metainfo.videoDetails, "link": metainfo.formats});
    
    // Write metadata into storage
    //let data = JSON.stringify(metainfo, null, 2);
    //fs.writeFileSync('data.json', data);
    
  } else {
    const filters1 = await ytsr.getFilters('' + req.query.url);
    const filtered = filters1.get('Type').get('Video');

    const searchRes = await ytsr('' + filtered.url, {limit: 8});
    res.json({"searchres": searchRes.items});
  }
});

app.listen(5000, () => {
	console.log("Server is running on http://localhost:5000");
});
