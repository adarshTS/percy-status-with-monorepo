import 'chromedriver'
import {Builder} from 'selenium-webdriver'
import percySnapshot from '@percy/selenium-webdriver';
import chrome from 'selenium-webdriver/chrome.js'
export async function RunTest(){
  let driver = await new Builder().forBrowser('chrome').setChromeOptions(
      new chrome.Options().headless()
  ).build();

  try {
    await driver.get('https://browserstack.com/');
    await percySnapshot(driver, 'HomePage');

    await driver.get('https://browserstack.com/docs');
    await percySnapshot(driver, 'DocsPage');

    await driver.get('https://www.browserstack.com/pricing');
    await percySnapshot(driver, 'Pricing');

    await driver.get('https://www.browserstack.com/users/sign_in');
    await percySnapshot(driver, 'SignUP Page');

  } finally {
    await driver.quit();
  }
}
(async function example() {
  RunTest()
})();