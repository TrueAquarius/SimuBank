# Test Case: TC-001-001-004 - Invalid Email Format

**User Story:** [001-001 - User Registration](documents/requirements/Epic%20001%20-%20User%20Account%20Management/User%20Story%20001-001%20-%20User%20Registration.md)

**Description:** This test case verifies that the system validates the email format during registration.

**Test Data:**
- **Data Set:** [Data Set 001 - Default Database](documents/testdata/Data%20Set%20001%20-%20Default%20Database/Data%20Set%20001%20-%20Default%20Database%20-%20Description.md)
- **User:** New User (not existing in the database)

**Preconditions:**
- The user is on the registration page.

**Steps:**
1. Enter a valid name in the "Name" field. [`New User`]
2. Enter an invalid email address in the "Email" field (e.g., "invalid-email"). [`invalid-email`]
3. Enter a valid mobile number in the "Mobile Number" field. [`212-100-9001`]
4. Enter a valid password in the "Password" field. [`Password123!`]
5. Re-enter the same password in the "Confirm Password" field. [`Password123!`]
6. Click the "Register" button.

**Expected Outcome:**
- The registration fails.
- An error message is displayed indicating that the email format is invalid.
- The user is not registered and remains on the registration page.