import 'mocha';
import * as chai from 'chai';
import { expect } from 'chai';
import { app } from './init.spec';

describe("Environment variables", function() {
  describe("NODE_ENV", function() {
    it("should be definied", function() {
      expect(process.env.NODE_ENV).to.exist;
    });
    it("should be 'testing'", function() {
      expect(process.env.NODE_ENV).to.equal('testing');
    });
  });

  describe("SERVER_PORT", function() {
    it("should be definied", function() {
      expect(process.env.SERVER_PORT).to.exist;
    });
    it("should be a number", function() {
      const portNumber = parseInt(process.env.SERVER_PORT);
      expect(portNumber).to.be.a('number');
    });
    it("should be between 0 and 65535", function() {
      const portNumber = parseInt(process.env.SERVER_PORT);
      expect(portNumber).to.be.not.lessThan(0);
      expect(portNumber).to.be.not.greaterThan(65535);
    });
  });

  describe("DEFAULT_ADMIN_USERNAME", function() {
    it("should be definied", function() {
      expect(process.env.DEFAULT_ADMIN_USERNAME).to.exist;
    });
    it("should not be empty", function() {
      expect(process.env.DEFAULT_ADMIN_USERNAME).to.not.be.empty;
    });
  });

  describe("DEFAULT_ADMIN_PASSWORD", function() {
    it("should be definied", function() {
      expect(process.env.DEFAULT_ADMIN_PASSWORD).to.exist;
    });
    it("should not be empty", function() {
      expect(process.env.DEFAULT_ADMIN_PASSWORD).to.not.be.empty;
    });
  });

  describe("POSTGRES_HOST", function() {
    it("should be definied", function() {
      expect(process.env.POSTGRES_HOST).to.exist;
    });
    it("should not be empty", function() {
      expect(process.env.POSTGRES_HOST).to.not.be.empty;
    });
  });

  describe("POSTGRES_PORT", function() {
    it("should be definied", function() {
      expect(process.env.POSTGRES_PORT).to.exist;
    });
    it("should be a number", function() {
      const portNumber = parseInt(process.env.POSTGRES_PORT);
      expect(portNumber).to.be.a('number');
    });
    it("should be between 0 and 65535", function() {
      const portNumber = parseInt(process.env.POSTGRES_PORT);
      expect(portNumber).to.be.not.lessThan(0);
      expect(portNumber).to.be.not.greaterThan(65535);
    });
  });

  describe("POSTGRES_USERNAME", function() {
    it("should be definied", function() {
      expect(process.env.POSTGRES_USERNAME).to.exist;
    });
    it("should not be empty", function() {
      expect(process.env.POSTGRES_USERNAME).to.not.be.empty;
    });
  });

  describe("POSTGRES_PASSWORD", function() {
    it("should be definied", function() {
      expect(process.env.POSTGRES_PASSWORD).to.exist;
    });
    it("should not be empty", function() {
      expect(process.env.POSTGRES_PASSWORD).to.not.be.empty;
    });
  });

  describe("POSTGRES_DATABASE", function() {
    it("should be definied", function() {
      expect(process.env.POSTGRES_DATABASE).to.exist;
    });
    it("should not be empty", function() {
      expect(process.env.POSTGRES_DATABASE).to.not.be.empty;
    });
  });

  describe("JWT_SECRET", function() {
    it("should be definied", function() {
      expect(process.env.JWT_SECRET).to.exist;
    });
    it("should not be empty", function() {
      expect(process.env.JWT_SECRET).to.not.be.empty;
    });
  });

  describe("SENDGRID_API_KEY", function() {
    it("should be definied", function() {
      expect(process.env.SENDGRID_API_KEY).to.exist;
    });
    it("should not be empty", function() {
      expect(process.env.SENDGRID_API_KEY).to.not.be.empty;
    });
  });

  describe("NOREPLY_EMAIL", function() {
    it("should be definied", function() {
      expect(process.env.NOREPLY_EMAIL).to.exist;
    });
    it("should not be empty", function() {
      expect(process.env.NOREPLY_EMAIL).to.not.be.empty;
    });
    it("should be a valid email address")
  });

  describe("S3_BUCKET_NAME", function() {
    it("should be definied", function() {
      expect(process.env.S3_BUCKET_NAME).to.exist;
    });
    it("should not be empty", function() {
      expect(process.env.S3_BUCKET_NAME).to.not.be.empty;
    });
  });

  describe("S3_ACCESS_KEY", function() {
    it("should be definied", function() {
      expect(process.env.S3_ACCESS_KEY).to.exist;
    });
    it("should not be empty", function() {
      expect(process.env.S3_ACCESS_KEY).to.not.be.empty;
    });
  });

  describe("S3_SECRET_KEY", function() {
    it("should be definied", function() {
      expect(process.env.S3_SECRET_KEY).to.exist;
    });
    it("should not be empty", function() {
      expect(process.env.S3_SECRET_KEY).to.not.be.empty;
    });
  });

  describe("GOOGLE_APPLICATION_CREDENTIALS", function() {
    it("should be definied", function() {
      expect(process.env.GOOGLE_APPLICATION_CREDENTIALS).to.exist;
    });
    it("should not be empty", function() {
      expect(process.env.GOOGLE_APPLICATION_CREDENTIALS).to.not.be.empty;
    });
  });
});
