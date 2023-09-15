# Mocha

An all-in-one server management companion for [Discord](https://discord.com/company). Elevate your server's capabilities with advanced moderation tools, audio playback features, real-time weather tracking, and server logging!

## Features

> **NOTE**
Some features may still be a work in progress

- Event-driven Architecture
- User-friendly Setup
- Docker Compatibility
- Database Support with Mongoose
- Modular Command and Event Implementation

## Quick setup &mdash; for beginners

Make sure you have the required dependencies needed to run Mocha. See [here](https://discordjs.guide/preparations/) for more information.

### Installation

Clone the repo on your system:

    git clone https://github.com/mochidochi/mocha

Then, navigate to the directory and install the NPM packages:

> **IMPORTANT**
Make sure you install [FFmpeg](https://ffmpeg.org/) on your system before continuing.


    npm install
    
### Credentials

> **IMPORTANT**
Mongoose requires Atlas. See [here](https://www.mongodb.com/docs/manual/reference/connection-string/) for more information.

Navigate to `.env.example` and replace the placeholders, after that rename the file to `.env`.

### Usage
To start the project:

    npm start


## Docker setup

### Credentials
Navigate to `docker-compose.yml` and set variable values inside of environment.

### Usage

> **IMPORTANT**
For windows, make sure that you use [WSL](https://learn.microsoft.com/en-us/windows/wsl/install) when using `docker-compose build`. 

Before you run, make sure you build the container first:

    docker-compose build

To start the project:

    docker-compose up


