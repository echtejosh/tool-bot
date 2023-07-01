import { createCommand } from '../../app/app';
import { SlashCommandBuilder } from 'discord.js';

export const play = createCommand({
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Play audio in the voice channel the user is currently in')
        .addStringOption((option) => option
            .setName('search_term')
            .setDescription('Play any audio or video content by providing a search term or a url')
            .setRequired(true),
        ),

    cb: async (app, interaction) => {
        const query = interaction.options.getString('search_term')!;

        await interaction.reply(`Searching \`${query}\``);
        await app.player.play(interaction, query);
    },
});