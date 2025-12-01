# Test Case: TC-001-001-001 - Successful Registration

**User Story:** [001-001 - User Registration](documents/requirements/Epic%20001%20-%20User%20Account%20Management/User%20Story%20001-001%20-%20User%20Registration.md)

**Description:** This test case verifies that a new user can successfully register for an account with valid information.

**Test Data:**
- **Data Set:** [Data Set 001 - Default Database](documents/testdata/Data%20Set%20001%20-%20Default%20Database/Data%20Set%20001%20-%20Default%20Database%20-%20Description.md)
- **User:** New User (not existing in the database)

**Preconditions:**
- The user is on the registration page.
- The email address to be used for registration is not already in the system.

**Steps:**
1. Enter a valid name in the "Name" field. [`New User`]
2. Enter a unique and valid email address in the "Email" field. [`new.user@example.com`]
3. Enter a valid mobile number in the "Mobile Number" field. [`212-100-9001`]
4. Enter a valid password in the "Password" field that meets the criteria (min 8 characters, 1 uppercase letter, 1 number, 1 special character). [`Password123!`]
5. Re-enter the same password in the "Confirm Password" field. [`Password123!`]
6. Click the "Register" button.

**Expected Outcome:**
- The user is successfully registered.
- The user is redirected to the login page.
- A confirmation message is displayed to the user.
- The user's account details are stored correctly in the database.
- The password is encrypted and stored securely.