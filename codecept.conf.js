require('ts-node/register')
const { setHeadlessWhen } = require('@codeceptjs/configure');
const { bootstrap } = require('./presettings.ts');

// turn on headless mode when running with HEADLESS=true environment variable
// HEADLESS=true npx codecept run
setHeadlessWhen(process.env.HEADLESS);

exports.config = {
  tests: './tests/**_test.ts',
  output: './output',
  helpers: {
    Playwright: {
      url: 'https://jakearchibald.github.io/svgomg/',
      show: true,
      windowSize: '1200x900',
      browser: 'chromium'
    },
    CustomHelper: {
      require: './CustomHelper.ts'
    },
    FileSystem: {},
  },
  bootstrap,
  include: {
    homePage: './homePage.ts'
  },
  name: 'typescript-boilerplate',
  plugins: {
    retryFailedStep: {
      enabled: true
    },
    screenshotOnFail: {
      enabled: true
    }
  }
}