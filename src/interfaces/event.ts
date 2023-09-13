import { ClientEvents } from 'discord.js';
import { DisTubeEvents } from 'distube';
import { MusicServiceEvents } from '../services/MusicService';
import { EventCallback } from '../types/event';
import { EventCategory } from '../enums/event';

export interface Events {
    [EventCategory.Discord]: ClientEvents;
    [EventCategory.Distube]: DisTubeEvents;
    [EventCategory.MusicService]: MusicServiceEvents;
}

export interface Event<
    T extends EventCategory,
    U extends keyof Events[T]
> {
    type: T;
    name: U;
    callback: EventCallback<T, U>;
}