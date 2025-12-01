module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/tests/e2e/specs/**/*.spec.ts'],
  setupFiles: ['./tests/e2e/config/loadEnv.ts'],
  testTimeout: 30000,
  maxWorkers: 1,
  transform: {
    '^.+\\.ts$': [
      'ts-jest',
      {
        tsconfig: {
          moduleResolution: 'node',
        },
      },
    ],
  },
};