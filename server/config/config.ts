import * as envConfig from './../../server-env.json'; // Errors but runs fine

// Get environment from command line
process.env.NODE_ENV = (process.env.NODE_ENV || 'development').trim(); // Kill extra whitespace

if(!(
  process.env.NODE_ENV === 'production' ||
  process.env.NODE_ENV === 'development' ||
  process.env.NODE_ENV === 'testing'
)) {
    throw new Error(`Invalid node environment: ${process.env.NODE_ENV}`);
}

// Assign all secrets to environment variables
Object.keys(envConfig).forEach((key) => {
  process.env[key] = envConfig[key];
});
