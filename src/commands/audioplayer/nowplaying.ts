import { createCommand } from '../../app/app';
import { EmbedBuilder, Guild, SlashCommandBuilder } from 'discord.js';

export const nowplaying = createCommand({
    permissions: [],

    data: new SlashCommandBuilder()
        .setName('nowplaying')
        .setDescription('Show information of the song that is playing'),

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

        const currentSong = queue.songs[0];
        const upcomingSong = queue.songs[1];

        const embed = new EmbedBuilder()
            .setTitle(currentSong.name!)
            .setTimestamp()
            .setFields([
                {
                    name: 'Artist',
                    value: currentSong.uploader.name!,
                    inline: true,
                },
                {
                    name: 'Duration',
                    value: `${queue.formattedCurrentTime}/${currentSong.formattedDuration}`,
                    inline: true,
                },
                {
                    name: 'Requested by',
                    value: currentSong.user!.tag,
                    inline: true,
                },
                {
                    name: 'Next up',
                    value: upcomingSong?.name ?? '-',
                    inline: true,
                },
            ]);

        await interaction.reply({ embeds: [embed] });
    },
});