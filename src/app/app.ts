import { Client, ClientEvents } from 'discord.js';
import { DiscordCommandBuilder, DiscordCommandCallback, DiscordEventCallback } from '../types';

export interface IDiscordCommand {
    data: DiscordCommandBuilder;
    callback: DiscordCommandCallback;
}

export interface IDiscordEvent {
    name: keyof ClientEvents;
    callback: DiscordEventCallback;
}

export class App {
    public readonly client: Client;
    public readonly commands: Map<string, IDiscordCommand>;
    public readonly events: Map<string, IDiscordEvent>;

    constructor(
        client: Client,
        commands: Map<string, IDiscordCommand>,
        events: Map<string, IDiscordEvent>,
    ) {
        this.client = client;
        this.commands = commands;
        this.events = events;
    }

    public init() {
        this.registerDiscordEvents();
    }

    public async login(token: string) {
        return await this.client.login(token);
    }

    public registerDiscordEvents() {
        for (const event of this.events.values()) {
            this.client.on(event.name, (...args) => event.callback(this, ...args));
        }
    }

    public async deployDiscordCommands() {
        const slashCommands = Array.from(this.commands.values(), (command) => command.data);
        await this.client.application?.commands.set(slashCommands);
    }
}