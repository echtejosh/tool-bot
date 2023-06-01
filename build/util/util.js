"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processDiscordEvents = exports.processDiscordCommands = void 0;
function processDiscordCommands(...commands) {
    return new Map(commands.map((command) => [command.data.name, command]));
}
exports.processDiscordCommands = processDiscordCommands;
function processDiscordEvents(...events) {
    return new Map(events.map((event) => [event.name, event]));
}
exports.processDiscordEvents = processDiscordEvents;
