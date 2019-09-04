module.exports = {
    testEnvironment: 'node',
    transform: {
      "^.+\\.ts$": "ts-jest"
    },
    setupFilesAfterEnv: ['./jest.setup.js']
};