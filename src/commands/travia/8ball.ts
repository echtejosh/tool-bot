import { GuildMember, SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';
import { createCommand } from '../../app/app';

export const eightball = createCommand({
    permissions: [],

    data: new SlashCommandBuilder()
        .setName('8ball')
        .setDescription('')
        .addStringOption((option) => option
            .setName('question')
            .setDescription('Provide a question')
            .setRequired(true),
        ),

    cb: async (app, interaction) => {
        const answers = [];
        const index = Math.floor(Math.random() * answers.length);
        await interaction.reply(answers[index]);
    },
});