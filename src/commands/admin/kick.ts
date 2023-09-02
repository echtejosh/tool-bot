import { GuildMember, inlineCode, PermissionsBitField, SlashCommandBuilder } from 'discord.js';
import { createCommand } from '../../utils/command';

export const kick = createCommand({
    data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('Kick a member from the server')
        .setDefaultMemberPermissions(
            PermissionsBitField.Flags.ManageMessages |
            PermissionsBitField.Flags.KickMembers,
        )
        .addUserOption((option) => option
            .setName('user')
            .setDescription('Provide a user')
            .setRequired(true),
        ),

    callback: async (bot, interaction) => {
        const memberOption = interaction.options.getMember('user') as GuildMember;

        if (!memberOption.kickable) {
            await interaction.reply({
                content: 'This member cannot be kicked',
                ephemeral: true,
            });

            return;
        }

        await memberOption.kick();

        await interaction.reply(`${inlineCode(memberOption.user.username)} has been kicked`);
    },
});