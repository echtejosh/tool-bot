import { Guild, SlashCommandBuilder } from 'discord.js';
import { createCommand } from '../../utils/command';

export const skip = createCommand({
    data: new SlashCommandBuilder()
        .setName('skip')
        .setDescription('Skip the song that is playing now'),

    callback: async (bot, interaction) => {
        const guild = interaction.guild as Guild;
        const queue = bot.musicService.getQueue(guild);

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