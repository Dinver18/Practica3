#Builder
FROM node:21.7-alpine3.19 as builder


ENV NODE_ENV build


WORKDIR /home/node

COPY . .


RUN npm ci \
    && npm run build \
    && npm prune --production
#


#Production
FROM node:21.7-alpine3.19


ENV NODE_ENV production

USER node
WORKDIR /home/node

COPY --from=builder /home/node/package*.json /home/node/
COPY --from=builder /home/node/node_modules/ /home/node/node_modules/
COPY --from=builder /home/node/dist/ /home/node/dist/

EXPOSE 3000

CMD ["node", "dist/main.js"]