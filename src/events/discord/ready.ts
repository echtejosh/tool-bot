import { createEvent } from '../../utils/event';
import { EventCategory } from '../../enums/event';

export const ready = createEvent({
    type: EventCategory.Discord,
    name: 'ready',

    callback: async (bot) => {
        bot.commandService.deployCommands(bot.client);
    },
});