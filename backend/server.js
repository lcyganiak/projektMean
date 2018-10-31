import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import Issue from './moduls/Issue';
import multer from 'multer';
import path from 'path';

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use("/images", express.static(path.join('backend/images')));


mongoose.connect('mongodb://127.0.0.1:27017/issues');

const router = express.Router();
const MAIN_TYPE_MAP = {
'image/png': 'png',
'image/jpeg': 'jpg',
'image/jpg': 'jpg',
};
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MAIN_TYPE_MAP[file.mimetype];
    let error = new Error('Nie poprawny plik');
    if(isValid){
      error =null;
    }
    cb(error, './images');
  },
  filename: (req, file, cb) => {
    const name =   file.originalname.toLowerCase().split(' ').join('-') ;
   const ext = MAIN_TYPE_MAP[file.mimetype];
    cb(null, name);
  }
});



const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDb database connection successfule!');
});
router.route('/issues').get((req, res) => {
  Issue.find((err, issues) => {
    if (err) console.log(err);
    else res.json(issues);
  });
});

router.route('/issues/:id').get((req, res) => {
  Issue.findById(req.params.id, (err, issue) => {
    if (err) console.log(err);
    else res.json(issue);
  });
});

router.route('/issues/add').post(multer({storage: storage}).single('image'),(req, res) => {
 const url =req.protocol + '://' + req.get('host');
  let issue = new Issue(req.body);
  issue.save()
    .then(issue => {
      res.status(200).json({ 'issue': 'Add successfully'});
    })
    .catch(err => {
      res.status(400)
      .send('Failed to create new record ');
    });
});

router.route('/issues/update/:id').post(multer({storage: storage}).single('image'),(req, res) => {
  const url =req.protocol + '://' + req.get('host');
  Issue.findById(req.params.id, (err, issue) => {
    if(!issue)
    return next(new Error('Could not load document' ));
    else{
      issue.title = req.body.title;
      issue.author =req.body.author;
      issue.category = req.body.category;
      issue.heroes = req.body.heroes;
      issue.description = req.body.description;
      issue.owner = req.body.owner;
      issue.email = req.body.email;
      issue.access = req.body.access;
     // issue.image = req.body.image;
      issue.imagePath = url +'/backend/images/' + req.file.filename;





      issue.save().then(issue =>{
        res.json('Update done');
      }).catch(err => {
        res.status(400).send('Update failed');
      });
    }
  });
});

router.route('/issues/delete/:id').get((req, res) => {
  Issue.findByIdAndRemove({_id: req.params.id}, (err, issue) => {
    if(err)
      res.json(err);
    else
    res.json('Remove successfully');
  })
})

app.use('/', router);

app.listen(4000, () => console.log('Express server running on port 4000'));


