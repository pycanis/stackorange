FROM node:lts-alpine3.21 AS builder

WORKDIR /app

RUN corepack enable

COPY pnpm-lock.yaml pnpm-workspace.yaml .npmrc package.json ./

COPY apps/web ./apps/web
COPY apps/server ./apps/server
COPY packages/database ./packages/database
COPY packages/shared ./packages/shared

RUN pnpm install --frozen-lockfile

RUN pnpm --filter database generate
RUN pnpm build

RUN pnpm deploy --filter server --prod /prod/server

FROM node:lts-alpine3.21

WORKDIR /app

COPY --from=builder /app/apps/web/dist ./dist-web
COPY --from=builder /app/packages/database/prisma ./prisma
COPY --from=builder /prod/server ./

ENV NODE_ENV=production

# ENTRYPOINT ["tail", "-f", "/dev/null"]
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/index.js"]