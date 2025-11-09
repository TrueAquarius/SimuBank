# Test Case: TC-001-001-002 - Registration with existing email

**User Story:** [001-001 - User Registration](documents/requirements/Epic%20001%20-%20User%20Account%20Management/User%20Story%20001-001%20-%20User%20Registration.md)

**Description:** This test case verifies that a user cannot register with an email address that is already in use.

**Test Data:**
- **Data Set:** [Data Set 001 - Default Database](documents/testdata/Data%20Set%20001%20-%20Default%20Database/Data%20Set%20001%20-%20Default%20Database%20-%20Description.md)
- **User:** Dummy User (existing in the database)

**Preconditions:**
- The user is on the registration page.
- An account with the email address to be used for registration already exists in the system.

**Steps:**
1. Enter a valid name in the "Name" field. [`Dummy User`]
2. Enter an existing email address in the "Email" field. [`dummy.user@example.com`]
3. Enter a valid mobile number in the "Mobile Number" field. [`212-100-9000`]
4. Enter a valid password in the "Password" field. [`Password123!`]
5. Re-enter the same password in the "Confirm Password" field. [`Password123!`]
6. Click the "Register" button.

**Expected Outcome:**
- The registration fails.
- An error message is displayed indicating that the email address is already in use.
- The user is not registered and remains on the registration page.