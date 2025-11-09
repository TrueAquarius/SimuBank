---
description: "Create an automated test script for a specific test case."
argument-hint: <test-case-id>
---

Switch to "Test Automation" mode.

Create an automated Selenium test script for the test case identified by `<test-case-id>`.

**Guidelines for static data (e.g., strings, messages):**
- Unless specific values are required by the test case, check the actual application for existing strings.
- If the strings in the implementation are suitable for the test's purpose, reuse them to ensure the test reflects the current state of the UI.