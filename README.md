# Express.js Server

This is a simple Node.js backend application using Express.js.

## Prerequisites

- Node.js (v18 or later)
- npm or yarn

## Installation

Clone the repository and install dependencies:

```sh
git clone https://github.com/rizaton/chatapp-restapi.git
cd chatapp-restapi
npm install
```

## Running Locally

Start the development server:

```sh
npm run dev
```

## Running with Docker

Build and run the Docker container

Refer to [docs/README.Docker.md](docs/README.Docker.md) for running with Docker.

## Environtment Variables

Create a `.env` file and configure the following:

```ini
#----------APP----------
NODE_ENV=production
APP_ENV=development
PORT=8000

#----------JWT----------
JWT_REFRESH=jwt_secret_64
JWT_ACCESS=jwt_secret_64
REFRESH_EXPIRES=
ACCESS_EXPIRES=

#----------MONGODB----------
# Use this for docker mongodb
MONGO_URI=mongodb://user:user_password@127.0.0.1:27017/chatapp?authSource=user

# Use this if using mongodb atlas
# MONGO_URI=mongodb+srv://user:user_password@127.0.0.1:27017/chatapp?authSource=user

MONGO_INITDB_ROOT_USERNAME=user
MONGO_INITDB_ROOT_PASSWORD=user_password

#----------REDIS----------
# Use this for docker
REDIS_HOST=127.0.0.1

# Use this for without docker
# REDIS_HOST=localhost

REDIS_PORT=6379
REDIS_PASSWORD=your_redis_password

#----------LOCALTONET----------
LOCALTONET_TOKEN=your_localtonet_token
```

## API Documentation

Refer to [docs/README.API.md](docs/README.API.md) for API endpoints and usage.
