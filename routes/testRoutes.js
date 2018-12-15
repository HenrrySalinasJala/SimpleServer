const express = require('express');

const routes = function (Test) {
    var testRouter = express.Router();
    var testController = require('../controllers/testController')(Test);
    testRouter.route('/')
        .post(testController.post)
        .get(testController.get);
    testRouter.use('/:testId', function (req, res, next) {
        const testId = req.params.testId;
        Test.findById(testId, function (err, test) {
            if (err) {
                res.status(500).send(err);
            } else if (test) {
                req.test = test;
                next();
            } else {
                res.status(404).send('not test found');
            }
        })
    })
    testRouter.route('/:testId')
        .get(function (req, res) {
            res.json(req.test);
        })
        .put(function (req, res) {
            var title = req.body.title;
            var status = req.body.status;
            var executed = req.body.executed;
            req.test.title = title;
            req.test.status = status;
            req.test.executed = executed;
            req.test.save(function (err) {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.json(req.test);
                }
            });
            res.json(req.test);
        })
        .patch(function (req, res) {
            if (req.body._id) {
                delete req.body._id;
            }
            for (var p in req.body) {
                req.test[p] = req.body[p];
            }
            req.test.save(function (err) {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.json(req.test);
                }
            });

        })
        .delete(function (req, res) {
            req.test.remove(function (err) {
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