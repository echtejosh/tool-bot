import { client } from './client';
import { distube } from './distube';
import { EventService } from './services/EventService';
import { MusicService } from './services/MusicService';
import { CommandService } from './services/CommandService';
import { DatabaseService } from './services/DatabaseService';
import * as events from './events';
import * as commands from './commands';

export const event = new EventService({
    events: [
        events.interactionCreate,
        events.messageCreate,
        events.ready,
    ],
});

export const music = new MusicService({
    events: [
        events.addSong,
        events.addList,
    ],
    client,
    distube,
});

export const command = new CommandService({
    commands: Object.values(commands),
});

export const database = new DatabaseService();