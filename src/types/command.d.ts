import { ChatInputCommandInteraction } from 'discord.js';
import { Bot } from '../bot/Bot';

export type CommandCallback = (
    bot: Bot,
    interaction: ChatInputCommandInteraction,
) => Promise<void>;