import * as express from 'express';
import * as bodyParser from 'body-parser';
import { ObjectID } from 'mongodb';

import './db/mongoose';
import { User } from './models/user';
import { Todo } from './models/todo';


const app: express.Application = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  let todo = new Todo({
    text: req.body.text
  });
  todo.save().then(doc => {
    res.send(doc);
  }, e => {
    res.status(400).send(e);
  });
});

app.get('/todos', (req, res) => {
  Todo.find().then(todos => {
    res.send({ todos });
  }, e => {
    res.status(400).send(e);
  })
});

app.get('/todos/:id', (req, res) => {
  let id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }
  Todo.findById(id).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }
    res.send({ todo });
  }).catch(e => {
    res.status(400).send()
  });

});

app.listen(3000, () => {
  console.log('Started on port 3000');
});

export default app;






