import { Events, Event } from '../interfaces/event';
import { EventCategory } from '../enums/event';

export function createEvent<
    T extends EventCategory,
    U extends keyof Events[T]
>(event: Event<T, U>) {
    return event;
}