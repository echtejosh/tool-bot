import { EmbedBuilder } from 'discord.js';
import { createEvent } from '../../utils/event';
import { EventCategory } from '../../enums/event';

export const addSong = createEvent({
    type: EventCategory.Distube,
    name: 'addSong',

    callback: async (bot, queue, song) => {
        const queueLength = queue.songs.length - 1;

        const embed = new EmbedBuilder()
            .setAuthor({ name: 'Added to Queue' })
            .setTitle(song.name!)
            .setTimestamp()
            .setFields([
                {
                    name: 'Artist',
                    value: song.uploader.name!,
                    inline: true,
                },
                {
                    name: 'Duration',
                    value: song.formattedDuration!,
                    inline: true,
                },
                {
                    name: 'Estimated time of playback',
                    value: queue.formattedCurrentTime,
                    inline: true,
                },
                {
                    name: 'Position',
                    value: queueLength ? queueLength.toString() : '-',
                    inline: true,
                },
            ]);

        queue.textChannel!.send({ embeds: [embed] });
    },
});