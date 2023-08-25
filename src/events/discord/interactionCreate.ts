import { GuildMember } from 'discord.js';
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
                content: 'Sorry, usage of commands in dms are disables',
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
            if (typeof command.cb === 'function') {
                await command.cb(app, interaction);
            } else {
                console.error('Callback to this command is ignored');
            }
        } catch (err) {
            console.error(err);
        }
    },
});