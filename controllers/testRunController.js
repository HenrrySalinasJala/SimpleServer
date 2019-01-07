const testRunController = (TestRun) => {
  const post = (req, res) => {
    const testRun = new TestRun(req.body);
    if (req.query.runId) {
      res.status(400);
      res.send('Run Id is required');
    } else {
      testRun.save((err) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.status(201);
          res.send(testRun);
        }
      });
    }
  };

  const get = (req, res) => {
    const query = {};

    if (req.query.runId) {
      query.runId = req.query.runId;
    }
    TestRun.find(query, (err, testRuns) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json(testRuns);
      }
    });
  };

  return {
    post,
    get,
  };
}

module.exports = testRunController;