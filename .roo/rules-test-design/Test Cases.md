# Test Cases

- Test Cases shall be stored in folder ``./documents/testcases``.
- There may be multiple test cases for a particular user story. Each test case shall be in a separate file.
- Please use ``documents\templates\TC-001-002-004 - Account Lockout After 5 Failed Attempts.md`` as a template for test cases.
    - The filename shall start with **TC**, followed by the user story number (here: *001-002*), followed by the test case number for that user story (here: *004*), followed by the test case name.

## Test Steps

Some test steps may require entering data into a field. 
- If you are certain which data to enter, provide the exact data in square brackets at the end of the line. 
- If you are NOT certain which data to use, provide brackets with "tbd.".

Example:
```markdown
**Steps:**
1. Enter the registered email address in the "Email" field. [tbd]
2. Enter an incorrect password in the "Password" field. [`WrongPassword`]
3. Click the "Login" button.
```

