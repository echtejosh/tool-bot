import 'dotenv/config';
import { Client, GatewayIntentBits } from 'discord.js';
import { Bot } from './bot/Bot';
import { EventService } from './services/EventService';
import { CommandService } from './services/CommandService';
import { MusicService } from './services/MusicService';
import DisTube from 'distube';
import mongoose from 'mongoose';

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildModeration,
        GatewayIntentBits.GuildVoiceStates,
    ],
});

const distube = new DisTube(client);

import * as events from './events';

const eventService = new EventService({
    events: [
        events.interactionCreate,
        events.messageCreate,
        events.ready,
    ],
});

const musicService = new MusicService({
    events: [
        events.addSong,
        events.addList,
    ],
    client,
    distube,
});

import * as commands from './commands';

const commandService = new CommandService({
    commands: Object.values(commands),
});

const bot = new Bot({
    client,
    eventService,
    commandService,
    musicService,
});

mongoose.connect(process.env.MONGO_URI!);

bot.login(process.env.DISCORD_TOKEN!);

bot.init();