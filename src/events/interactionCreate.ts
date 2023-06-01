import { Events } from 'discord.js';
import { createEvent, EventType } from '../app/app';
import * as commands from '../commands/index';

export const interactionCreate = createEvent({
    type: EventType.Discord,
    name: Events.InteractionCreate,

    cb: async (app, interaction) => {
        if (!interaction.isCommand()) {
            return;
        }

        const command = Object.values(commands).find(
            ({ data }) => data.name === interaction.commandName,
        );

        if (!command || !interaction.member) {
            return;
        }

        try {
            await command.cb(app, interaction);
        } catch (err) {
            console.error(err);
        }
    },
});