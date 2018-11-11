import * as _ from 'lodash';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import { ObjectID, ObjectId } from 'mongodb';

import './db/mongoose';
import { User } from './models/user';
import { Todo } from './models/todo';

const port = process.env.PORT || 3000;
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
    res.status(400).send();
  });

});

app.delete('/todos/:id', (req, res) => {
  let id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }
  Todo.findByIdAndRemove(id).then(todo => {
    if (!todo) {
      return res.status(404).send();
    }
    res.send({ todo });
  }).catch(e => {
    res.status(400).send();
  });
});

app.patch('/todos/:id', (req, res) => {
  let id = req.params.id;
  let body = _.pick(req.body, ['text', 'completed','completedAt']);
  
  if(!ObjectID.isValid(id)) {
    return res.status(404).send();
  }
  if(_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }
  Todo.findByIdAndUpdate(id, {$set:body}, {new:true})
    .then(todo => {
      if(!todo) {
        return res.status(404).send();
      }
      res.send({todo});
    })
    .catch(e => res.status(404).send);
});

app.listen(port, () => {
  console.log(`Started on port ${port}`);
});

export default app;