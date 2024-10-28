/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: "node",
  transform: {
    "^.+.tsx?$": ["ts-jest",{}],
  },
  "globalSetup": "<rootDir>/src/globalSetup.ts",
  "globalTeardown": "<rootDir>/src/globalTeardown.ts",
  moduleNameMapper: {
    "^@services/(.*)$": "<rootDir>/src/services/$1",
    "^@models/(.*)$": "<rootDir>/src/models/$1",
    "^@utils/(.*)$": "<rootDir>/src/utils/$1",
    "^@configs/(.*)$": "<rootDir>/src/configs/$1",
  },

};