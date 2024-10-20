const express = require("express");
const cors = require('cors');
const {appleSongsMusicDownloader,spotifySongsMusicDownloader} = require('./controllere');

const app = express();
app.use(cors());

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static(__dirname));
app.get('/',(req,res)=>{
  res.sendFile('index.html')
})

app.post('/api/applemusicdownloader/song',appleSongsMusicDownloader);
app.post('/api/spotifymusicdownloader/song',spotifySongsMusicDownloader);

app.listen(3000);