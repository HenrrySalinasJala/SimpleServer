var testController = function (Test) {
    var post = function (req, res) {
        var test = new Test(req.body);
        if(!req.body.title){
            res.status(400);
            res.send('Title is required');
        }
        test.save();
        res.status(201);
        res.send(test);
    }

    var get = function (req, res) {
        var query = {};
        if (req.query.title) {
            query.title = req.query.title
        }
        Test.find(query, function (err, Tests) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.json(Tests);
            }
        });
    }

    return {
        post: post,
        get: get
    }
}

module.exports = testController;