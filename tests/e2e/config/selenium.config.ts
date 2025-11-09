import { Builder } from 'selenium-webdriver';
import * as chrome from 'selenium-webdriver/chrome';

const options = new chrome.Options();
// Add any desired options here, for example:
// options.addArguments('--headless');

export const buildDriver = () => {
    return new Builder()
        .forBrowser('chrome')
        .setChromeOptions(options)
        .build();
};