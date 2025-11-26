import { By, WebDriver } from 'selenium-webdriver';
import { BasePage } from './BasePage';

export class RegistrationPage extends BasePage {
  constructor(driver: WebDriver) {
    super(driver);
  }

  private abcInput = By.id('abc');
  private xyzInput = By.id('xyz');
  private saveButton = By.id('button-save');
  private errorMessage = By.id('error-message');

  public async open() {
    await this.driver.get('http://localhost:3000/dummy');
  }

  public async enterAbc(abc: string) {
    await this.driver.findElement(this.abcInput).sendKeys(abc);
  }

  public async enterXyz(xyz: string) {
    await this.driver.findElement(this.xyzInput).sendKeys(xyz);
  }

  public async clickSave() {
    await this.driver.findElement(this.saveButton).click();
  }

  public async getErrorMessage(): Promise<string> {
    return this.driver.findElement(this.errorMessage).getText();
  }
}