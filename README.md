# Bruba API

# Prerequisites

- Node.js 22.12
- Docker Desktop

# Getting started

1. Clone the repo using `git clone <...>`
2. In the root of the project, run `npm install`
3. Copy and rename `dev.env` to the root of the project
4. Run `npm run start:docker`. This does 2 things:
   1. Launches a local Postgres 15 Database
   2. Launches the latest published version of the API
5. **Alternatively**, run `npm run start:db`. This:
   1. Launches a local Postgres 15 Database
   2. Runs a live development instance based on whatever code is in your workspace.

At any point, if the database is started, you can run `npm run prisma:reset` to reset the database, including its **schema and data**.

At any point, if any docker services in this proejct are started `npm run cleanup:docker` to remove all containers from your system so they don't take up resources.

# API Documentation / Notes

TODO