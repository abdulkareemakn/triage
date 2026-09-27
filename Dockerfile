FROM node:24-bookworm-slim@sha256:0e0ff40c39bc087845bfb27465a0df4ea419520094bc35842ff83dd8cbe6f9b6 AS build
WORKDIR /app
RUN npm install --global pnpm@11.3.0
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
COPY apps/client/package.json apps/client/package.json
COPY apps/server/package.json apps/server/package.json
COPY packages/emails/package.json packages/emails/package.json
COPY packages/mail/package.json packages/mail/package.json
COPY packages/shared packages/shared
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm build
RUN pnpm --filter @mern/server deploy --prod /runtime

FROM node:24-bookworm-slim@sha256:0e0ff40c39bc087845bfb27465a0df4ea419520094bc35842ff83dd8cbe6f9b6
ENV NODE_ENV=production
WORKDIR /app/server
COPY --from=build --chown=node:node /runtime ./
COPY --from=build --chown=node:node /app/apps/client/dist /app/client/dist
USER node
EXPOSE 3001
CMD ["node", "--import", "./alias-runtime.js", "dist/index.js"]
