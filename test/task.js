const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../index");
const PORT = process.env.PORT || 8000;

chai.should();
chai.use(chaiHttp);

describe("Redirection to original url", () => {

    it("GET http://localhost/<url_id>", (done) => {
        const url_id = "pOCtqX4si";
        const res = chai.request(server)
            .get(`/${url_id}`)
            .end((err, response) => {
                response.should.have.status(200);
            done();
            });
    });

    it("GET with non-exist id", (done) => {
        const url_id = "non-exist";
        const res = chai.request(server)
            .get(`/${url_id}`)
            .end((err, response) => {
                response.should.have.status(404);
                response.text.should.be.eq(`localhost:${PORT}/${url_id} not found`)
            done();
            });
    });

    // 插入一筆過期
    // it("GET with expired date", (done) => {
    //     const url_id = "";
    //     const res = chai.request(server)
    //         .get(`/${url_id}`)
    //         .end((err, response) => {
    //             response.should.have.status(404);
    //             // response.text.should.be.eq(`localhost:${PORT}/${url_id} not found`)
    //         done();
    //         });
    // });

});


// non-exist short url => long_url.url && check_expire(long_url.expireAt)

// expire date true/false => check_expire()

// check invalid input url/expireAt

// check GET

// check POST
// response format

//check show