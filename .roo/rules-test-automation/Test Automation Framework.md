# Test Automation Framework

- Use **Selenium WebDriver** for test automation. 
- Selenium test scripts shall always be written in **TypeScript**.
- Use **Jest** as test runner.

## Page Object Model

- Follow the **Page Object Model (POM)** design pattern: Each page or significant component of the application shall be encapsulating the selectors and methods to interact with that page's elements. Store such page object models in ``/tests/e2e/pages``.
- Functions which are common to several pages shall be placed in ``/test/e2e/pages/BasePage.ts``. All Page classes shall inherit from that BasePage class.

## Test Data

Each test suite must begin by loading the appropriate test data set into the MongoDB test database. The `database-manager.ts` utility, located in `/tests/e2e/utils`, is designed for this purpose.

The specific data set required for a test is documented within the test case definition (e.g., in the `Test Data` section of the markdown file).

## Test Suites

- A test suite is a collection of test cases for a specific feature, and it is represented by a single spec file (e.g., `login.spec.ts`).
- All test cases within a single test suite **must** use the same test data set.
- The test cases within a suite must be sequenced logically to ensure that the execution of one test does not negatively impact another. For example, a test for a successful login should run before a test that intentionally locks an account.

## Folder Structure

All automated test scripts shall be stored in folder ``/tests`` at the root of the project.

```
/
├── documents/
├── public/
├── src/
├── tests/
│   ├── e2e/
│   │   ├── specs/
│   │   │   ├── login.spec.ts
│   │   │   └── registration.spec.ts
│   │   ├── pages/
│   │   │   ├── login.page.ts
│   │   │   └── registration.page.ts
│   │   ├── utils/
│   │   │   └── database-manager.ts
│   │   └── config/
│   │       └── selenium.config.ts
├── package.json
...
```


### Subfolder Definitions

*   **`specs/`**: This folder contains the actual test scripts, often called "specs". Each file should group related tests for a specific feature or user story (e.g., `login.spec.ts` would contain all tests related to the login functionality).
*   **`pages/`**: This folder is for implementing the Page Object Model (POM) design pattern.
*   **`utils/`**: This folder contains utility scripts that support the test automation framework, such as the `database-manager.ts`.
*   **`config/`**: This folder holds configuration files for the test automation framework. This can include Selenium configuration, environment variables, and settings for different browsers or test environments.

## Pages

Review all relevant pages. Add an ID to those page elements which do not have an ID.

## Page Objects

Each page object shall have a menthod ``open()`` which navigates to that page. Example:

```typescript
public async open() {
    await this.driver.get("http://localhost:3000/xyz");
}
```

An example of a page object can be found here:

``documents\templates\dummy.page.ts.example``

