import { Client } from 'discord.js';
import {
    CommandBuilder,
    CommandCallback,
    DiscordEvents,
    EventCallback,
    AudioPlayerEvents,
} from '../types';
import { DisTubeEvents } from 'distube';
import { Player } from './player';

export enum EventType {
    Discord = 'discord',
    Distube = 'distube',
    Player = 'audioplayer',
}

export interface Events {
    [EventType.Discord]: DiscordEvents;
    [EventType.Distube]: DisTubeEvents;
    [EventType.Player]: AudioPlayerEvents;
}

export interface Event<
    T extends EventType,
    U extends keyof Events[T]
> {
    type: T;
    name: U;
    cb: EventCallback<T, U>;
}

export interface BaseCommand {
    data: CommandBuilder;
}

export interface Command extends BaseCommand {
    data: CommandBuilder;
    cb: CommandCallback;
}

interface AppOptions {
    client: Client;
    player: Player;
    commands: Command[];
    events: Event<any, any>[];
}

export class App {
    public readonly client: Client;
    public readonly player: Player;
    public readonly commands: Command[];
    public readonly events: Event<any, any>[];

    constructor(options: AppOptions) {
        this.client = options.client;
        this.player = options.player;
        this.commands = options.commands;
        this.events = options.events;
    }

    public init() {
        this.registerEvents();
    }

    private registerEvents() {
        for (const { type, name, cb } of this.events) {
            switch (type) {
                case EventType.Discord:
                    this.client.on(name, (...args) => cb(this, ...args));
                    break;
                case EventType.Distube:
                    this.player.distube.on(name, (...args: any[]) => cb(this, ...args));
                    break;
                case EventType.Player:
                    this.player.emitter.on(name, (...args) => cb(this, ...args));
                    break;
            }
        }
    }

    public deployCommands() {
        const commands = this.commands.map(({ data }) => data);
        this.client.application?.commands.set(commands);
    }
}

export function createEvent<
    T extends EventType,
    U extends keyof Events[T]
>(event: Event<T, U>) {
    return event;
}

export function createCommand(command: Command) {
    return command;
}