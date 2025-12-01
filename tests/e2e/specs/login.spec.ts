import { WebDriver, until } from 'selenium-webdriver';
import { LoginPage } from '../pages/login.page';
import { setupDatabaseForSuite, cleanupDatabaseForSuite, DatabaseManager } from '../utils/database-manager';
import { buildDriver } from '../config/selenium.config';

describe('Login Test Suite', () => {
    let driver: WebDriver;
    let loginPage: LoginPage;
    let dbManager: DatabaseManager;

    beforeAll(async () => {
        dbManager = await setupDatabaseForSuite(process.env.MONGODB_URI!, process.env.MONGODB_NAME!, 'Data Set 001 - Default Database');
        driver = await buildDriver();
        loginPage = new LoginPage(driver);
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
        await loginPage.open();
    });

    it('TC-001-002-001 - Successful Login', async () => {
        await loginPage.enterEmail('dummy.user@example.com');
        await loginPage.enterPassword('Password123!');
        await loginPage.clickLogin();
        
        await driver.wait(until.urlContains('/dashboard'), 5000);
        const currentUrl = await driver.getCurrentUrl();
        expect(currentUrl).toContain('/dashboard');
    });

    it('TC-001-002-002 - Failed Login (Invalid Password)', async () => {
        await loginPage.enterEmail('dummy.user@example.com');
        await loginPage.enterPassword('WrongPassword');
        await loginPage.clickLogin();

        const errorMessage = await loginPage.getErrorMessage();
        expect(errorMessage).toContain('Invalid credentials');
    });

    it('TC-001-002-003 - Failed Login (Unregistered Email)', async () => {
        await loginPage.enterEmail('unregistered.user@example.com');
        await loginPage.enterPassword('any_password');
        await loginPage.clickLogin();

        const errorMessage = await loginPage.getErrorMessage();
        expect(errorMessage).toContain('Invalid credentials');
    });

    it.skip('TC-001-002-004 - Account Lockout After 5 Failed Attempts', async () => {
        for (let i = 0; i < 5; i++) {
            await loginPage.enterEmail('dummy.user@example.com');
            await loginPage.enterPassword('WrongPassword');
            await loginPage.clickLogin();
        }

        let errorMessage = await loginPage.getErrorMessage();
        expect(errorMessage).toContain('Account locked');

        // Attempt to login with correct credentials
        await loginPage.enterEmail('dummy.user@example.com');
        await loginPage.enterPassword('Password123!');
        await loginPage.clickLogin();

        errorMessage = await loginPage.getErrorMessage();
        expect(errorMessage).toContain('Account locked');
    });
});