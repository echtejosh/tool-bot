import { App, IDiscordCommand } from '../app/app';
import { CommandInteraction, SlashCommandBuilder } from 'discord.js';
import { CommandOptions, DiscordCommandBuilder } from '../types';

class Echo implements IDiscordCommand {
    public data: DiscordCommandBuilder = new SlashCommandBuilder()
        .setName('echo')
        .setDescription('Repeats a given message in the same channel')
        .addStringOption((option) => option
            .setName('message')
            .setDescription('Provide a message')
            .setRequired(true),
        );

    async callback(app: App, interaction: CommandInteraction) {
        const options = interaction.options as CommandOptions;
        const message: string | null = options.getString('message');

        if (!message) {
            return;
        }

        await interaction.reply(message);
    };
}

export default new Echo();