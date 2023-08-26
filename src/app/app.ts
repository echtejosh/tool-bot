import { Client } from 'discord.js';
import {
    CommandBuilder,
    CommandCallback,
    DiscordEvents,
    EventCallback,
    AudioPlayerEvents,
} from '../types';
import { DisTubeEvents } from 'distube';
import { AudioPlayer } from './audioPlayer';

export enum EventType {
    Discord = 'discord',
    Distube = 'distube',
    AudioPlayer = 'audioplayer',
}

export interface Events {
    [EventType.Discord]: DiscordEvents;
    [EventType.Distube]: DisTubeEvents;
    [EventType.AudioPlayer]: AudioPlayerEvents;
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
    audioPlayer: AudioPlayer;
    commands: Command[];
    events: Event<any, any>[];
}

export class App {
    public readonly client: Client;
    public readonly audioPlayer: AudioPlayer;
    public readonly commands: Command[];
    public readonly events: Event<any, any>[];

    constructor(options: AppOptions) {
        this.client = options.client;
        this.audioPlayer = options.audioPlayer;
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
                    this.audioPlayer.distube.on(name, (...args: any[]) => cb(this, ...args));
                    break;
                case EventType.AudioPlayer:
                    this.audioPlayer.emitter.on(name, (...args) => cb(this, ...args));
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