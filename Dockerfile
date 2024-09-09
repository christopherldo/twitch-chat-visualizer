FROM public.ecr.aws/docker/library/node:18-alpine

# Create node folder for node_modules
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

# Create app directory
WORKDIR /home/node/app

# Install only production dependencies
COPY package.json ./
COPY yarn.lock ./
RUN yarn install --production=true

# Bundle app source
COPY . .

COPY --chown=node:node . .

USER node

EXPOSE 3000

# Start the application in production
CMD ["yarn", "start"]
