import {
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
            PermissionFlagsBits.KickMembers
        )
        .addUserOption(
            (option) => option
                .setName('user')
                .setDescription('Provide a user')
                .setRequired(true)
        ),


    cb: async (app, interaction) => {

        const member = interaction.options.getUser('user');
        if(!interaction.guild || !member) {
            await interaction.reply({
                content: 'You do not have the necessary permissions to use this command',
                ephemeral: true,
            });
            await interaction.reply('Something went wrong');
            return;
        }
        const guildMember = await interaction.guild.members.fetch(member.id);
        await guildMember.kick();

        await interaction.reply(`\`${member.username}\` has been kicked`);

    }
});