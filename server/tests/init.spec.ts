import 'mocha';
import * as chai from 'chai';
import { expect } from 'chai';
import * as td from 'testdouble';
import { App } from './../app';

// Documentation:
// http://chaijs.com/api/bdd/
// https://mochajs.org/
// https://www.npmjs.com/package/testdouble

export let app;

// Runs before any tests
before("Initialize app", async function() { // linter can't find 'before' even though it exists?
  td.reset();
  console.log("Testing startup...\n");
  app = await App.initAsync();
});

describe("App", function() {
  it("should be initialized", function() {
    expect(app).to.not.equal(undefined);
  });
});
