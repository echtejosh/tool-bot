import 'dotenv/config';
import mongoose from 'mongoose';
import { App } from './app/app';
import { Client, GatewayIntentBits } from 'discord.js';
import { Audioplayer } from './app/audioplayer';
import { DisTube } from 'distube';
import * as commands from './commands/index';
import * as events from './events/index';

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildModeration,
        GatewayIntentBits.GuildVoiceStates,
    ],
});

const distube = new DisTube(client, {
    nsfw: false,
    searchSongs: 0,
    searchCooldown: 30,
    leaveOnEmpty: true,
    emptyCooldown: 60,
    leaveOnFinish: false,
    leaveOnStop: true,
    ytdlOptions: {
        filter: 'audioonly',
        quality: 'highestaudio',
        highWaterMark: 1 << 25,
        requestOptions: {
            maxRetries: 3,
            highWaterMark: 1 << 20,
        },
    },
});

const audioplayer = new Audioplayer({
    client: client,
    distube: distube,
});

const app = new App({
    client: client,
    audioplayer: audioplayer,
    commands: Object.values(commands),
    events: Object.values(events),
});

mongoose.connect(process.env.MONGO_URI!)
    .then(() => console.log('Connected to the database'))
    .catch(() => {
        throw new Error('Unable to establish a connection to the database');
    });

client.login(process.env.SECRET_TOKEN)
    .then(() => console.log('Logged in'))
    .catch(() => {
        throw new Error('Unable to login');
    });

app.init();