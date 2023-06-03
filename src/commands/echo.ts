import { SlashCommandBuilder } from 'discord.js';
import { createCommand } from '../app/app';

export const ping = createCommand({
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Ping pong'),

    cb: async (app, interaction) => {
        await interaction.reply('Pong');
    },
});