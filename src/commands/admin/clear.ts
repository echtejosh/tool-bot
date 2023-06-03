import {
    CommandInteractionOptionResolver,
    PermissionFlagsBits,
    SlashCommandBuilder,
    TextChannel,
} from 'discord.js';
import { createCommand } from '../../app/app';

export const clear = createCommand({
    data: new SlashCommandBuilder()
        .setName('clear')
        .setDescription('Clears a specified amount of messages in the current text channel')
        .setDefaultMemberPermissions(
            PermissionFlagsBits.Administrator |
            PermissionFlagsBits.ManageMessages
        )
        .addNumberOption((option) => option
            .setName('amount')
            .setDescription('Provide an amount')
            .setRequired(true)
            .setMinValue(1)
            .setMaxValue(100)
        ),

    cb: async (app, interaction) => {
        const options = interaction.options as CommandInteractionOptionResolver;
        const textChannel = interaction.channel as TextChannel;
        const amount = options.getNumber('amount')!;

        const  removedMessages = await textChannel.bulkDelete(amount, true);
        await interaction.reply(`\`${removedMessages.size}\` messages removed`);
    },
});