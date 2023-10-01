# Use an official Node.js runtime as a parent image
FROM node:15

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Expose the port on which your application runs (if necessary)
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
