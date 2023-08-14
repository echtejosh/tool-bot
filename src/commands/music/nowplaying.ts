import { createCommand } from '../../app/app';
import { EmbedBuilder, Guild, SlashCommandBuilder } from 'discord.js';

export const nowplaying = createCommand({
    data: new SlashCommandBuilder()
        .setName('nowplaying')
        .setDescription('Show information of the song that is playing'),

    cb: async (app, interaction) => {
        const guild = interaction.guild as Guild;
        const queue = app.player.distube.getQueue(guild);

        if (!queue) {
            await interaction.reply({
                content: 'No songs are playing right now',
                ephemeral: true,
            });

            return;
        }

        const activeSong = queue.songs[0];
        const upcomingSong = queue.songs[1];

        const embed = new EmbedBuilder()
            .setTitle(activeSong.name!)
            .setTimestamp()
            .setFields([
                {
                    name: 'Artist',
                    value: activeSong.uploader.name!,
                    inline: true,
                },
                {
                    name: 'Duration',
                    value: `${queue.formattedCurrentTime}/${activeSong.formattedDuration}`,
                    inline: true,
                },
                {
                    name: 'Requested by',
                    value: activeSong.user!.tag,
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