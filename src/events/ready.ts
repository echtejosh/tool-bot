import { createEvent, EventType } from '../app/app';

export const ready = createEvent({
    type: EventType.Discord,
    name: 'ready',

    cb: async (app) => {
        app.deployCommands();
    },
});