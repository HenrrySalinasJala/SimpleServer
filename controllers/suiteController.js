const testController = (Suite) => {
  const post = (req, res) => {
    const suite = new Suite(req.body);
    if (!req.body.name) {
      res.status(400);
      res.send('Suite name is required');
    }
    suite.save((err) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(201);
        res.send(suite);
      }
    });
  };

  const get = (req, res) => {
    console.log('getting all');
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