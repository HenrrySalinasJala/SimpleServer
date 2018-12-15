var should = require('should');
var sinon = require('sinon');

describe('Test Controller Tests', function () {
    describe('POST', function () {
        it('should not allow and empty title on post', function () {
            var Test = function (test) { this.save = function () { }; }
            var req = {
                body: {
                    status: 'passed'
                }
            }

            var res = {
                status: sinon.spy(),
                send: sinon.spy()
            }
            var testController = require('../controllers/testController')(Test);
            testController.post(req, res);
            res.status.calledWith(400).should.equal(true, 'Bad status code' + res.status.args[0][0]);
            res.send.calledWith('Title is required').should.equal(true);
        })
    });
});