# Test Case: TC-001-002-004 - Account Lockout After 5 Failed Attempts

**User Story:** [001-002 - User Login](documents/requirements/Epic%20001%20-%20User%20Account%20Management/User%20Story%20001-002%20-%20User%20Login.md)

**Description:** This test case verifies that a user's account is locked after 5 consecutive failed login attempts.

**Test Data:**
- **Data Set:** [Data Set 001 - Default Database](documents/testdata/Data%20Set%20001%20-%20Default%20Database/Data%20Set%20001%20-%20Default%20Database%20-%20Description.md)
- **User:** `dummy.user@example.com`
- **Password:** `Password123!`

**Preconditions:**
- The user is registered with a valid email and password.
- The user's account is not currently locked.
- The user is on the login page.

**Steps:**
1. Enter a valid, registered email address in the "Email" field. [`dummy.user@example.com`]
2. Enter an incorrect password in the "Password" field. [`WrongPassword`]
3. Click the "Login" button.
4. Repeat steps 2 and 3 four more times (for a total of 5 failed attempts).
5. After the 5th failed attempt, enter the correct password in the "Password" field. [`Password123!`]
6. Click the "Login" button.

**Expected Outcome:**
- After the 5th failed attempt, an error message is displayed indicating the account has been locked.
- On the 6th attempt (with the correct password), the login fails.
- The user is not logged in, and no session is created.
- The user receives a notification (e.g., via email) about the account lockout.