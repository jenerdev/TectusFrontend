#!/bin/bash

BRANCH_NAME=$(git symbolic-ref --short HEAD)

PATTERN="^(feature|bugfix|hotfix|release)\/[A-Z]+-[0-9]+(-[a-z0-9]+)*$"

if [[ ! "$BRANCH_NAME" =~ $PATTERN ]]; then
  echo ""
  echo "❌ Invalid branch name: \"$BRANCH_NAME\""
  echo "✅ Expected: feature/ABC-1234-short-description"
  exit 1
fi

echo "✅ Valid branch name: $BRANCH_NAME"
