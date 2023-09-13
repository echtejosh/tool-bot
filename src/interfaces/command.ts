import { SlashCommandBuilder as DiscordSlashCommandBuilder } from 'discord.js';
import { CommandCallback } from '../types/command';

export type SlashCommandBuilder = Omit<DiscordSlashCommandBuilder,
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

export interface BaseCommand {
    data: SlashCommandBuilder;
}

export interface Command extends BaseCommand {
    data: SlashCommandBuilder;
    callback: CommandCallback;
}