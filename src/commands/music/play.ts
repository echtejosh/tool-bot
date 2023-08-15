import { createCommand } from '../../app/app';
import { SlashCommandBuilder } from 'discord.js';
import { inlineCode } from '../../util';

export const play = createCommand({
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Play a song')
        .addStringOption((option) => option
            .setName('search_term')
            .setDescription('Play any song by providing a search term or a url')
            .setRequired(true),
        ),

    cb: async (app, interaction) => {
        const searchTerm = interaction.options.getString('search_term')!;

        await interaction.reply(`Searching ${inlineCode(searchTerm)}`);
        await app.player.play(interaction, searchTerm);
    },
});