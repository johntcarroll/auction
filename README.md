# March Madness Auction Tool - Nuxt 3

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Install the dependencies:

```bash
# yarn
yarn install

# npm
npm install

# pnpm
pnpm install
```

Install and Run Redis via Docker in the background:

```bash
docker run --name redis -d -p 6379:6379 redis/redis-stack-server:latest
```

Run database migrations:

```bash
node migration/migrate.js
```

## Development Server

Start the development server on http://localhost:3000

```bash
npm run dev -- -o
```

## Stopping Redis

Stop REDIS if you'd like:

```bash
docker container stop redis
```
