const testController = (Suite) => {
  const post = (req, res) => {
    const suite = new Suite(req.body);
    if (req.query.runId) {
      res.status(400);
      res.send('Run Id is required');
    } else if (req.query.suiteId) {
      res.status(400);
      res.send('Suite Id is required');
    } else if (!req.body.name) {
      res.status(400);
      res.send('Suite name is required');
    } else {
      suite.save((err) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.status(201);
          res.send(suite);
        }
      });
    }
  };

  const get = (req, res) => {
    const query = {};
    if (req.query.name) {
      query.name = req.query.name;
    }
    Suite.find(query, (err, suites) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json(suites);
      }
    });
  };

  return {
    post,
    get,
  };
}

module.exports = testController;