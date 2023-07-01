import { createEvent, EventType } from '../app/app';
import * as commands from '../commands/index';

export const interactionCreate = createEvent({
    type: EventType.Discord,
    name: 'interactionCreate',

    cb: async (app, interaction) => {
        if (
            !interaction.isCommand() ||
            !interaction.inGuild()
        ) {
            return;
        }

        const command = Object.values(commands).find(
            ({ data }) => data.name === interaction.commandName,
        );

        if (
            !command ||
            !interaction.member ||
            !interaction.isChatInputCommand()
        ) {
            return;
        }
        
        try {
            await command.cb(app, interaction);
        } catch (err) {
            console.error(err);
        }
    },
});