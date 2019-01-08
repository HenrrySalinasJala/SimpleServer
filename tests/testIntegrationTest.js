const should = require('should');
const request = require('supertest');
const app = require('../app.js');
const mongoose = require('mongoose');
// const Test = mongoose.Model('Test');
const Test = require('../models/testModel');
const agent = request.agent(app);


describe('Test Case CRUD test', function () {
    it('Should allow test to be posted and return read and _id', function (done) {
        const testCasePost = {

            suite: {
                runId: '9b2960fe-8fd9-4c0f-8170-8f8fc25c4181',
                suiteId: 'e01a7b9e-f490-462d-aee7-147401dd7e37',
                name: 'Test Engine',
                description: 'As a user\r\nI want a new feature\r\nSo i can do new stuff'
            },
            testId: '80d2e226-f8d6-4dba-9cec-1d4db286818d',
            fullName: 'SimpleListenerSpecFlow.TestEngineFeature.TestWithTable',
            title: 'test with table',
            testDescription: null,
            result: 'Passed',
        };

        agent.post('/api/Tests')
            .send(testCasePost)
            .expect(201)
            .end(function (err, results) {
                results.body.should.have.property('suite');
                results.body.result.should.equal('Passed');
                results.body.should.have.property('_id');
                done();
            })
    });

    afterEach(function (done) {
        Test.remove().exec();
        done();
    });
});

