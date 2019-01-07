const express = require('express');
const Suite = require('../models/suiteModel');
const TestRun = require('../models/testRunModel');

const routes = (Test) => {
  const testRouter = express.Router();
  const testController = require('../controllers/testController')(Test);

  testRouter.post('/', (req, res, next) => {
    const { suite } = req.body;
    const { suiteId } = suite;
    const { runId } = suite;
    // delete suite.suiteId;
    // delete suite.suiteId;
    delete req.body.suite;
    TestRun.findOneAndUpdate({ runId }, { runId }, { new: true, upsert: true, setDefaultsOnInsert: true }, (errorTestRun, resultTestRun) => {
      if (errorTestRun) {
        res.status(500).send(errorTestRun);
      } else {
        suite.testRun = `${resultTestRun._id}`;
        Suite.findOneAndUpdate({ suiteId }, suite, { new: true, upsert: true, setDefaultsOnInsert: true }, (err, resultSuite) => {
          if (err) {
            res.status(500).send(err);
          } else {
            req.body.suite = `${resultSuite._id}`;
            next();
          }
        });
      }
    });
  });

  testRouter.route('/')
    .post(testController.post)
    .get(testController.get);

  testRouter.use('/:testId', (req, res, next) => {
    const fullName = req.params.testId;
    Test.findOne({ fullName }, (err, test) => {
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
      req.test.populate('suite', (err, populatedTest) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.json(populatedTest);
        }
      });
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
      Object.keys(req.body).forEach((key) => {
        req.test[key] = req.body[key];
      });
      // for (const p in req.body) {
      //   req.test[p] = req.body[p];
      // }
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
