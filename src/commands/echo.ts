import { App, IDiscordCommand } from '../app/app';
import { CommandInteraction, CommandInteractionOptionResolver, SlashCommandBuilder } from 'discord.js';
import { DiscordCommandBuilder } from '../types';

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
        const options = interaction.options as CommandInteractionOptionResolver;
        const message = options.getString('message');

        if (!message) {
            return;
        }

        await interaction.reply(message);
    };
}

export default new Echo();