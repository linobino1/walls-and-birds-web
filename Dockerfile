FROM node:18-bookworm-slim as base

ARG PAYLOAD_PUBLIC_SERVER_URL
ENV PAYLOAD_PUBLIC_SERVER_URL $PAYLOAD_PUBLIC_SERVER_URL

FROM base as builder

WORKDIR /home/node
COPY package*.json ./

COPY . .
RUN yarn install
RUN yarn build

FROM base as runtime

ENV NODE_ENV=production

WORKDIR /home/node
COPY package*.json  ./

RUN yarn install --production
COPY --from=builder /home/node/public ./public
COPY --from=builder /home/node/dist ./dist
COPY --from=builder /home/node/build ./build

EXPOSE 4040

CMD ["yarn", "run", "start"]
