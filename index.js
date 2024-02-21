import express from "express";
import bodyParser from "body-parser";


const app = express();
const port = 3000;



// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(bodyParser.json());

// GET home page
app.get("/",  (req, res) => {
  
  res.render("index2.ejs");
});

// POST a new post
app.post("/submit", (req, res) => {
    let newTitle = req.body["heading"];
    console.log(newTitle); 
    let newWork = req.body["w_post"];
    
    res.render("index2.ejs",{newTitle : newTitle , work : newWork} )
 });
 

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
