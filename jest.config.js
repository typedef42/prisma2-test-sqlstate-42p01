const path = require('path');

module.exports = {
  roots: ['<rootDir>/src'],
  testMatch: [
    '__test__/**/*.+(ts|tsx|js)',
    '**/?(*.)+(spec|test).+(ts|tsx|js)'
  ],
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest'
  },
  preset: 'ts-jest',
  testEnvironment: path.join(__dirname, './prisma/prisma-test-environment.js')
};
