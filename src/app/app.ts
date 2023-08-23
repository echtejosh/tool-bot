import { Awaitable, Client } from 'discord.js';
import { CommandBuilder, CommandCallback, DiscordEvents, EventCallback, PlayerEvents } from '../types';
import { DisTubeEvents } from 'distube';
import { AudioPlayer } from './audioPlayer';
import * as cron from 'node-cron';

export enum EventType {
    Discord = 'discord',
    Distube = 'distube',
    Audioplayer = 'audioplayer',
}

export interface Events {
    [EventType.Discord]: DiscordEvents;
    [EventType.Distube]: DisTubeEvents;
    [EventType.Audioplayer]: PlayerEvents;
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
    permissions: bigint[];
    data: CommandBuilder;
}

export interface Command extends BaseCommand {
    data: CommandBuilder;
    cb: CommandCallback;
}

export interface Cronjob {
    schedule: string;
    cb: CronCallback;
}

export type CronCallback = (app: App, cron: Cronjob) => Awaitable<void>;

interface AppOptions {
    client: Client;
    audioPlayer: AudioPlayer;
    commands: Command[];
    events: Event<any, any>[];
    cronjobs: Cronjob[];
}

export class App {
    public readonly client: Client;
    public readonly audioPlayer: AudioPlayer;
    public readonly commands: Command[];
    public readonly events: Event<any, any>[];
    public readonly cronjobs: Cronjob[];

    constructor(options: AppOptions) {
        this.client = options.client;
        this.audioPlayer = options.audioPlayer;
        this.commands = options.commands;
        this.events = options.events;
        this.cronjobs = options.cronjobs;
    }

    public init() {
        this.registerEvents();
        this.registerCronjobs();
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
                case EventType.Audioplayer:
                    this.audioPlayer.emitter.on(name, (...args) => cb(this, ...args));
                    break;
            }
        }
    }

    private registerCronjobs() {
        for (const cronjobs of this.cronjobs) {
            cron.schedule(cronjobs.schedule, () => cronjobs.cb(this, cronjobs));
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

export function createCronjob(cronjob: Cronjob) {
    return cronjob;
}