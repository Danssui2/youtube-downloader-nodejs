const express = require("express");
const app = express();
const ytdl = require("ytdl-core");
const bodyParser = require("body-parser")
const cors = require("cors");

const dumpInfo = require('./data.json');

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
	res.send("Api is active!");
});

app.get("/down", async (req, res) => {
  if (ytdl.validateURL(req.query.url)) {
    const metainfo = await ytdl.getBasicInfo(req.query.url);
    //const metainfo = dumpInfo;
    //let data = JSON.stringify(metainfo, null, 2);
    //fs.writeFileSync('data.json', data);
    
    res.json({"info": metainfo.videoDetails, "link": metainfo.formats});
  } else {
    res.json({error: "Sorry, maybe you entered a wrong link"});
  }
  //console.log(info.formats);
	  /*const v_id = req.query.url.split('v=')[1];
    res.send(info.formats)*/

	/*return res.render("download", {
		url: "https://www.youtube.com/embed/" + v_id,
        info: info.formats.sort((a, b) => {
            return a.mimeType < b.mimeType;
        }),
	});*/
});

app.listen(3000, () => {
	console.log("Server is running on http://localhost:3000");
});
