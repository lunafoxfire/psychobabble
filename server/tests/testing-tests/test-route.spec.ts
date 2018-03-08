import 'mocha';
import * as chai from 'chai';
import { expect } from 'chai';
import * as chaiHttp from 'chai-http';
import { app } from './../init.spec';

chai.use(chaiHttp);

describe('test route', function() {
  it('should return 200 OK', async function() {
    chai.request(app)
      .get('/test-route')
      .then((res) => {
        expect(res).to.have.status(200);
      })
      .catch((err) => {
        throw err;
      });
  });
});

describe('test route 2', function() {
  it('should return 200 OK', async function() {
    chai.request(app)
      .get('/test-route-2')
      .then((res) => {
        expect(res).to.have.status(200);
      })
      .catch((err) => {
        throw err;
      });
  });
});
