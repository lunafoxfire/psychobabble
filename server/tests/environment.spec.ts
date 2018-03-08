import 'mocha';
import * as chai from 'chai';
import { expect } from 'chai';
import { App } from './../app';

describe('Environment variables', function() {
  describe('NODE_ENV', function() {
    it('should be definied', function() {
      expect(process.env.NODE_ENV).to.not.equal(undefined);
    });
  });
  describe('SERVER_PORT', function() {
    it('should be definied', function() {
      expect(process.env.SERVER_PORT).to.not.equal(undefined);
    });
  });
  describe('DEFAULT_ADMIN_USERNAME', function() {
    it('should be definied', function() {
      expect(process.env.DEFAULT_ADMIN_USERNAME).to.not.equal(undefined);
    });
  });
  describe('DEFAULT_ADMIN_PASSWORD', function() {
    it('should be definied', function() {
      expect(process.env.DEFAULT_ADMIN_PASSWORD).to.not.equal(undefined);
    });
  });
  describe('POSTGRES_HOST', function() {
    it('should be definied', function() {
      expect(process.env.POSTGRES_HOST).to.not.equal(undefined);
    });
  });
  describe('POSTGRES_PORT', function() {
    it('should be definied', function() {
      expect(process.env.POSTGRES_PORT).to.not.equal(undefined);
    });
  });
  describe('POSTGRES_USERNAME', function() {
    it('should be definied', function() {
      expect(process.env.POSTGRES_USERNAME).to.not.equal(undefined);
    });
  });
  describe('POSTGRES_PASSWORD', function() {
    it('should be definied', function() {
      expect(process.env.POSTGRES_PASSWORD).to.not.equal(undefined);
    });
  });
  describe('POSTGRES_DATABASE', function() {
    it('should be definied', function() {
      expect(process.env.POSTGRES_DATABASE).to.not.equal(undefined);
    });
  });
  describe('JWT_SECRET', function() {
    it('should be definied', function() {
      expect(process.env.JWT_SECRET).to.not.equal(undefined);
    });
  });
  describe('SENDGRID_API_KEY', function() {
    it('should be definied', function() {
      expect(process.env.SENDGRID_API_KEY).to.not.equal(undefined);
    });
  });
  describe('NOREPLY_EMAIL', function() {
    it('should be definied', function() {
      expect(process.env.NOREPLY_EMAIL).to.not.equal(undefined);
    });
  });
  describe('S3_BUCKET_NAME', function() {
    it('should be definied', function() {
      expect(process.env.S3_BUCKET_NAME).to.not.equal(undefined);
    });
  });
  describe('S3_ACCESS_KEY', function() {
    it('should be definied', function() {
      expect(process.env.S3_ACCESS_KEY).to.not.equal(undefined);
    });
  });
  describe('S3_SECRET_KEY', function() {
    it('should be definied', function() {
      expect(process.env.S3_SECRET_KEY).to.not.equal(undefined);
    });
  });
});
