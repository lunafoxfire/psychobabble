import 'reflect-metadata';
import './../config/config';
import { createConnection } from 'typeorm';
import { TestData } from './../test-data/test-data';

console.log(
`===============================
==    TEST DATA GENERATOR    ==
===============================`
);

console.log("Connecting to the database...");
createConnection()
  .then(async connection => {
    console.log("Successfully connected to the database.");
    console.log("Loading test data...");
    await TestData.loadAllTestDataAsync();
    console.log("Test data loading complete!");
  })
  .catch((err) => console.error("An error occured!\n" + err));
