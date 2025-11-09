import { By, WebDriver, until } from 'selenium-webdriver';
import { BasePage } from './BasePage';

export class RegistrationPage extends BasePage {
    private nameInput = By.id('name');
    private emailInput = By.id('email');
    private mobileNumberInput = By.id('mobileNumber');
    private passwordInput = By.id('password');
    private confirmPasswordInput = By.id('confirmPassword');
    private registerButton = By.css('button[type="submit"]');
    private errorMessage = By.css('form p.text-red-600');

    constructor(driver: WebDriver) {
        super(driver);
    }

    public async open() {
        await this.driver.get('http://localhost:3000/register');
    }

    public async enterName(name: string) {
        await this.sendKeys(this.nameInput, name);
    }

    public async enterEmail(email: string) {
        await this.sendKeys(this.emailInput, email);
    }

    public async enterMobileNumber(mobileNumber: string) {
        await this.sendKeys(this.mobileNumberInput, mobileNumber);
    }

    public async enterPassword(password: string) {
        await this.sendKeys(this.passwordInput, password);
    }

    public async enterConfirmPassword(password: string) {
        await this.sendKeys(this.confirmPasswordInput, password);
    }

    public async clickRegister() {
        await this.click(this.registerButton);
    }

    public async getErrorMessage(): Promise<string> {
        const el = await this.waitForElementVisible(this.errorMessage, 5000);
        return el.getText();
    }
    public async getEmailValidationMessage(): Promise<string> {
        const el = await this.driver.findElement(this.emailInput);
        return el.getAttribute('validationMessage');
    }
}