import 'dotenv/config';
import { App } from './app/app';
import { Client, GatewayIntentBits } from 'discord.js';
import { processDiscordCommands, processDiscordEvents } from './util/util';

import Echo from './commands/echo';
import Clear from './commands/clear';

import Ready from './events/ready';
import InteractionCreate from './events/interactionCreate';

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
    ],
});

const commands = processDiscordCommands(
    Echo,
    Clear,
);

const events = processDiscordEvents(
    Ready,
    InteractionCreate,
);

const app = new App(
    client,
    commands,
    events,
);

app.login(process.env.SECRET_TOKEN!)
    .then(() => console.log('Logged in'))
    .catch(() => console.error('Invalid token'));

app.init();