# Test Case: TC-001-002-002 - Failed Login (Invalid Password)

**User Story:** [001-002 - User Login](documents/requirements/Epic%20001%20-%20User%20Account%20Management/User%20Story%20001-002%20-%20User%20Login.md)

**Description:** This test case verifies that a generic error message is displayed when a user tries to log in with an incorrect password.

**Test Data:**
- **Data Set:** [Data Set 001 - Default Database](documents/testdata/Data%20Set%20001%20-%20Default%20Database/Data%20Set%20001%20-%20Default%20Database%20-%20Description.md)
- **User:** `dummy.user@example.com`
- **Password:** `Password123!`

**Preconditions:**
- The user is registered with a valid email and password.
- The user is on the login page.

**Steps:**
1. Enter the registered email address in the "Email" field. [`dummy.user@example.com`]
2. Enter an incorrect password in the "Password" field. [`WrongPassword`]
3. Click the "Login" button.

**Expected Outcome:**
- The login attempt fails.
- A generic error message (e.g., "Invalid credentials") is displayed to the user.
- The user is not logged in, and no session is created.