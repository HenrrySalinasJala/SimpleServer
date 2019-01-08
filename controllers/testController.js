const { check } = require('express-validator/check')

const testController = (Test) => {
  const post = (req, res) => {
    const test = new Test(req.body);
    if (!req.body.title) {
      res.status(400);
      res.send('Title is required');
    } else if (!req.body.fullName) {
      res.status(400);
      res.send('Full Name is required');
    } else {
      test.save((err) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.status(201);
          res.json(test);
        }
      });
    }
  };

  const get = (req, res) => {
    const query = {};
    if (req.query.title) {
      query.title = req.query.title;
    }
    Test.find(query, (err, Tests) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json(Tests);
      }
    });
  };

  const validate = (method) => {
    switch (method) {
      case 'updateTest': {
        return [
          check('suite', 'suite doesn\'t exists').exists(),
          
          check('fullName', 'fullname doesn\'t exists').exists(),

          check('title', 'test title doesn\'t exists').exists(),

          check('result', 'result doesn\'t exists').exists(),

          check('stack', 'stackTrace doesn\'t exists').exists(),

          check('errorMessage', 'error message doesn\'t exists').exists(),
          
          check('duration', 'duration doesn\'t exists').exists(),

          check('screenshot', 'screenshot doesn\'t exists').exists(),

          check('steps', 'steps doesn\'t exists').exists(),

          check('tags', 'tags doesn\'t exists').exists(),
          
        ]
      }
    }
  };

  return {
    post,
    get,
    validate,
  };
};

module.exports = testController;
