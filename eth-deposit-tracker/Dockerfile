# Use a Node.js base image
FROM node:18

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the container (ensure correct path relative to build context)
COPY package*.json ./

# Clear npm cache and install dependencies
RUN npm cache clean --force && npm install

# Copy the rest of the application files
COPY . .

# Expose the application port
EXPOSE 3000

# Define environment variables (to be provided in docker-compose.yml)
ENV NODE_ENV=production

# Run the application
CMD ["node", "index.js"]
