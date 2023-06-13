import 'chromedriver'
import {Builder} from 'selenium-webdriver'
import percySnapshot from '@percy/selenium-webdriver';
import chrome from 'selenium-webdriver/chrome.js'

(async function example() {
  let driver = await new Builder().forBrowser('chrome').setChromeOptions(
      new chrome.Options().headless()
  ).build();

  try {
    await driver.get('https://browserstack.com/');
    await percySnapshot(driver, 'HomePage');

    await driver.get('https://browserstack.com/docs/');
    await percySnapshot(driver, 'DocsPage');

    await driver.get('https://www.browserstack.com/percy');
    await percySnapshot(driver, 'PERCY Page');

  } finally {
    await driver.quit();
  }
})();