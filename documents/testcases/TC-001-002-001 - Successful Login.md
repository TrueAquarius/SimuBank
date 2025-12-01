# Test Case: TC-001-002-001 - Successful Login

**User Story:** [001-002 - User Login](documents/requirements/Epic%20001%20-%20User%20Account%20Management/User%20Story%20001-002%20-%20User%20Login.md)

**Description:** This test case verifies that a registered user can successfully log in with valid credentials.

**Test Data:**
- **Data Set:** [Data Set 001 - Default Database](documents/testdata/Data%20Set%20001%20-%20Default%20Database/Data%20Set%20001%20-%20Default%20Database%20-%20Description.md)
- **User:** `dummy.user@example.com`
- **Password:** `Password123!`

**Preconditions:**
- The user is registered with a valid email and password.
- The user is on the login page.

**Steps:**
1. Enter the registered email address in the "Email" field. [`dummy.user@example.com`]
2. Enter the correct password in the "Password" field. [`Password123!`]
3. Click the "Login" button.

**Expected Outcome:**
- The user is successfully authenticated.
- The user is redirected to the dashboard or main account page.
- A new session is created for the user.