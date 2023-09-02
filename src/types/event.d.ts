import { Events } from '../interfaces/event';
import { EventCategory } from '../enums/event';
import { Bot } from '../bot/Bot';

export type EventCallback<
    T extends EventCategory,
    U extends keyof Events[T]
> = (
    bot: Bot,
    ...args: Events[T][U]
) => Promise<void>