import { Command } from '../interfaces/command';
import { Client } from 'discord.js';
import { Service } from './Service';

export interface CommandServiceOptions {
    commands: Command[];
}

export class CommandService implements Service {
    public readonly commands: Command[];

    constructor(options: CommandServiceOptions) {
        this.commands = options.commands;
    }

    public deployCommands(client: Client) {
        client.application?.commands.set(this.commands.map((command) => command.data));
    }
}