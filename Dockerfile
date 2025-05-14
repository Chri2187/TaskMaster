FROM node:20-alpine

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application
COPY . .

# Create a custom build command that generates the correct output file
RUN npm run build && \
    if [ ! -f dist/server.js ]; then \
      if [ -f dist/index.js ]; then \
        cp dist/index.js dist/server.js; \
      else \
        echo "Build failed: Output file not found"; \
        exit 1; \
      fi \
    fi

# Expose the port the app will run on
EXPOSE 3005

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3005

# Define the command to run the app
CMD ["node", "dist/server.js"]