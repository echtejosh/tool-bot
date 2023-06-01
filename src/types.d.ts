import { App } from './app/app';
import { Awaitable, CommandInteraction, SlashCommandBuilder } from 'discord.js';

export type DiscordEventCallback = (
    app: App,
    ...args?: any
) => Awaitable<void>

export type DiscordCommandCallback = (
    app: App,
    interaction: CommandInteraction,
) => Awaitable<void>

export type DiscordCommandBuilder = Omit<SlashCommandBuilder,
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
>