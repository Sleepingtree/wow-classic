# Wow classic sign up

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.

## Set up
- run `yarn` to install dependices
- create/run a postgress instace locally or via docker
- create a new discord application [here](https://discord.com/developers/applications) or [see t3 guide for more info](https://create.t3.gg/en/usage/next-auth#setting-up-the-default-discordprovider)
- add a `.env` file to add the postgressURL as `DATABASE_URL`, discord client id as `DISCORD_CLIENT_ID` and the secret key as `DISCORD_CLIENT_SECRET`
- run `yarn prisma db push` to seed the DB or run `yarn prisma migrate deploy` for the production experiance.

## What's next?
If I get around to it clean up the user profiles and add discord intergration

## Learn More

To learn more about the [T3 Stack](https://create.t3.gg/), take a look at the following resources:

- [Documentation](https://create.t3.gg/)
- [Learn the T3 Stack](https://create.t3.gg/en/faq#what-learning-resources-are-currently-available) — Check out these awesome tutorials

You can check out the [create-t3-app GitHub repository](https://github.com/t3-oss/create-t3-app) — your feedback and contributions are welcome!

## How do I deploy this?

Follow our deployment guides for [Vercel](https://create.t3.gg/en/deployment/vercel), [Netlify](https://create.t3.gg/en/deployment/netlify) and [Docker](https://create.t3.gg/en/deployment/docker) for more information.
