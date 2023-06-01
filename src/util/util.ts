import { IDiscordCommand, IDiscordEvent } from '../app/app';

export function processDiscordCommands(...commands: IDiscordCommand[]) {
    return new Map(commands.map((command) => [command.data.name, command]));
}

export function processDiscordEvents(...events: IDiscordEvent[]) {
    return new Map(events.map((event) => [event.name, event]));
}