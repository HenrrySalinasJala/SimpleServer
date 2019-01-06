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

  return {
    post,
    get,
  };
}

module.exports = testController;