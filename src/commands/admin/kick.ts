import {
    CommandInteractionOptionResolver, Guild, GuildMember, GuildTextBasedChannel, inlineCode,
    PermissionFlagsBits,
    SlashCommandBuilder,
} from 'discord.js';
import { createCommand } from '../../app/app';

export const kick = createCommand({
    data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('Kick a member from the server')
        .setDefaultMemberPermissions(
            PermissionFlagsBits.Administrator |
            PermissionFlagsBits.ManageMessages |
            PermissionFlagsBits.KickMembers,
        )
        .addUserOption((option) => option
            .setName('user')
            .setDescription('Provide a user')
            .setRequired(true),
        ),


    cb: async (app, interaction) => {
        const member =  interaction.options.getMember('user') as GuildMember;

        const response = await member.kick()
            .then(() => true)
            .catch(() => false);

        if (!response) {
            await interaction.reply({
                content: 'This member cannot be kicked',
                ephemeral: true,
            });

            return;
        }

        await interaction.reply(`${inlineCode(member.user.username)} has been kicked`);

    },
});