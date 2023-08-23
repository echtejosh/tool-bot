import { createCommand } from '../../app/app';
import { Guild, SlashCommandBuilder } from 'discord.js';

export const stop = createCommand({
    permissions: [],

    data: new SlashCommandBuilder()
        .setName('stop')
        .setDescription('Stop playing the current audio and clear the queue'),

    cb: async (app, interaction) => {
        const guild = interaction.guild as Guild;
        const queue = app.audioplayer.distube.getQueue(guild);

        if (!queue) {
            await interaction.reply({
                content: 'No songs are playing right now',
                ephemeral: true,
            });

            return;
        }

        await queue.stop();

        await interaction.reply('Stopping playback and clearing the queue');
    },
});