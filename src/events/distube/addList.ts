import { createEvent } from '../../utils/event';
import { EventCategory } from '../../enums/event';
import { inlineCode, TextChannel } from 'discord.js';
import { stringify } from '../../utils/common';

export const addList = createEvent({
    type: EventCategory.Distube,
    name: 'addList',

    callback: async (bot, queue, playlist) => {
        const textChannel = queue.textChannel as TextChannel;
        await textChannel.send(`Added ${inlineCode(stringify(playlist.songs.length))} songs to the queue`);
    },
});