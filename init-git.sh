#!/bin/bash

# Initialize git repository
git init

# Add all files to git (except those in .gitignore)
git add .

# Make initial commit
git commit -m "Initial commit: Nordic Weather Dashboard"

echo "Git repository initialized with initial commit!"
