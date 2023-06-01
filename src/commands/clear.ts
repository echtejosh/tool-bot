import { App, IDiscordCommand } from '../app/app';
import { CommandInteraction, SlashCommandBuilder, PermissionFlagsBits, TextChannel, SlashCommandNumberOption } from 'discord.js';
import { CommandOptions, DiscordCommandBuilder } from '../types';

class Clear implements IDiscordCommand {
    public data: DiscordCommandBuilder = new SlashCommandBuilder()
        .setName('clear')
        .setDescription('Clears a specified amount of messages in the current text channel')
        .setDefaultMemberPermissions(
            PermissionFlagsBits.Administrator |
            PermissionFlagsBits.ManageMessages
        )
        .addNumberOption((option: SlashCommandNumberOption) => option
            .setName('amount')
            .setDescription('Provide an amount')
            .setRequired(true)
            .setMinValue(1)
            .setMaxValue(100)
        );

    async callback(app: App, interaction: CommandInteraction): Promise<void> {
        const options: CommandOptions = interaction.options as CommandOptions;
        const textChannel: TextChannel = interaction.channel as TextChannel;
        const amount: number = options.getNumber('amount')!;

        await textChannel.bulkDelete(amount, true);

        await interaction.reply(`\`${amount}\` messages removed`);
    };
}

export default new Clear();