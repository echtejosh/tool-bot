import { App, IDiscordEvent } from '../app/app';
import { BaseInteraction, ClientEvents } from 'discord.js';

class InteractionCreate implements IDiscordEvent {
    public name: keyof ClientEvents = 'interactionCreate';

    async callback(app: App, interaction: BaseInteraction) {
        if (!interaction.isCommand()) {
            return;
        }

        const command = app.commands.get(interaction.commandName);

        if (!command) {
            return;
        }

        try {
            await command.callback(app, interaction);
        } catch (err) {
            console.error(err);
        }
    };
}

export default new InteractionCreate();