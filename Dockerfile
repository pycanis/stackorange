FROM node:lts-alpine3.21

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

COPY src src
COPY public public
COPY prisma prisma
COPY server.js server.js
COPY tsconfig.json tsconfig.json
COPY astro.config.mjs astro.config.mjs

RUN npm run build

ENV NODE_ENV=production

# ENTRYPOINT ["tail", "-f", "/dev/null"]
CMD ["sh", "-c", "npm run generate && npm run migrate && node server.js"]