module.exports = {
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': '<rootDir>/__mocks__/fileMock.js',
  },
  testEnvironment: 'jsdom',
};
