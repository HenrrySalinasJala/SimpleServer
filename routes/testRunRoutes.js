const express = require('express');

const routes = (TestRun) => {
  const testRunRouter = express.Router();
  const testRunController = require('../controllers/testRunController')(TestRun);

  testRunRouter.route('/')
    .post(testRunController.post)
    .get(testRunController.get);
  // middleware
  testRunRouter.use('/:testRunId', (req, res, next) => {
    const runId = req.params.testRunId;
    
    TestRun.findOne({ runId }, (err, testRun) => {
      if (err) {
        res.status(500).send(err);
      } else if (testRun) {
        req.testRun = testRun;
        next();
      } else {
        res.status(404).send('no suite found');
      }
    });
  });

  testRunRouter.route('/:testRunId')
    .get((req, res) => {
      res.json(req.testRun);
    })
    .put((req, res) => {
      res.status(401).send('operation not allowed');
    })
    .patch((req, res) => {
      res.status(401).send('operation not allowed');
    })
    .delete((req, res) => {
      req.testRun.remove((err) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.status(204).send('removed');
        }
      });
    });
  return testRunRouter;
}

module.exports = routes;
