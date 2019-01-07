const express = require('express');

const routes = (Suite) => {
  const suiteRouter = express.Router();
  const testController = require('../controllers/suiteController')(Suite);
  suiteRouter.route('/')
    .post(testController.post)
    .get(testController.get);
  // middleware
  suiteRouter.use('/:suiteId', (req, res, next) => {
    const { suiteId } = req.params;

    Suite.findOne({ suiteId }, (err, suite) => {
      if (err) {
        res.status(500).send(err);
      } else if (suite) {
        req.suite = suite;
        next();
      } else {
        res.status(404).send('no suite found');
      }
    });
  });

  suiteRouter.route('/:suiteId')
    .get((req, res) => {
      req.suite.populate('testRun', (err, populatedSuite) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.json(populatedSuite);
        }
      });
    })
    .put((req, res) => {
      const name = req.body.name;
      const status = req.body.status;
      const executed = req.body.executed;
      req.suite.name = name;
      req.suite.status = status;
      req.suite.executed = executed;
      req.suite.save((err) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.json(req.suite);
        }
      });
    })
    .patch((req, res) => {
      if (req.body._id) {
        delete req.body._id;
      } else if (req.body.suiteId) {
        delete req.body.suiteId;
      } else if (req.body.runId) {
        delete req.body.runId;
      }

      Object.keys(req.body).forEach((key) => {
        req.suite[key] = req.body[key];
      });

      req.suite.save((err) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.json(req.suite);
        }
      });
    })
    .delete((req, res) => {
      req.suite.remove((err) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.status(204).send('removed');
        }
      });
    });
  return suiteRouter;
};
module.exports = routes;
