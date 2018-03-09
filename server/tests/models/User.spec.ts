import 'mocha';
import * as chai from 'chai';
import { expect } from 'chai';
import * as td from 'testdouble';
import { Repository, getRepository } from 'typeorm';
import { app } from './../init.spec';
import { User, UserRegistrationOptions } from './../../models/User';
import { RoleType } from './../../models/Role';

describe("User", function(){
  afterEach(function() {
    td.reset();
  })
  describe("registerAsync", function() {
    // it("should return a new User", async function() {
    //   const getRepo = td.function(getRepository);
    //   const userRepo = td.object<Repository<User>>(new Repository<User>());
    //   console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$");
    //   console.log(userRepo);
    //   console.log(getRepo);
    //   // td.verify(userRepo.save(td.matchers.anything()));
    //   td.verify(getRepo(td.matchers.anything()));
    //   // td.when(await userRepo.save(td.matchers.anything())).thenResolve(123456);
    //   let regOptions: UserRegistrationOptions = {
    //     username: "Test",
    //     email: "test@test.com",
    //     password: "password1",
    //     roleType: RoleType.Client,
    //     preValidated: true
    //   }
    //
    //   let newUser = await User.registerAsync(regOptions);
    //   expect(newUser).to.be.a('User');
    // });
  })
});
