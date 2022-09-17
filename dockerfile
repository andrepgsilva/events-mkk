FROM node:18-alpine

ENV NODE_OPTIONS=--openssl-legacy-provider
ENV HOST=0.0.0.0

COPY src .

RUN yarn
RUN yarn build

EXPOSE 3000

CMD [ "yarn", "start"]

