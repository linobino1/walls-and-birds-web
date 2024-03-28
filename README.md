# Welcome to RePay!

Simple template to get started with [Remix](https://remix.run) and [PayloadCMS](https://payloadcms.com), without the monorepo messiness!

![repay-header](https://github.com/manawiki/repay/assets/84349818/9fc343c2-0c6f-4d2d-a603-c838f8d21156)

## Development

Copy .env.example to .env and fill the required environment variables.

```sh
yarn;
yarn dev
```

## Deployment

First, build your app for production:

```sh
yarn build
```

Then run the app in production mode:

```sh
yarn start
```

### Fly.io Setup

1. Create an account on [Fly.io](https://fly.io)
1. Install the [Fly CLI](https://fly.io/docs/getting-started/installing-flyctl/)
1. Run `flyctl login` and follow the prompts
1. Run `flyctl launch` in the project root
1. Enter `y` to `copy its configuration to the new app`
1. Enter `N` to `tweak these settings`
1. The app should deploy now
1. Now you can set up the Github Action

### Github Action

1. Create a deploy token by running `flyctl tokens create deploy`
1. Create a new secret on your repository called `FLY_API_TOKEN` with your deploy token at `Settings > Secrets and Variables > Actions`

## Media Files

Media files should be stored in a S3 bucket. Create a bucket at Cloudflare, AWS, or any other provider and fill the required environment variables in the .env file. When using Cloudflare R2, specify `S3_REGION=auto`
