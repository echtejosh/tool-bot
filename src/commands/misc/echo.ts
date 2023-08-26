import { GuildMember, SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';
import { createCommand } from '../../app/app';

export const echo = createCommand({
    data: new SlashCommandBuilder()
        .setName('echo')
        .setDescription('Repeats a given message')
        .addStringOption((option) => option
            .setName('message')
            .setDescription('Provide a message')
            .setRequired(true),
        )
        .addBooleanOption((option) => option
            .setName('hidden')
            .setDescription('Set reply to be anonymous'),
        ),

    cb: async (app, interaction) => {
        const member = interaction.member as GuildMember;
        const messageOption = interaction.options.getString('message');

        if (
            !messageOption ||
            !interaction.channel
        ) {
            return;
        }

        const hiddenOption = interaction.options.getBoolean('hidden');

        if (hiddenOption) {
            if (!member.permissions.has(PermissionFlagsBits.Administrator)) {
                await interaction.reply({
                    content: 'You do not have the necessary permissions to use this command',
                    ephemeral: true,
                });

                return;
            }

            await interaction.deferReply();
            await interaction.deleteReply();

            await interaction.channel.send(messageOption);
        }

        await interaction.reply(messageOption);
    },
});