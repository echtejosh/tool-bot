import { SlashCommandBuilder, PermissionsBitField } from 'discord.js';
import { inlineCode } from '../../util';
import { createCommand } from '../../app/app';

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

    cb: async (app, interaction) => {
        const amount = interaction.options.getNumber('amount');

        if (
            !amount ||
            !interaction.channel ||
            !interaction.inGuild()
        ) {
            return;
        }

        const { size } = await interaction.channel.bulkDelete(amount);

        await interaction.reply(`${inlineCode(size)} messages removed`);
    },
});