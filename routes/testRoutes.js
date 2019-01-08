const { validationResult } = require('express-validator/check');
const express = require('express');
const Suite = require('../models/suiteModel');
const TestRun = require('../models/testRunModel');

const routes = (Test) => {
  const testRouter = express.Router();
  const testController = require('../controllers/testController')(Test);

  testRouter.post('/', (req, res, next) => {
    if (!req.body.suite) {
      res.status(400);
      res.send('Suite information is required');
    } else if (!req.body.suite.runId) {
      res.status(400);
      res.send('Run Id is required');
    } else if (!req.body.suite.suiteId) {
      res.status(400);
      res.send('Suite Id is required');
    } else if (!req.body.testId) {
      res.status(400);
      res.send('Test Id is required');
    } else {
      const { suite } = req.body;
      const { suiteId } = suite;
      const { runId } = suite;
      delete req.body.suite;
      const testRunFindOptions = { new: true, upsert: true, setDefaultsOnInsert: true };
      TestRun.findOneAndUpdate({ runId }, { runId }, testRunFindOptions, (errorTestRun, resultTestRun) => {
        if (errorTestRun) {
          res.status(500).send(errorTestRun);
        } else {
          suite.testRun = `${resultTestRun._id}`;
          const suiteFindOptions = { new: true, upsert: true, setDefaultsOnInsert: true };
          Suite.findOneAndUpdate({ suiteId }, suite, suiteFindOptions, (err, resultSuite) => {
            if (err) {
              res.status(500).send(err);
            } else {
              req.body.suite = `${resultSuite._id}`;
              next();
            }
          });
        }
      });
    }
  });

  testRouter.route('/')
    .post(testController.post)
    .get(testController.get);

  testRouter.use('/:testId', (req, res, next) => {
    const testId = req.params.testId;
    Test.findOne({ testId }, (err, test) => {
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
    .put(testController.validate('updateTest'), (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }
      const { title, steps, result,
        tags, stack, errorMessage,
        duration, screenshot } = req.body;

      req.test.title = title;
      req.test.steps = steps;
      req.test.tags = tags;
      req.test.result = result;
      req.test.stackTrace = stack;
      req.test.output = errorMessage;
      req.test.duration = duration;
      req.test.screenshot = screenshot;
      req.test.save((err) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.json(req.test);
        }
      });
    })
    .patch((req, res) => {
      if (req.body._id) {
        delete req.body._id;
      }
      Object.keys(req.body).forEach((key) => {
        req.test[key] = req.body[key];
      });
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
