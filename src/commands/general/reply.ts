import { SlashCommandBuilder, PermissionsBitField } from 'discord.js';
import { createCommand } from '../../utils/command';

export const reply = createCommand({
    data: new SlashCommandBuilder()
        .setName('reply')
        .setDescription('Use the bot to reply to someone')
        .setDefaultMemberPermissions(
            PermissionsBitField.Flags.Administrator
        )
        .addStringOption((option) => option
            .setName('message')
            .setDescription('Provide a message')
            .setRequired(true),
        )
        .addStringOption((option) => option
            .setName('id')
            .setDescription('Set message id to reply to')
            .setRequired(true),
        ),

    callback: async (bot, interaction) => {
        const messageOption = interaction.options.getString('message')!;
        const idOption = interaction.options.getString('id')!;

        if (!interaction.channel) {
            return;
        }

        try {
            const message = await interaction.channel.messages.fetch(idOption);
            await message.reply(messageOption);
        } catch (err) {
            await interaction.reply({
                content: 'No message was found using the provided message id, try again',
                ephemeral: true,
            });
        }
    },
});