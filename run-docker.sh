#!/bin/bash

# Run the Docker container
docker run -p 3005:3005 -e NODE_ENV=production -e PORT=3005 checklist-app

echo "Docker container for 'checklist-app' has been started."
echo "Access the application at http://localhost:3005"