import { createEvent, EventType } from '../../app/app';
import { TextChannel } from 'discord.js';
import { inlineCode } from '../../util';

export const addList = createEvent({
    type: EventType.Distube,
    name: 'addList',

    cb: async (app, queue, playlist) => {
        const textChannel = queue.textChannel as TextChannel;
        await textChannel.send(`Added ${inlineCode(playlist.songs.length)} songs to the queue`);
    },
});