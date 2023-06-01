import { createEvent, EventType } from '../app/app';
import { Events } from 'discord.js';

export const ready = createEvent({
    type: EventType.Discord,
    name: Events.ClientReady,

    cb: async (app) => {
        app.deployCommands();
    },
});