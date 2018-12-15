var should = require('should');
var request = require('supertest');
var app = require('../app.js');
var mongoose = require('mongoose');
// var Test = mongoose.Model('Test');
var Test = require('../models/testModel');
var agent = request.agent(app);


describe('Test Case CRUD test', function () {
    it('Should allow test to be posted and return read and _id', function (done) {
        var testCasePost = { title: 'new test case', status: 'passed', executed: false }
        agent.post('/api/Tests')
            .send(testCasePost)
            .expect(200)
            .end(function (err, results) {
                results.body.executed.should.equal(false);
                results.body.should.have.property('_id');
                done();
            })
    });

    afterEach(function (done) {
        Test.remove().exec();
        done();
    });
});

