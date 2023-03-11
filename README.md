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

Install Database via Docker (REDIS):

```bash
docker run -p 6379:6379 -it redis/redis-stack-server:latest
```

Load the database:

```bash
node migration/migrate.js
```

## Development Server

Start the development server on http://localhost:3000

```bash
npm run dev -- -o
```
