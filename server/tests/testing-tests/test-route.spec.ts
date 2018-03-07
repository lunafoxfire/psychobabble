import 'mocha';
import * as chai from 'chai';
import { expect } from 'chai';
import * as chaiHttp from 'chai-http';
import { app } from './../../app';

chai.use(chaiHttp);

describe('test route', () => {
  it('should return 200 OK', (done) => {
    chai.request(app)
      .get('/test-route')
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});
