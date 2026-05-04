FROM node:20-alpine

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all other client files
COPY . .

# Expose Vite's default port
EXPOSE 5173

# Run the dev server and bind to 0.0.0.0
CMD ["npm", "run", "dev", "--", "--host"]
