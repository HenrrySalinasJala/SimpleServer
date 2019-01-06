const express = require('express');

const routes = (Test) => {
  const testRouter = express.Router();
  const testController = require('../controllers/testController')(Test);
  testRouter.route('/')
    .post(testController.post)
    .get(testController.get);
  testRouter.use('/:testId', (req, res, next) => {
    const testId = req.params.testId;
    Test.findById(testId, (err, test) => {
      if (err) {
        res.status(500).send(err);
      } else if (test) {
        req.test = test;
        next();
      } else {
        res.status(404).send('not test found');
      }
    });
  });
  testRouter.route('/:testId')
    .get((req, res) => {
      res.json(req.test);
    })
    .put((req, res) => {
      const title = req.body.title;
      const status = req.body.status;
      const executed = req.body.executed;
      req.test.title = title;
      req.test.status = status;
      req.test.executed = executed;
      req.test.save((err) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.json(req.test);
        }
      });
      // res.json(req.test);
    })
    .patch((req, res) => {
      if (req.body._id) {
        delete req.body._id;
      }
      for (const p in req.body) {
        req.test[p] = req.body[p];
      }
      req.test.save((err) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.json(req.test);
        }
      });

    })
    .delete((req, res) => {
      req.test.remove((err) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.status(204).send('removed');
        }
      });
    });
  return testRouter;
};
module.exports = routes;