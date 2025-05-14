#!/bin/bash

# Build the Docker image
docker build -t checklist-app .

echo "Docker image 'checklist-app' has been built successfully."
echo "To run the app, use: ./run-docker.sh or docker run -p 3005:3005 -e NODE_ENV=production -e PORT=3005 checklist-app"