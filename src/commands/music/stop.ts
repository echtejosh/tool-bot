import { Guild, SlashCommandBuilder } from 'discord.js';
import { createCommand } from '../../utils/command';

export const stop = createCommand({
    data: new SlashCommandBuilder()
        .setName('stop')
        .setDescription('Stop playing the current audio and clear the queue'),

    callback: async (app, interaction) => {
        const guild = interaction.guild as Guild;
        const queue = app.musicService.getQueue(guild);

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