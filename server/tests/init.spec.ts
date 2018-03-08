import 'mocha';
import * as chai from 'chai';
import { expect } from 'chai';
import { App } from './../app';

export let app;

// Runs before any tests
before("Initialize app", async function() {
  console.log("Testing startup...\n");
  app = await App.initAsync();
});

describe("App", function() {
  it("should be initialized", function() {
    expect(app).to.not.equal(undefined);
  });
});
