# Epic "User Account Management" 

## Epic Description:
As a customer, I want to be able to create and manage my online banking account securely so that I can access my financial information and perform transactions safely.

## Epic Goals:

- Allow users to register and create an online banking profile.
- Enable secure login/logout functionality.
- Provide password recovery/reset options.
- Ensure user data is protected and compliant with best security practices (e.g., encryption, session management).

## Acceptance Criteria (Epic-level):

- Users can register with basic details (name, email, phone, password).
- Users can log in and log out securely.
- Authentication is validated against stored credentials.
- Passwords are encrypted and never stored in plain text.
- The system enforces session timeout after inactivity.

## User Story "User Registration"

As a new customer,
I want to register for an online banking account using my personal details,
so that I can securely access my banking information and services.

Acceptance Criteria:

- The registration form must include fields for:
    - Full name
    - Email address
    - Mobile number
    - Password (with validation: min. 8 chars, one uppercase, one number, one special character)
    - Email address must be unique and validated before registration completes.
- The system must hash and store passwords securely.
- Successful registration should redirect the user to the login page with a success message.
- Duplicate email or missing required fields should show an error message.

## User Story "Login"

As a registered customer,
I want to log in to my online banking account using my credentials,
so that I can securely access my accounts and perform banking activities.

Acceptance Criteria:

- The login form must include:
    - Email address
    - Password
- The system must validate credentials against stored user data.
- Passwords must be compared using secure hash verification (not plain text).
- On successful login:
    - The user is redirected to their dashboard/home screen.
    - A welcome message or user name is displayed.
    - A secure session is created for the user.
- On unsuccessful login:
    - The user receives an error message: “Invalid email or password.”
    - No details about which field is incorrect are revealed (to prevent enumeration).
- Session timeout occurs after a defined period of inactivity (e.g., 10 minutes).
- Multiple failed login attempts trigger temporary account lockout (e.g., after 5 tries).
- Logout option is visible once logged in and ends the session securely.

## User Story "Logout"

As a logged-in customer,
I want to log out of my online banking account securely,
so that my personal and financial information remains protected when I finish using the application.

Acceptance Criteria:

- The application must provide a visible and easily accessible “Logout” option on all authenticated pages (e.g., in the navigation bar or user menu).
- When the user clicks “Logout”:
    - The user’s active session/token is invalidated immediately.
    - The user is redirected to the login page.
    - A confirmation message such as “You have successfully logged out” is displayed.
- After logout:
    - The user should not be able to access any authenticated pages by using the browser’s Back button.
    - Any cached session data or authentication tokens must be cleared from local/session storage.
- If the user remains inactive beyond the session timeout limit, they are automatically logged out and redirected to the login page.
