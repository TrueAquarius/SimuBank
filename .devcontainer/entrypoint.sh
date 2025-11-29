#!/bin/bash
set -e

# Change the ownership of the /workspace directory to the node user
chown -R node:node /workspace

# Execute the main command as the node user
exec gosu node "$@"
