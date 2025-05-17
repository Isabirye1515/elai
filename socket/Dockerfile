FROM node:20-alpine

# Enable Yarn 4
RUN corepack enable && corepack prepare yarn@stable --activate

WORKDIR /app

# Copy dependency files first for better caching
COPY package.json yarn.lock ./

# Install dependencies (including devDependencies)
RUN yarn install --frozen-lockfile

# Copy application files
COPY . .

EXPOSE 5000

# Use local nodemon from node_modules
CMD ["yarn", "run", "nodemon", "index.js"]