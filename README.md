# Mocha

Mocha is a multipurpose server management bot for [Discord](https://discord.com/company). For moderating servers and logging events that happen in real-time!

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
Navigate to `.env.example` and replace the placeholders, after that rename the file to `.env`.

> **IMPORTANT**
Mongoose requires Atlas. See [here](https://www.mongodb.com/docs/manual/reference/connection-string/) for more information.

### Usage
To start the project:

    npm start


## Docker setup

### Credentials
Navigate to `docker-compose.example.yml` and set variable values, after that remove `.example` from the file name.

### Usage

> **IMPORTANT**
For windows, make sure that you use [WSL 2](https://learn.microsoft.com/en-us/windows/wsl/install) when using `docker-compose build`. 

Before you run, make sure you build the container first:

    docker-compose build

To start the project:

    docker-compose up
    


