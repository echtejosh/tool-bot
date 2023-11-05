import { Event } from '../interfaces/event';
import { EventCategory } from '../enums/event';
import { Bot } from '../bot/Bot';
import { Service } from './Service';

export interface EventServiceOptions {
    events: Event<EventCategory.Discord, any>[];
}

export class EventService implements Service {
    private readonly events: Event<EventCategory.Discord, any>[];

    constructor(options: EventServiceOptions) {
        this.events = options.events;
    }

    public setupEventListeners(bot: Bot) {
        for (const { name, callback } of this.events) {
            bot.client.on(name, (...args) => callback(bot, ...args));
        }
    }
}