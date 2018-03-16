import 'mocha';
import * as chai from 'chai';
import { expect } from 'chai';
import * as td from 'testdouble';
import { MockReq, MockRes } from './../../utility/mock-interfaces';
import { reqRequire } from './../../utility/req-require';

describe("reqRequire function", function() {
  let req: MockReq;
  let res: MockRes;

  beforeEach(function() {
    req = new MockReq();
    req.jwt = {
      id: "abcde"
    };
    req.body = {
      username: "qwedsa",
      password: "password1",
      results: {
        first: "yes",
        second: "no"
      }
    }
    res = new MockRes();
  });

  afterEach(function() {
    req = undefined;
    res = undefined;
  });

  it("should return true for no requirements", function() {
    let reqMet = reqRequire(req, res);
    expect(reqMet).to.be.true;
    expect(res.status()).to.be.undefined;
    expect(res.json()).to.be.undefined;
  });

  it("should return true for a single requirement", function() {
    let reqMet = reqRequire(req, res,
      ['jwt', 401, "Missing auth token"]);
    expect(reqMet).to.equal(true);
    expect(res.status()).to.be.undefined;
    expect(res.json()).to.be.undefined;
  });

  it("should return true for multiple requirements", function() {
    let reqMet = reqRequire(req, res,
      ['jwt', 401, "Missing auth token"],
      ['body', 400, "Request body missing"]);
    expect(reqMet).to.equal(true);
    expect(res.status()).to.be.undefined;
    expect(res.json()).to.be.undefined;
  });

  it("should return true for nested requirements", function() {
    let reqMet = reqRequire(req, res,
      ['jwt', 401, "Missing auth token",
        ['id', 400, "Missing id on jwt"]
      ]);
    expect(reqMet).to.equal(true);
    expect(res.status()).to.be.undefined;
    expect(res.json()).to.be.undefined;
  });

  it("should return true for multiple nested requirements", function() {
    let reqMet = reqRequire(req, res,
      ['body', 400, "Request body is missing",
        ['results', 400, "Missing results param",
          ['first', 400, "Missing results.first param"]
        ]
      ]);
    expect(reqMet).to.equal(true);
    expect(res.status()).to.be.undefined;
    expect(res.json()).to.be.undefined;
  });

  it("should return true for complex requirements", function() {
    let reqMet = reqRequire(req, res,
      ['jwt', 401, "Missing auth token",
        ['id', 400, "Missing id on jwt"]],
      ['body', 400, "Request body is missing",
        ['username', 400, "Missing username param"],
        ['password', 400, "Missing password param"],
        ['results', 400, "Missing results param",
          ['first', 400, "Missing results.first param"],
          ['second', 400, "Missing results.second param"],
        ]
      ]);
    expect(reqMet).to.equal(true);
    expect(res.status()).to.be.undefined;
    expect(res.json()).to.be.undefined;
  });

  it("should return false for a single failing requirement", function() {
    let reqMet = reqRequire(req, res,
      ['missing', 400, "Missing field"]);
    expect(reqMet).to.equal(false);
  });

  it("should set the response status and message on a failing requirement", function() {
    let reqMet = reqRequire(req, res,
      ['missing', 400, "Missing field"]);
    expect(res.status()).to.equal(400);
    expect(res.json().message).to.equal("Missing field");
  });

  it("should return false for a failing nested requirement", function() {
    let reqMet = reqRequire(req, res,
      ['body', 400, "Missing request body",
        ['missing', 400, "Missing field"]
      ]);
    expect(reqMet).to.equal(false);
    expect(res.status()).to.equal(400);
    expect(res.json().message).to.equal("Missing field");
  });

  it("should return false for complex requirements with missing fields", function() {
    let reqMet = reqRequire(req, res,
      ['jwt', 401, "Missing auth token",
        ['id', 400, "Missing id on jwt"]],
      ['body', 400, "Request body is missing",
        ['username', 400, "Missing username param"],
        ['password', 400, "Missing password param"],
        ['missing', 400, "Missing param"],
        ['results', 400, "Missing results param",
          ['first', 400, "Missing results.first param"],
          ['second', 400, "Missing results.second param"],
          ['missing', 400, "Missing param"],
        ]]
    );
    expect(reqMet).to.equal(false);
    expect(res.status()).to.equal(400);
    expect(res.json().message).to.equal("Missing param");
  });

  it("should return true for empty strings", function() {
    req.jwt.id = "";
    let reqMet = reqRequire(req, res,
      ['jwt', 401, "Missing auth token",
        ['id', 400, "Missing id on jwt"]
      ]);
    expect(reqMet).to.equal(true);
    expect(res.status()).to.be.undefined;
    expect(res.json()).to.be.undefined;
  });

  it("should return true for null fields", function() {
    req.jwt.id = null;
    let reqMet = reqRequire(req, res,
      ['jwt', 401, "Missing auth token",
        ['id', 400, "Missing id on jwt"]
      ]);
    expect(reqMet).to.equal(true);
    expect(res.status()).to.be.undefined;
    expect(res.json()).to.be.undefined;
  });

  it("should throw an exception if required field is not a string", function() {
    let testCall = () => {
      reqRequire(req, res,
        [1234, 401, "Missing auth token"]);
    }
    expect(testCall).to.throw();
  });

  it("should throw an exception if error status is not a number", function() {
    let testCall = () => {
      reqRequire(req, res,
        ['jwt', "5000", "Missing auth token"]);
    }
    expect(testCall).to.throw();
  });

  it("should throw an exception if error message is not a string", function() {
    let testCall = () => {
      reqRequire(req, res,
        ['jwt', "5000", "Missing auth token"]);
    }
    expect(testCall).to.throw();
  });
});
