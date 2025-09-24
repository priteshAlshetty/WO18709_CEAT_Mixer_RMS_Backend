# Use Node 20.18.0
FROM node:20.18.0

# Set working directory in container
WORKDIR /usr/src/app

# Copy only package files first for better caching
COPY package*.json ./

# Install dependencies (including devDependencies for development)
RUN npm install

# Copy the rest of the project files
COPY . .

# Expose backend port
EXPOSE 3000

# Default command (will be overridden by docker-compose for dev)
CMD ["npm", "run", "dev"]
