import 'mocha';
import * as chai from 'chai';
import { expect } from 'chai';
import * as chaiHttp from 'chai-http';
import { App } from './../../app';

chai.use(chaiHttp);

describe('test route', () => {
  it('should return 200 OK', async () => {
    chai.request(await App.initAsync())
      .get('/test-route')
      .then((res) => {
        expect(res).to.have.status(200);
      })
      .catch((err) => {
        throw err;
      });
  });
});

describe('test route 2', () => {
  it('should return 200 OK', async () => {
    chai.request(await App.initAsync())
      .get('/test-route-2')
      .then((res) => {
        expect(res).to.have.status(200);
      })
      .catch((err) => {
        throw err;
      });
  });
});
