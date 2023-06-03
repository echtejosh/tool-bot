import { Client } from 'discord.js';
import { CommandBuilder, CommandCallback, DiscordEvents, EventCallback } from '../types';

export enum EventType {
    Discord = 0,
}

export interface EventMap {
    [EventType.Discord]: DiscordEvents;
}

export interface Event<
    T extends EventType,
    U extends keyof EventMap[T]
> {
    type: T;
    name: U;
    cb: EventCallback<T, U>;
}

export interface BaseCommand {
    data: CommandBuilder;
    cb: CommandCallback;
}

export interface Command extends BaseCommand {
    data: CommandBuilder;
}

interface AppOptions {
    client: Client;
    commands: Command[];
    events: Event<any, any>[];
}

export class App {
    public readonly client: Client;
    public readonly commands: Command[];
    public readonly events: Event<any, any>[];

    constructor(options: AppOptions) {
        this.client = options.client;
        this.commands = options.commands;
        this.events = options.events;
    }

    public init() {
        this.registerEvents();
    }

    private registerEvents() {
        for (const { name, cb } of this.events) {
            this.client.on(name as string, (...args) => cb(this, ...args));
        }
    }

    public deployCommands() {
        const commands = this.commands.map(({ data }) => data);
        this.client.application?.commands.set(commands);
        console.log(commands)
    }
}

export function createEvent<
    T extends EventType,
    U extends keyof EventMap[T]
>(event: Event<T, U>) {
    return event;
}

export function createCommand(command: Command) {
    return command;
}
