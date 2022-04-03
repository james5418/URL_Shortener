const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../index");
const client = require('../redis_client');
const PORT = process.env.PORT || 8000;
const request = require('request');

chai.should();
chai.use(chaiHttp);

let url_id;
const expired_url_id = "expired"
const non_exist_url_id = "nonexist";


before( async() => {
    await client.hSet(expired_url_id, [
        'id', expired_url_id,
        'url', "https://example.com/",
        'expireAt', "2022-03-30T15:55:20Z",
    ]);
});

after( async() => {
    await client.sendCommand(["del", "expired"]);
});

describe("Generate a shorten url", () => {

    it("POST http://localhost/api/v1/urls", (done) => {
        
        let m = new Date()
        m.setHours(m.getHours() + 4);
        m = m.toISOString().split('.')[0] + "Z";

        let new_req = {
            'url': "https://github.com/james5418",
            'expireAt': m
        }

        const res = chai.request(server)
            .post(`/api/v1/urls`)
            .send(new_req)
            .end((err, response) => {
                response.should.have.status(200);
                response.body.should.be.a('object');
                response.body.should.have.property('id');
                response.body.should.have.property('shortUrl');
                Object.keys(response.body).length.should.be.eql(2);
                response.body.id.length.should.be.eql(9);
            done();
            url_id = response.body.id;
            console.log(`id=${url_id}`)
            });
    });

});

describe("Redirection to original url", () => {

    it("GET http://localhost/<url_id>", (done) => {
        // const res = chai.request(server)
        //     .get(`/${url_id}`) // url_id is from POST
        //     .end((err, response) => {
        //         response.should.have.status(200);
        //     done();
        //     });
        request.get(`http://localhost:${PORT}/${url_id}`, (err, response, body) => {
            response.should.have.status(200);
            done();
        });
    });

    

    it("GET with non-exist id", (done) => {
        // const res = chai.request(server)
        //     .get(`/${non_exist_url_id}`)
        //     .end((err, response) => {
        //         response.should.have.status(404);
        //         response.text.should.be.eq(`localhost:${PORT}/${non_exist_url_id} not found`)
        //     done();
        //     });
        request.get(`http://localhost:${PORT}/${non_exist_url_id}`, (err, response, body) => {
            response.should.have.status(404);
            body.should.be.eql(`localhost:${PORT}/${non_exist_url_id} not found`);
            done();
        });
    });

    it("GET with expired date", (done) => {
        // const res = chai.request(server)
        //     .get(`/${expired_url_id}`)
        //     .end((err, response) => {
        //         response.should.have.status(404);
        //         response.text.should.be.eq(`localhost:${PORT}/${expired_url_id} not found`)
        //     done();
        //     });
        request.get(`http://localhost:${PORT}/${expired_url_id}`, (err, response, body) => {
            response.should.have.status(404);
            body.should.be.eql(`localhost:${PORT}/${expired_url_id} not found`);
            done();
        });
    });

});




// non-exist short url => long_url.url && check_expire(long_url.expireAt)

// expire date true/false => check_expire()

// check invalid input url/expireAt

// check GET

// check POST
// response format

//check show