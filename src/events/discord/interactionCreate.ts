import { createEvent, EventType } from '../../app/app';
import * as commands from '../../commands';

export const interactionCreate = createEvent({
    type: EventType.Discord,
    name: 'interactionCreate',

    cb: async (app, interaction) => {
        if (!interaction.isCommand()) {
            return;
        }

        if (!interaction.inGuild()) {
            await interaction.reply({
                content: 'I cannot use commands inside dms',
                ephemeral: true,
            });

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