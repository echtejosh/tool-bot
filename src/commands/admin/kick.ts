import { GuildMember, PermissionsBitField, SlashCommandBuilder } from 'discord.js';
import { inlineCode } from '../../util';
import { createCommand } from '../../app/app';

export const kick = createCommand({
    permissions: [
        PermissionsBitField.Flags.ManageMessages,
        PermissionsBitField.Flags.KickMembers,
    ],

    data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('Kick a member from the server')
        .addUserOption((option) => option
            .setName('user')
            .setDescription('Provide a user')
            .setRequired(true),
        ),

    cb: async (app, interaction) => {
        const member = interaction.options.getMember('user') as GuildMember;

        if (!member.kickable) {
            await interaction.reply({
                content: 'This member cannot be kicked',
                ephemeral: true,
            });

            return;
        }

        await member.kick();

        await interaction.reply(`${inlineCode(member.user.username)} has been kicked`);
    },
});