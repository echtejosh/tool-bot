import { createCommand } from '../../app/app';
import { Guild, SlashCommandBuilder } from 'discord.js';
import { Queue } from 'distube';

export const skip = createCommand({
    permissions: [],

    data: new SlashCommandBuilder()
        .setName('skip')
        .setDescription('Skip the song that is playing now'),

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

        if (queue.songs.length <= 1) {
            await queue.stop();
        } else {
            await queue.skip();
        }

        await interaction.reply('The current song has been skipped');
    },
});