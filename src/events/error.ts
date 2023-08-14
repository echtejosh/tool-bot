import { createEvent, EventType } from '../app/app';
import { delay } from '../util';

export const error = createEvent({
    type: EventType.Player,
    name: 'error',

    cb: async (app, interaction) => {
        await delay(1000);

        try {
            const reply: Function = interaction.replied ? interaction.followUp.bind(interaction) : interaction.reply.bind(interaction);

            reply('I was unable to process your request, please try again');
        } catch (err) {
            console.error(err);
        }
    },
});