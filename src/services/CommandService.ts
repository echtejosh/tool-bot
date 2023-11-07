import { Command } from '../interfaces/command';
import { Client } from 'discord.js';

export interface CommandServiceOptions {
    commands: Command[];
}

export class CommandService {
    public readonly commands: Command[];

    constructor(options: CommandServiceOptions) {
        this.commands = options.commands;
    }

    public deployCommands(client: Client) {
        console.log('Commands are deployed')

        client.application?.commands.set(this.commands.map((command) => command.data));
    }
}