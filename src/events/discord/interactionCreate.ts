import { createEvent } from '../../utils/event';
import { EventCategory } from '../../enums/event';

export const interactionCreate = createEvent({
    type: EventCategory.Discord,
    name: 'interactionCreate',

    callback: async (bot, interaction) => {
        if (!interaction.isCommand()) {
            return;
        }

        if (!interaction.inGuild()) {
            await interaction.reply({
                content: 'Sorry, usage of commands in dms are disables',
                ephemeral: true,
            });

            return;
        }

        const command = Object.values(bot.services.command.commands).find(
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
            await command.callback(bot, interaction);
        } catch (err) {
            console.error(err);
        }
    },
});