module.exports = {
  preset: 'ts-jest',
  transform: { "^.+\\.(ts|tsx|js|jsx)?$": "ts-jest" }, // js-файлы добавлены, чтобы избежать проблемы с импортами модулей
  testEnvironment: 'jsdom',
};