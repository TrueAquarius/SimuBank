import { WebDriver, By, WebElement, until } from 'selenium-webdriver';

export abstract class BasePage {
  protected driver: WebDriver;

  constructor(driver: WebDriver) {
    this.driver = driver;
  }

  async navigateTo(path: string = ''): Promise<void> {
    // This assumes a base URL is configured elsewhere, e.g., in a config file
    await this.driver.get(path);
  }

  async findElement(locator: By): Promise<WebElement> {
    return await this.driver.findElement(locator);
  }

  async findElements(locator: By): Promise<WebElement[]> {
    return await this.driver.findElements(locator);
  }

  async waitForElement(locator: By, timeout: number = 10000): Promise<WebElement> {
    await this.driver.wait(until.elementLocated(locator), timeout);
    return await this.findElement(locator);
  }

  async waitForElementVisible(locator: By, timeout: number = 10000): Promise<WebElement> {
    const element = await this.waitForElement(locator, timeout);
    await this.driver.wait(until.elementIsVisible(element), timeout);
    return element;
  }

  async waitForElementClickable(locator: By, timeout: number = 10000): Promise<WebElement> {
    const element = await this.waitForElement(locator, timeout);
    await this.driver.wait(until.elementIsEnabled(element), timeout);
    return element;
  }

  async click(locator: By): Promise<void> {
    const element = await this.waitForElementClickable(locator);
    await element.click();
  }

  async sendKeys(locator: By, text: string): Promise<void> {
    const element = await this.waitForElementVisible(locator);
    await element.clear();
    await element.sendKeys(text);
  }

  async getText(locator: By): Promise<string> {
    const element = await this.waitForElementVisible(locator);
    return await element.getText();
  }

  async getAttribute(locator: By, attribute: string): Promise<string> {
    const element = await this.waitForElement(locator);
    return await element.getAttribute(attribute);
  }

  async isElementPresent(locator: By): Promise<boolean> {
    try {
      await this.findElement(locator);
      return true;
    } catch (error) {
      return false;
    }
  }

  async isElementVisible(locator: By): Promise<boolean> {
    try {
      const element = await this.findElement(locator);
      return await element.isDisplayed();
    } catch (error) {
      return false;
    }
  }

  async waitForPageLoad(timeout: number = 10000): Promise<void> {
    await this.driver.wait(async () => {
      const readyState = await this.driver.executeScript('return document.readyState');
      return readyState === 'complete';
    }, timeout);
  }

  async scrollToElement(locator: By): Promise<void> {
    const element = await this.waitForElement(locator);
    await this.driver.executeScript('arguments[0].scrollIntoView(true);', element);
  }

  async getCurrentUrl(): Promise<string> {
    return await this.driver.getCurrentUrl();
  }

  async getPageTitle(): Promise<string> {
    return await this.driver.getTitle();
  }

  async refresh(): Promise<void> {
    await this.driver.navigate().refresh();
  }

  async goBack(): Promise<void> {
    await this.driver.navigate().back();
  }

  async goForward(): Promise<void> {
    await this.driver.navigate().forward();
  }

  // Common selectors that might be used across pages
  protected getByTestId(testId: string): By {
    return By.css(`[data-testid="${testId}"]`);
  }

  protected getById(id: string): By {
    return By.id(id);
  }

  protected getByClassName(className: string): By {
    return By.className(className);
  }

  protected getByXPath(xpath: string): By {
    return By.xpath(xpath);
  }

  protected getByCss(selector: string): By {
    return By.css(selector);
  }

  protected getByLinkText(text: string): By {
    return By.linkText(text);
  }

  protected getByPartialLinkText(text: string): By {
    return By.partialLinkText(text);
  }
}

export default BasePage;