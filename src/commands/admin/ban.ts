import {
    PermissionFlagsBits,
    SlashCommandBuilder,
} from 'discord.js';
import { createCommand } from '../../app/app';

export const ban = createCommand({
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('Ban a member from the server')
        .setDefaultMemberPermissions(
            PermissionFlagsBits.Administrator |
            PermissionFlagsBits.ManageMessages |
            PermissionFlagsBits.BanMembers
        )
        .addUserOption(
            (option) => option
                .setName('user')
                .setDescription('Provide a user')
                .setRequired(true)
        ),


    cb: async (app, interaction) => {

        const member = interaction.options.getUser('user');
        const user = interaction.options.getMember('user');

        if(!interaction.guild || !member) {
            await interaction.reply({
                content: 'You do not have the necessary permissions to use this command',
                ephemeral: true,
            });
            await interaction.reply('Something went wrong');
            return;
        }
        const guildMember = await interaction.guild.members.fetch(member.id);
        await guildMember.ban();

        await interaction.reply(`\`${member.username}\` has been banned!`);

    }
});