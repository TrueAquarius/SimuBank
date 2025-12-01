# Test Case: TC-001-001-003 - Password Validation

**User Story:** [001-001 - User Registration](documents/requirements/Epic%20001%20-%20User%20Account%20Management/User%20Story%20001-001%20-%20User%20Registration.md)

**Description:** This test case verifies that the password validation rules are enforced during registration.

**Test Data:**
- **Data Set:** [Data Set 001 - Default Database](documents/testdata/Data%20Set%20001%20-%20Default%20Database/Data%20Set%20001%20-%20Default%20Database%20-%20Description.md)
- **User:** New User (not existing in the database)

**Preconditions:**
- The user is on the registration page.

**Steps:**
1. Enter a valid name in the "Name" field. [`New User`]
2. Enter a unique and valid email address in the "Email" field. [`new.user@example.com`]
3. Enter a valid mobile number in the "Mobile Number" field. [`212-100-9001`]
4. Enter an invalid password in the "Password" field that does not meet the criteria (e.g., less than 8 characters, no uppercase letter, no number, or no special character). [`invalid`]
5. Re-enter the same password in the "Confirm Password" field. [`invalid`]
6. Click the "Register" button.

**Expected Outcome:**
- The registration fails.
- An error message is displayed indicating that the password does not meet the required criteria.
- The user is not registered and remains on the registration page.