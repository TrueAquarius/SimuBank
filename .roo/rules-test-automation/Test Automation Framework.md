# Test Automation Framework

- Use **Selenium WebDriver** for test automation. 
- Selenium test scripts shall always be written in **TypeScript**.
- Use **Jest** as test runner.

## Page Object Model

- Follow the **Page Object Model (POM)** design pattern: Each page or significant component of the application shall be encapsulating the selectors and methods to interact with that page's elements. Store such page object models in ``/tests/e2e/pages``.
- Functions which are common to several pages shall be placed in ``/test/e2e/pages/BasePage.ts``. All Page classes shall inherit from that BasePage class.

## Test Data

Select the right test data for each test scenario. Each test scenario shall start with uploading the right database to MongoDB. Please read ``documents\testdata\Test Data Management.md`` for details.



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
│   │   └── config/
│   │       └── selenium.config.ts
├── package.json
...
```


### Subfolder Definitions

*   **`specs/`**: This folder contains the actual test scripts, often called "specs". Each file should group related tests for a specific feature or user story (e.g., `login.spec.ts` would contain all tests related to the login functionality).
*   **`pages/`**: This folder is for implementing the Page Object Model (POM) design pattern.
*   **`config/`**: This folder holds configuration files for the test automation framework. This can include Selenium configuration, environment variables, and settings for different browsers or test environments.
