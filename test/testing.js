process.env.NODE_ENV = 'test';

const chai = require("chai");
const chaiHttp = require("chai-http");
const request = require("request");
const {server, PORT} = require("../index");
const client = require("../utils/redis_client");
const check_date = require("../utils/validation");

chai.should();
chai.use(chaiHttp);

let url_id;
const expired_url_id = "expired";
const non_exist_url_id = "nonexist";


before( async() => {
    await client.hSet(expired_url_id, [
        'url', "https://example.com/",
        'expireAt', "2022-03-30T15:55:20Z",
    ]);
});

after( async() => {
    await client.sendCommand(["del", `${url_id}`]);
    await client.sendCommand(["del", "expired"]);
    await client.sendCommand(["del", "nonexist"]);
});


describe("Function", () => {

    it("check_date()", (done) => {

        let m1 = new Date() ;
        m1.setHours(m1.getHours() + 4);
        m1 = m1.toISOString().split('.')[0] + "Z"; // YYYY-MM-DDTHH:mm:ssZ

        let m2  = "2022-03-30T15:55:20Z";
        let m3 = new Date(); // YYYY-MM-DDTHH:mm:ss.SSSZ

        check_date(m1).should.be.eql(true);
        check_date(m2).should.be.eql(false);
        check_date(m3).should.be.eql(false);

        done();
    });

});


describe("Generate a shorten url", () => {

    it(`POST http://localhost:${PORT}/api/v1/urls`, (done) => {
        
        let m = new Date();
        m.setHours(m.getHours() + 4);
        m = m.toISOString().split('.')[0] + "Z";

        let new_req = {
            'url': "https://github.com/james5418",
            'expireAt': m
        };

        const res = chai.request(server)
            .post(`/api/v1/urls`)
            .send(new_req)
            .end((err, response) => {
                response.should.have.status(200);
                response.body.should.be.a('object');
                response.body.should.have.property('id');
                response.body.should.have.property('shortUrl');
                Object.keys(response.body).length.should.be.eql(2);
                response.body.id.length.should.be.eql(10);
            done();
            url_id = response.body.id;
            });
    });

    it("POST with wrong variable name", (done) => {
        
        let m = new Date();
        m.setHours(m.getHours() + 4);
        m = m.toISOString().split('.')[0] + "Z";

        let new_req = {
            'URL': "https://github.com/james5418",
            'expireAt': m
        };

        const res = chai.request(server)
            .post(`/api/v1/urls`)
            .send(new_req)
            .end((err, response) => {
                response.should.have.status(500);
            done();
            });
    });

    it("POST with invalid url", (done) => {
        
        let m = new Date();
        m.setHours(m.getHours() + 4);
        m = m.toISOString().split('.')[0] + "Z";

        let new_req = {
            'url': "github.com/james5418",
            'expireAt': m
        };

        const res = chai.request(server)
            .post(`/api/v1/urls`)
            .send(new_req)
            .end((err, response) => {
                response.should.have.status(400);
                response.text.should.be.eql(`Invalid URL!`);
            done();
            });
    });

    it("POST with invalid expired date (wrong format)", (done) => {
        
        let m = new Date(); // YYYY-MM-DDTHH:mm:ss.SSSZ
        m.setHours(m.getHours() + 4);

        let new_req = {
            'url': "https://github.com/james5418",
            'expireAt': m
        };

        const res = chai.request(server)
            .post(`/api/v1/urls`)
            .send(new_req)
            .end((err, response) => {
                response.should.have.status(400);
                response.text.should.be.eql(`Invaild expired date!`);
            done();
            });
    });

    it("POST with invalid expired date (already expired)", (done) => {

        let new_req = {
            'url': "https://github.com/james5418",
            'expireAt': "2022-03-30T15:55:20Z"
        };

        const res = chai.request(server)
            .post(`/api/v1/urls`)
            .send(new_req)
            .end((err, response) => {
                response.should.have.status(400);
                response.text.should.be.eql(`Invaild expired date!`);
            done();
            });
    });

});


describe("Redirection to original url", () => {

    it(`GET http://localhost:${PORT}/<url_id>`, (done) => {
        request.get(`http://localhost:${PORT}/${url_id}`, (err, response, body) => {
            response.should.have.status(200);
            done();
        });
    }).timeout(10000);

    it("GET short url having non-existent id", (done) => {
        request.get(`http://localhost:${PORT}/${non_exist_url_id}`, (err, response, body) => {
            response.should.have.status(404);
            body.should.be.eql(`${non_exist_url_id} not found`);
            done();
        });
    });

    it("GET short url having already expired date", (done) => {
        request.get(`http://localhost:${PORT}/${expired_url_id}`, (err, response, body) => {
            response.should.have.status(404);
            body.should.be.eql(`${expired_url_id} not found`);
            done();
        });
    });

});


describe("Show urls mapping", () => {

    it(`GET http://localhost:${PORT}/show`, (done) => {
        
        request.get(`http://localhost:${PORT}/show`, (err, response, body) => {
            body = JSON.parse(body);
            response.should.have.status(200);
            body.should.be.an('array');
            if(body.length){
                body[0].should.be.an('object');
                body[0].should.have.property('short_url');
                body[0].should.have.property('original_url');
                Object.keys(body[0]).length.should.be.eql(2);
            }
            done();
        });
    });

});
