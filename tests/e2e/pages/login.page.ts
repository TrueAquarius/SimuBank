import { By, WebDriver } from 'selenium-webdriver';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
    private emailInput = By.id('email');
    private passwordInput = By.id('password');
    private loginButton = By.xpath("//button[text()='Log In']");
    private errorMessage = By.css('p.text-red-600');

    constructor(driver: WebDriver) {
        super(driver);
    }

    public async open() {
        await this.driver.get('http://localhost:3000/login');
    }

    public async enterEmail(email: string) {
        await this.driver.findElement(this.emailInput).sendKeys(email);
    }

    public async enterPassword(password: string) {
        await this.driver.findElement(this.passwordInput).sendKeys(password);
    }

    public async clickLogin() {
        await this.driver.findElement(this.loginButton).click();
    }

    public async getErrorMessage(): Promise<string> {
        return this.driver.findElement(this.errorMessage).getText();
    }
}