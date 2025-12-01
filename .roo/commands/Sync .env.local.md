---
description: "Keep .env.local and .env.local.example in sync"
---

- Create ``.env.local.example`` if it does not exist.
- Verify that all environment variables which are used in the code are present in ``.env.local`` and ``.env.local.example``.
- Verify that all environment variables defined in ``.env.local`` are also defined in ``.env.local.example`` with the same keys (but without real secret values).
- Remove all secrets from ``.env.local.example`` (keep all keys, but replace values with descriptive placeholders).
- Keep all keys in ``.env.local.example`` in the same order as in ``.env.local``.
- Keep all comments in ``.env.local.example`` that explain the purpose of each variable.
- Set variables which are not secrets to their default values in ``.env.local.example``. 
- If any variable is missing in ``.env.local.example``, add it with a placeholder value.
- Ensure that ``.env.local`` is listed in .gitignore to avoid committing secrets to version control.
- Esure that ``.env.local.example`` is committed to version control to provide a template for other developers. Exclude ``.env.local.example`` from ``.gitignore``.
- Do not touch ``.env.test``.