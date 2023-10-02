# Dockerfile
# Pull the base image
FROM node:13
# Set the working directory
WORKDIR /reactapp
# Copy app dependencies to container
COPY ./package*.json ./
# Add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# Install dependencies
RUN npm install

# # UI modules
# RUN npm install @mui/icons-material
# RUN npm install @mui/material


# Deploy app for local development
CMD npm start --host 0.0.0.0 --port 3000 --disableHostCheck true