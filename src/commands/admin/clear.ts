import { SlashCommandBuilder, PermissionsBitField, inlineCode } from 'discord.js';
import { createCommand } from '../../utils/command';
import { stringify } from '../../utils/common';

export const clear = createCommand({
    data: new SlashCommandBuilder()
        .setName('clear')
        .setDescription('Clear a specified amount of messages')
        .setDefaultMemberPermissions(
            PermissionsBitField.Flags.KickMembers |
            PermissionsBitField.Flags.BanMembers,
        )
        .addNumberOption((option) => option
            .setName('amount')
            .setDescription('Provide an amount')
            .setRequired(true)
            .setMinValue(1)
            .setMaxValue(100),
        ),

    callback: async (bot, interaction) => {
        const amountOption = interaction.options.getNumber('amount');

        if (
            !amountOption ||
            !interaction.channel ||
            !interaction.inGuild()
        ) {
            return;
        }

        const { size } = await interaction.channel.bulkDelete(amountOption);

        await interaction.reply(`${inlineCode(stringify(size))} messages removed`);
    },
});