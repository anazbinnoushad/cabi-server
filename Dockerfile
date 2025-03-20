FROM node:20-alpine

WORKDIR /app

COPY ./package.json ./package.json
COPY ./pnpm-lock.yaml ./pnpm-lock.yaml

RUN npm install -g pnpm@8.13.1
RUN pnpm install --frozen-lockfile

COPY . .

RUN npx prisma generate
RUN pnpm build

EXPOSE 3000

CMD ["pnpm", "start"]
