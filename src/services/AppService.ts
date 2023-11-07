import { Event } from '../interfaces/event';
import { EventCategory } from '../enums/event';
import { Bot } from '../bot/Bot';

export interface AppServiceOptions {
    events: Event<EventCategory.Discord, any>[];
}

export class AppService {
    private readonly events: Event<EventCategory.Discord, any>[];

    constructor(options: AppServiceOptions) {
        this.events = options.events;
    }

    public setupEventListeners(bot: Bot) {
        for (const { name, callback } of this.events) {
            bot.client.on(name, (...args) => callback(bot, ...args));
        }
    }
}