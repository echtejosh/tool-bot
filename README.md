# Mocha

Mocha is a versatile server management bot designed to enhance the functionality and moderation capabilities of your [Discord](https://discord.com/company) server. It streamlines server administration, logs real-time events, manages audio playback, and leverages data tracking through APIs.

Make sure you have the required dependencies needed to run Mocha. See [here](https://discordjs.guide/preparations/) for more information.

## Quick setup &mdash; for beginners

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


