FROM node:lts-alpine3.21

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

RUN npm run build

EXPOSE 3000

ENV NODE_ENV=production

# ENTRYPOINT ["tail", "-f", "/dev/null"]
CMD ["sh", "-c", "npm run generate && npm run migrate && node server.js"]