import { WebDriver, until } from 'selenium-webdriver';
import { RegistrationPage } from '../pages/registration.page';
import { setupDatabaseForSuite, cleanupDatabaseForSuite, DatabaseManager } from '../utils/database-manager';
import { buildDriver } from '../config/selenium.config';

describe('Registration Test Suite', () => {
    let driver: WebDriver;
    let registrationPage: RegistrationPage;
    let dbManager: DatabaseManager;

    beforeAll(async () => {
        dbManager = await setupDatabaseForSuite(process.env.MONGODB_URI!, process.env.MONGODB_NAME!, 'Data Set 001 - Default Database');
        driver = await buildDriver();
        registrationPage = new RegistrationPage(driver);
    });

    afterAll(async () => {
        if (driver) {
            await driver.quit();
        }
        if (dbManager) {
            await cleanupDatabaseForSuite(dbManager);
        }
    });

    beforeEach(async () => {
        await registrationPage.open();
    });

    it('TC-001-001-001 - Successful Registration', async () => {
        await registrationPage.enterName('New User');
        await registrationPage.enterEmail('new.user@example.com');
        await registrationPage.enterMobileNumber('212-100-9001');
        await registrationPage.enterPassword('Password123!');
        await registrationPage.enterConfirmPassword('Password123!');
        await registrationPage.clickRegister();
        
        await driver.wait(until.urlContains('/login'), 5000);
        const currentUrl = await driver.getCurrentUrl();
        expect(currentUrl).toContain('/login');
    });

    it('TC-001-001-002 - Registration with existing email', async () => {
        await registrationPage.enterName('Dummy User');
        await registrationPage.enterEmail('dummy.user@example.com');
        await registrationPage.enterMobileNumber('212-100-9000');
        await registrationPage.enterPassword('Password123!');
        await registrationPage.enterConfirmPassword('Password123!');
        await registrationPage.clickRegister();

        const errorMessage = await registrationPage.getErrorMessage();
        expect(errorMessage).toBe('User with this email already exists.');
    });

    it('TC-001-001-003 - Password Validation', async () => {
        await registrationPage.enterName('New User');
        await registrationPage.enterEmail('new.user2@example.com');
        await registrationPage.enterMobileNumber('212-100-9002');
        await registrationPage.enterPassword('invalid');
        await registrationPage.enterConfirmPassword('invalid');
        await registrationPage.clickRegister();

        const errorMessage = await registrationPage.getErrorMessage();
        expect(errorMessage).toBe('Password must be at least 8 characters long and contain one uppercase letter, one number, and one special character.');
    });

    it('TC-001-001-004 - Invalid Email Format', async () => {
        await registrationPage.enterName('New User');
        await registrationPage.enterEmail('invalid-email');
        await registrationPage.enterMobileNumber('212-100-9003');
        await registrationPage.enterPassword('Password123!');
        await registrationPage.enterConfirmPassword('Password123!');
        await registrationPage.clickRegister();

        const validationMessage = await registrationPage.getEmailValidationMessage();
        expect(validationMessage).not.toBe('');
    });

    it('TC-001-001-005 - Passwords do not match', async () => {
        await registrationPage.enterName('New User');
        await registrationPage.enterEmail('new.user3@example.com');
        await registrationPage.enterMobileNumber('212-100-9004');
        await registrationPage.enterPassword('Password123!');
        await registrationPage.enterConfirmPassword('Password1234!');
        await registrationPage.clickRegister();

        const errorMessage = await registrationPage.getErrorMessage();
        expect(errorMessage).toBe('Passwords do not match.');
    });
});