import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import Issue from './moduls/Issue';
import multer from 'multer';
import Mailgun from 'mailgun-js';

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/images', express.static('images'));
app.use(express.static(__dirname + '/js'));

mongoose.connect('mongodb://127.0.0.1:27017/issues');

// Mailgun API
const api_key = '2b317712c28af76768d0e632e7297084-059e099e-248f6138';
const domain = 'sandbox4436b3aa1e1440aa81846496a1b5a827.mailgun.org';
const mailgun = new Mailgun({ apiKey: api_key, domain: domain });

// Mailgun Api End
const router = express.Router();
const MAIN_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg'
};
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MAIN_TYPE_MAP[file.mimetype];
    let error = new Error('Nie poprawny plik');
    if (isValid) {
      error = null;
    }
    cb(error, './images');
  },
  filename: (req, file, cb) => {
    const name = file.originalname
      .toLowerCase()
      .split(' ')
      .join('-');
    const ext = MAIN_TYPE_MAP[file.mimetype];
    cb(null, Math.floor(Math.random() * 40) + name);
  }
});

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDb database connection successfule!');
});

router.route('/issues').get((req, res) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const bookQuery = Issue.find();

  if (pageSize && currentPage) {
    bookQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
  }
  bookQuery.find((err, issues) => {
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

router
  .route('/issues/add')
  .post(multer({ storage: storage }).single('image'), (req, res) => {
    const url = req.protocol + '://' + req.get('host');
    let issue = new Issue(req.body);
    issue.title = req.body.title;
    issue.author = req.body.author;
    issue.category = req.body.category;
    issue.heroes = req.body.heroes;
    issue.description = req.body.description;
    issue.owner = req.body.owner;
    issue.email = req.body.email;
    issue.emailChekbox = req.body.emailChekbox;
    issue.access = req.body.access;
    if (issue.emailChekbox === true) {
      var data = {
        from: 'lukaszcyganiak4@gmail.com',
        to: issue.email,
        cc: 'lukaszcyganiak4@gmail.com',
        subject: 'Wiadomości ze strony "Bilblioteka Billenium" ',
        html:
          'Dziękujemy za dodanie ksiązki ponież szczegóły ' +
          'Tytuł: ' +
          issue.title +
          'Autor: ' +
          issue.author +
          'Kategoria: ' +
          issue.category +
          'Bohaterowi: ' +
          issue.heroes +
          'Opis: ' +
          issue.description
      };
      mailgun.messages().send(data, function(error, body) {});
    }

    if (req.file) {
      issue.imagePath = url + '/images/' + req.file.filename;
    } else {
      issue.imagePath = 'http://localhost:4000/images/emotic/defaultBook.jpg';
    }

    issue
      .save()
      .then(issue => {
        res.status(200).json({ issue: 'Add successfully' });
      })
      .catch(err => {
        res.status(400).send('Failed to create new record ');
      });
  });

router
  .route('/issues/update/:id')
  .post(multer({ storage: storage }).single('image'), (req, res) => {
    const url = req.protocol + '://' + req.get('host');
    Issue.findById(req.params.id, (err, issue) => {
      if (!issue) return next(new Error('Could not load document'));
      else {
        if (issue.emailChekbox === true) {
          // console.log(issue.title);
          // console.log(req.body.title);

          if (issue.title != req.body.title) {
            var htmlmesage = '';
            htmlmesage =
              'tytuł ksiązki zmienił się z: ' +
              issue.title +
              ' na ' +
              req.body.title +
              '. ' +
              ' <br >';
          } else htmlmesage = '';
          if (issue.author != req.body.author) {
            htmlmesage =
              htmlmesage +
              'Autor książki zminił sią z: ' +
              issue.author +
              ' na ' +
              req.body.author +
              ' .' +
              ' <br >';
          } else htmlmesage = htmlmesage;
          if (issue.category != req.body.category) {
            htmlmesage =
              htmlmesage +
              'Kategoria zminiła się z: ' +
              issue.category +
              ' na ' +
              req.body.category +
              '. ' +
              ' <br >';
          } else htmlmesage = htmlmesage;
          if (issue.heroes != req.body.heroes) {
            htmlmesage =
              htmlmesage +
              '<i style="color: red">' +
              ' Bohaterowie zminili się z: ' +
              '</i>' +
              issue.heroes +
              ' na ' +
              req.body.heroes +
              '. ' +
              ' <br >';
          } else htmlmesage = htmlmesage;
          if (issue.description != req.body.description) {
            htmlmesage =
              htmlmesage +
              ' Opis zminili się z: ' +
              issue.description +
              ' na ' +
              req.body.description +
              '. ' +
              ' <br >';
          } else htmlmesage = htmlmesage;
          if (issue.email != req.body.email) {
            htmlmesage =
              htmlmesage +
              ' Email zminili się z: ' +
              issue.email +
              ' na ' +
              req.body.email +
              '. ' +
              ' <br >';
          } else htmlmesage = htmlmesage;
          if (issue.owner != req.body.owner) {
            htmlmesage =
              htmlmesage +
              ' Właściciel zminili się z: ' +
              issue.owner +
              ' na ' +
              req.body.owner +
              '. ' +
              ' <br >' +
              ' <br >';
          } else htmlmesage = htmlmesage;
          var data = {
            from: 'lukaszcyganiak4@gmail.com',
            to: issue.email,
            cc: 'lukaszcyganiak4@gmail.com',
            subject: 'Wiadomości ze strony "Bilblioteka Billenium" ',
            html:
              htmlmesage +
              '<b> ' +
              'Pozdrawiamy zespół Biblioteka Billennium' +
              '</b>'
          };
          mailgun.messages().send(data, function(error, body) {});
        }

        issue.title = req.body.title;
        issue.author = req.body.author;
        issue.category = req.body.category;
        issue.heroes = req.body.heroes;
        issue.description = req.body.description;
        issue.owner = req.body.owner;
        issue.email = req.body.email;
        issue.emailChekbox = req.body.emailChekbox;
        issue.access = req.body.access;
        issue.image = req.body.image;

        if (req.file) {
          issue.imagePath = url + '/images/' + req.file.filename;
        } else {
          issue.imagePath = issue.imagePath;
        }
        issue
          .save()
          .then(issue => {
            res.json('Update done');
          })
          .catch(err => {
            res.status(400).send('Update failed');
          });
      }
    });
  });

router.route('/issues/delete/:id').get((req, res) => {
  Issue.findByIdAndRemove({ _id: req.params.id }, (err, issue) => {
    if (err) {
      res.json(err);
    } else {
      console.log(issue.emailChekbox);
      if (issue.emailChekbox === true) {
        var data = {
          from: 'lukaszcyganiak4@gmail.com',
          to: issue.email,
          cc: 'lukaszcyganiak4@gmail.com',
          subject: 'Wiadomości ze strony "Bilblioteka Billenium" ',
          html:
            'Przykro nam ale twoja ksiązka pod tytułem ' +
            issue.title +
            ' została usunięta '
        };
        mailgun.messages().send(data, function(error, body) {});
      }
      res.json('Remove successfully');
    }
  });
});

app.use('/', router);

app.listen(4000, () => console.log('Express server running'));
