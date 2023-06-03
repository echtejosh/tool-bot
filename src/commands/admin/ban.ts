import {
    Guild,
    GuildMember,
    SlashCommandBuilder,
    inlineCode,
    PermissionFlagsBits,
} from 'discord.js';
import { createCommand } from '../../app/app';

export const ban = createCommand({
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('Ban a member from the server')
        .setDefaultMemberPermissions(
            PermissionFlagsBits.Administrator |
            PermissionFlagsBits.ManageMessages |
            PermissionFlagsBits.BanMembers,
        )
        .addUserOption((option) => option
                .setName('user')
                .setDescription('Provide a user')
                .setRequired(true),
        ),

    cb: async (app, interaction) => {
        const member = interaction.options.getMember('user') as GuildMember;

        const response = await member.ban()
            .then(() => true)
            .catch(() => false);

        if (!response) {
            await interaction.reply({
                content: 'This member cannot be banned',
                ephemeral: true,
            });

            return;
        }

        await interaction.reply(`${inlineCode(member.user.username)} has been banned!`);
    },
});