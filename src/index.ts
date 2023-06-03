import 'dotenv/config';
import { App } from './app/app';
import { Client, GatewayIntentBits } from 'discord.js';
import * as commands from './commands/index';
import * as events from './events/index';

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildModeration,
    ],
});

const app = new App({
    client: client,
    commands: Object.values(commands),
    events: Object.values(events),
});
client
    .login(process.env.SECRET_TOKEN)
    .then(() => console.log('Logged in'));

app.init();