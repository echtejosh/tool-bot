import { GuildMember, SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';
import { createCommand } from '../../utils/command';

export const echo = createCommand({
    data: new SlashCommandBuilder()
        .setName('echo')
        .setDescription('Repeats a given message')
        .addStringOption((option) => option
            .setName('message')
            .setDescription('Provide a message')
            .setRequired(true),
        )
        .addStringOption((option) => option
            .setName('reply_to')
            .setDescription('Set reply to someone (type in "none" to not reply)'),
        ),

    callback: async (bot, interaction) => {
        const member = interaction.member as GuildMember;
        const messageOption = interaction.options.getString('message');
        const replyToOption = interaction.options.getString('reply_to');

        if (
            !messageOption ||
            !interaction.channel
        ) {
            return;
        }

        if (replyToOption) {
            if (!member.permissions.has(PermissionFlagsBits.Administrator)) {
                await interaction.reply({
                    content: 'You do not have the necessary permissions to use this command',
                    ephemeral: true,
                });

                return;
            }

            if (replyToOption == 'none') {
                await interaction.deferReply();
                await interaction.deleteReply();

                await interaction.channel.send(messageOption);
            } else {
                const message = await interaction.channel.messages.fetch(replyToOption);

                message.reply(messageOption);
            }
        }

        await interaction.reply(messageOption);
    },
});