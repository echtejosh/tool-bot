import { createEvent, EventType } from '../../app/app';
import { EmbedBuilder } from 'discord.js';

export const addSong = createEvent({
    type: EventType.Distube,
    name: 'addSong',

    cb: async (app, queue, song) => {
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
                    name: 'Estimate time of playback',
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