import { GuildMember, inlineCode, PermissionsBitField, SlashCommandBuilder } from 'discord.js';
import { createCommand } from '../../utils/command';

export const ban = createCommand({
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('Ban a member from the server')
        .setDefaultMemberPermissions(
            PermissionsBitField.Flags.KickMembers |
            PermissionsBitField.Flags.BanMembers,
        )
        .addUserOption((option) => option
            .setName('user')
            .setDescription('Provide a user')
            .setRequired(true),
        ),

    callback: async (app, interaction) => {
        const memberOption = interaction.options.getMember('user') as GuildMember;

        if (!memberOption.bannable) {
            await interaction.reply({
                content: 'This member cannot be banned',
                ephemeral: true,
            });

            return;
        }

        await memberOption.ban();

        await interaction.reply(`${inlineCode(memberOption.user.username)} has been banned!`);
    },
});