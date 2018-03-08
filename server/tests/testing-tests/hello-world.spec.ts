import 'mocha';
import { expect } from 'chai';
import { doThing } from './hello-world';

describe('doThing function', () => {
  it('should return hello world message', () => {
    const result = doThing();
    expect(result).to.equal("Hello testing world");
  });
});
