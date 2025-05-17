FROM node:18-alpine

# Enable Corepack for Yarn 4
RUN corepack enable && corepack prepare yarn@stable --activate

WORKDIR /app

# Copy dependency files
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy source files
COPY . .

# Build TypeScript
RUN yarn build

# Expose port (adjust as needed)
EXPOSE 4000

# For development (with hot-reload)
CMD ["yarn", "dev"]

# For production (uncomment below)
# CMD ["yarn", "start"]