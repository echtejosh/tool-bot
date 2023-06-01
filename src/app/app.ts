import { Client } from 'discord.js';

export class Command {

}

export class Event {

}

export class App {
    public readonly client: Client;
    public readonly commands: any;
    public readonly events: any;

    constructor(
        client: Client,
        commands: Map<string, Command>,
        events: Map<string, Event>,
    ) {
        this.client = client;
        this.commands = commands;
        this.events = events;
    }
}