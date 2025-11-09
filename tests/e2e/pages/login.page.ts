import { By, WebDriver, until } from 'selenium-webdriver';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
    private emailInput = By.id('email');
    private passwordInput = By.id('password');
    private loginButton = By.css('button[type="submit"]');
    private errorMessage = By.css('p.text-red-600.text-center');

    constructor(driver: WebDriver) {
        super(driver);
    }

    public async open() {
        await this.driver.get('http://localhost:3000/login');
    }

    public async enterEmail(email: string) {
        await this.driver.findElement(this.emailInput).clear();
        await this.driver.findElement(this.emailInput).sendKeys(email);
    }

    public async enterPassword(password: string) {
        await this.driver.findElement(this.passwordInput).sendKeys(password);
    }

    public async clickLogin() {
        await this.driver.findElement(this.loginButton).click();
    }

    public async getErrorMessage(): Promise<string> {
        const el = await this.driver.wait(until.elementLocated(this.errorMessage), 5000);
        return el.getText();
    }
}