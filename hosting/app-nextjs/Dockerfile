# Use a Node.js runtime image as the base image
FROM node:16.8-alpine

# Create and set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files to the working directory
COPY ../../package.json /app/package.json
COPY ../../package-lock.json /app/package-lock.json

# Install the application's dependencies
RUN npm install

# Copy the rest of the application's code to the working directory
COPY ../.. .

# Run the application
CMD ./node_modules/.bin/next