import { ClientEvents, CommandInteraction, SlashCommandBuilder } from 'discord.js';
import { App, EventMap, EventType } from './app/app';

export type DiscordEvents = ClientEvents;

type EventCallback<
    T extends EventType,
    U extends keyof EventMap[T]
> = (
    app: App,
    ...args: EventMap[T][U]
) => Promise<void>

export type CommandCallback = (
    app: App,
    interaction: CommandInteraction,
) => Promise<void>;

export type CommandBuilder = Omit<SlashCommandBuilder,
    'addSubcommandGroup' |
    'addSubcommand' |
    'addBooleanOption' |
    'addUserOption' |
    'addChannelOption' |
    'addRoleOption' |
    'addAttachmentOption' |
    'addMentionableOption' |
    'addStringOption' |
    'addIntegerOption' |
    'addNumberOption'
>;
