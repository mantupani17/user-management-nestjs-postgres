# Step 1: Use the official Node.js image as the base image
FROM node:18-alpine

# Step 2: Set the working directory inside the container
WORKDIR /usr/src/app

# Step 3: Copy the package.json and package-lock.json (or yarn.lock) into the container
COPY package*.json ./

# Step 4: Install the dependencies
RUN npm install --production

# Step 5: Copy the rest of your application code into the container
COPY . .

# Step 6: Build the application (if needed, for example with TypeScript)
RUN npm run build

# Step 7: Expose the port that the app will listen on
EXPOSE 3009

# Step 8: Define the command to run the application
CMD ["npm", "run", "start:prod"]
