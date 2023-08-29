# Mocha

Mocha is a multi-purpose server management client for [Discord](https://discord.com/company). For moderating servers and logging events that happen in real-time!

Make sure you have the dependencies needed to run this. See [here](https://discordjs.guide/preparations/) for the docs.

## Quick setup &mdash; for beginners

### Installation

Clone the repo on your system:

    git clone https://github.com/mochidochi/mocha

Then, navigate to the directory and install the NPM packages:

> **IMPORTANT**
Make sure you install **FFmpeg** on your system before continuing.


    npm install
    
### Credentials
Navigate to `.env.example` and replace the placeholders, after that rename the file to `.env`.

> **IMPORTANT**
Mongoose requires Atlas. See [here](https://www.mongodb.com/docs/manual/reference/connection-string/) for more information.

### Usage
To start the project:

    npm start
