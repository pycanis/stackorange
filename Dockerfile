# TODO: multistage build

FROM node:lts-alpine3.21

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

COPY src src
COPY public public
COPY prisma prisma
COPY tsconfig.json tsconfig.json
COPY tsconfig.server.json tsconfig.server.json
COPY next.config.ts next.config.ts
COPY postcss.config.mjs postcss.config.mjs

RUN npm run generate

RUN npm run build

ENV NODE_ENV=production

# ENTRYPOINT ["tail", "-f", "/dev/null"]
CMD ["sh", "-c", "npm run migrate && node dist/server.js"]