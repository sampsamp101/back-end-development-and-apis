import express from "express";
import cors from "cors";

const app = express();

app.use(cors({ optionsSuccessStatus: 200 }));

app.use(express.static("public"));

app.get("/", (_req, res) => {
  res.sendFile(import.meta.dirname + "/views/index.html");
});

// Do not change code above this line
app.get("/api{/:date}", (req, res)=>{
  const input = req.params.date;

  let date;

  if (!input){
    date = new Date();    
  }
  //new Date(1451001600000) //if input is all digits and in INT
  else if (/^\d+$/.test(input)){ 
    date = new Date(Number(input));
  }
  //new Date(new Date("2015-12-25")) else, remaining case by default
  else{
    date = new Date(input);
  }
  if (isNaN(date.getTime())){
     return res.status(400).json({"error": "Invalid Date"});
  }
  res.json(
    {unix: date.getTime(), 
      utc: date.toUTCString()})  
});

// Do not change code below this line

const PORT = 8000;
const listener = app.listen(PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
