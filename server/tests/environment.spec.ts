import 'mocha';
import * as chai from 'chai';
import { expect } from 'chai';
import { App } from './../app';

describe("Environment variables", function() {
  describe("NODE_ENV", function() {
    it("should be definied", function() {
      expect(process.env.NODE_ENV).to.not.equal(undefined);
    });
    it("should be 'testing'", function() {
      expect(process.env.NODE_ENV).to.equal('testing');
    });
  });

  describe("SERVER_PORT", function() {
    it("should be definied", function() {
      expect(process.env.SERVER_PORT).to.not.equal(undefined);
    });
    it("should be a number", function() {
      let portNumber = parseInt(process.env.SERVER_PORT);
      expect(portNumber).to.be.a('number');
    });
    it("should be between 0 and 65535", function() {
      let portNumber = parseInt(process.env.SERVER_PORT);
      expect(portNumber).to.be.not.lessThan(0);
      expect(portNumber).to.be.not.greaterThan(65535);
    });
  });

  describe("DEFAULT_ADMIN_USERNAME", function() {
    it("should be definied", function() {
      expect(process.env.DEFAULT_ADMIN_USERNAME).to.not.equal(undefined);
    });
    it("should not be empty", function() {
      expect(process.env.DEFAULT_ADMIN_USERNAME).to.not.equal("");
    });
  });

  describe("DEFAULT_ADMIN_PASSWORD", function() {
    it("should be definied", function() {
      expect(process.env.DEFAULT_ADMIN_PASSWORD).to.not.equal(undefined);
    });
    it("should not be empty", function() {
      expect(process.env.DEFAULT_ADMIN_PASSWORD).to.not.equal("");
    });
  });

  describe("POSTGRES_HOST", function() {
    it("should be definied", function() {
      expect(process.env.POSTGRES_HOST).to.not.equal(undefined);
    });
    it("should not be empty", function() {
      expect(process.env.POSTGRES_HOST).to.not.equal("");
    });
  });

  describe("POSTGRES_PORT", function() {
    it("should be definied", function() {
      expect(process.env.POSTGRES_PORT).to.not.equal(undefined);
    });
    it("should be a number", function() {
      let portNumber = parseInt(process.env.POSTGRES_PORT);
      expect(portNumber).to.be.a('number');
    });
    it("should be between 0 and 65535", function() {
      let portNumber = parseInt(process.env.POSTGRES_PORT);
      expect(portNumber).to.be.not.lessThan(0);
      expect(portNumber).to.be.not.greaterThan(65535);
    });
  });

  describe("POSTGRES_USERNAME", function() {
    it("should be definied", function() {
      expect(process.env.POSTGRES_USERNAME).to.not.equal(undefined);
    });
    it("should not be empty", function() {
      expect(process.env.POSTGRES_USERNAME).to.not.equal("");
    });
  });

  describe("POSTGRES_PASSWORD", function() {
    it("should be definied", function() {
      expect(process.env.POSTGRES_PASSWORD).to.not.equal(undefined);
    });
    it("should not be empty", function() {
      expect(process.env.POSTGRES_PASSWORD).to.not.equal("");
    });
  });

  describe("POSTGRES_DATABASE", function() {
    it("should be definied", function() {
      expect(process.env.POSTGRES_DATABASE).to.not.equal(undefined);
    });
    it("should not be empty", function() {
      expect(process.env.POSTGRES_DATABASE).to.not.equal("");
    });
  });

  describe("JWT_SECRET", function() {
    it("should be definied", function() {
      expect(process.env.JWT_SECRET).to.not.equal(undefined);
    });
    it("should not be empty", function() {
      expect(process.env.JWT_SECRET).to.not.equal("");
    });
  });

  describe("SENDGRID_API_KEY", function() {
    it("should be definied", function() {
      expect(process.env.SENDGRID_API_KEY).to.not.equal(undefined);
    });
    it("should not be empty", function() {
      expect(process.env.SENDGRID_API_KEY).to.not.equal("");
    });
  });

  describe("NOREPLY_EMAIL", function() {
    it("should be definied", function() {
      expect(process.env.NOREPLY_EMAIL).to.not.equal(undefined);
    });
    it("should not be empty", function() {
      expect(process.env.NOREPLY_EMAIL).to.not.equal("");
    });
    it("should be a valid email address")
  });

  describe("S3_BUCKET_NAME", function() {
    it("should be definied", function() {
      expect(process.env.S3_BUCKET_NAME).to.not.equal(undefined);
    });
    it("should not be empty", function() {
      expect(process.env.S3_BUCKET_NAME).to.not.equal("");
    });
  });

  describe("S3_ACCESS_KEY", function() {
    it("should be definied", function() {
      expect(process.env.S3_ACCESS_KEY).to.not.equal(undefined);
    });
    it("should not be empty", function() {
      expect(process.env.S3_ACCESS_KEY).to.not.equal("");
    });
  });

  describe("S3_SECRET_KEY", function() {
    it("should be definied", function() {
      expect(process.env.S3_SECRET_KEY).to.not.equal(undefined);
    });
    it("should not be empty", function() {
      expect(process.env.S3_SECRET_KEY).to.not.equal("");
    });
  });
});
