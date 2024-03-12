import express from "express";
import bodyParser from "body-parser";
import multer from "multer";
import path from "path";

const app = express();
const port = 3000;

const __dirname = path.dirname(new URL(import.meta.url).pathname);


const storage = multer.diskStorage({
  destination: function(req, file, cb) {
      cb(null, 'public/uploads/'); // Save uploaded images to the "uploads" directory
  },
  filename: function(req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname)); // Use the current timestamp as the filename
  }
});




const upload = multer({ storage: storage });


// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(bodyParser.json());

// GET home page
app.get("/",  (req, res) => {
  
  res.render("index.ejs");
});

// POST a new post
// app.post("/submit_change", (req, res) => {
//     const {newTitle , jobTitle} = req.body;
//     console.log(newTitle,jobTitle);
//     res.render("index2.ejs",{newTitle : newTitle , work : jobTitle} )
//  });
 

//  app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

//  app.post('/upload', upload.single('newlogo'), function(req, res) {
//   // Access uploaded image via req.file
//   if (req.file) {
//       console.log('Image uploaded:', req.file);
//       // res.send('Image uploaded successfully');
//       res.render('test.ejs',{imagePath : req.file.path});
//       console.log(req.file["path"]);
//   } else {
//       res.status(400).send('No image file uploaded');
//   }
// });


// app.post("/submit_change", upload.single('newlogo'), (req, res) => {
//   const { newTitle, jobTitle } = req.body;
//   let renderData = {};

//   if (newTitle && jobTitle) {
//     console.log("inside titles")
//       renderData = { newTitle: newTitle, work: jobTitle };
//   }

//   if (req.file) {
//     console.log("Inside image file")
//       renderData.imagePath = req.file.path;
//   }

//   res.render("index2.ejs", renderData);
// });

app.post("/submit_change", upload.array('newlogo', 3), (req, res) => {
  const { newTitle, jobTitle } = req.body;
  let renderData = {};

  if (newTitle && jobTitle) {
    console.log("inside titles");
    renderData = { newTitle: newTitle, work: jobTitle };
  }

  if (req.files && req.files.length > 0) {
    console.log("Inside image files");
    renderData.imagePaths = req.files.map(file => file.path);
  }

  res.render("index2.ejs", renderData);
});


 app.get('/create',(req,res)=>{
    res.render('form.ejs');
    // res.send('<h1>Hello</h1>')
 })
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});


// https://portfolio-maker-phb3.onrender.com/