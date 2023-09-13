import { bold, EmbedBuilder, Guild, SlashCommandBuilder } from 'discord.js';
import { createCommand } from '../../utils/command';
import { stringify } from '../../utils/common';

export const queue = createCommand({
    data: new SlashCommandBuilder()
        .setName('queue')
        .setDescription('Show upcoming songs'),

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

        const currentSong = queue.songs[0];
        const upcomingSongs = queue.songs.slice(1, 11);

        const description = upcomingSongs
            .map((song, i) => `${bold(stringify(i + 1))} - ${song.name} - ${song.formattedDuration}`)
            .join('\n\n');

        const embed = new EmbedBuilder()
            .setTitle('Now Playing')
            .setDescription(`${currentSong.name} - ${currentSong.formattedDuration}`)
            .setFooter({ text: `${queue.songs.length - 1} song(s) in queue` })
            .addFields({
                name: 'Next up',
                value: description || '-',
            })
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    },
});