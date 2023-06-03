import {
    CommandInteractionOptionResolver,
    PermissionFlagsBits,
    SlashCommandBuilder,
} from 'discord.js';
import { createCommand } from '../../app/app';

export const mute = createCommand({
    data: new SlashCommandBuilder()
        .setName('mute')
        .setDescription('Mute a member in the server')
        .setDefaultMemberPermissions(
            PermissionFlagsBits.Administrator |
            PermissionFlagsBits.ManageMessages |
            PermissionFlagsBits.MuteMembers
        )
        .addUserOption(
            (option) => option
                .setName('user')
                .setDescription('Provide a user')
                .setRequired(true)
        )
        .addNumberOption((option) => option
            .setName('time')
            .setDescription('Provide an amount of time in minutes')
            .setRequired(true)
            .setMinValue(1)
            .setMaxValue(1440)
        ),


    cb: async (app, interaction) => {

        const member = interaction.options.getUser('user');
        const options = interaction.options as CommandInteractionOptionResolver;
        if(!interaction.guild || !member) {
            await interaction.reply({
                content: 'You do not have the necessary permissions to use this command',
                ephemeral: true,
            });
            await interaction.reply('Something went wrong');
            return;
        }
        const timeAmount = options.getNumber('time')!;
        const guildMember = await interaction.guild.members.fetch(member.id);
        await guildMember.timeout(timeAmount, 'Muted');

        await interaction.reply(`\`${member.username}\` has been muted for ${timeAmount} minutes`);

    }
});