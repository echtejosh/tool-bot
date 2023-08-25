import { createCommand } from '../../app/app';
import { bold } from '../../util';
import { EmbedBuilder, Guild, SlashCommandBuilder } from 'discord.js';

export const queue = createCommand({
    data: new SlashCommandBuilder()
        .setName('queue')
        .setDescription('Show upcoming songs'),

    cb: async (app, interaction) => {
        const guild = interaction.guild as Guild;
        const queue = app.audioPlayer.distube.getQueue(guild);

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
            .map((song, i) => `${bold(i + 1)} - ${song.name} - ${song.formattedDuration}`)
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