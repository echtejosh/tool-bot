import { App, IDiscordEvent } from '../app/app';
import { ClientEvents } from 'discord.js';

class Ready implements IDiscordEvent {
    public name: keyof ClientEvents = 'ready';

    async callback(app: App) {
        await app.deployDiscordCommands();
    };
}

export default new Ready();