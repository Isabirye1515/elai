FROM node:20-alpine
RUN corepack enable
RUN corepack prepare yarn@stable --activate

# 3. Continue with your build
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn build
EXPOSE 3000
CMD ['yarn', 'start']