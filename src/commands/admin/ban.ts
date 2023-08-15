import {
    GuildMember,
    SlashCommandBuilder,
} from 'discord.js';
import { inlineCode } from '../../util';
import { createCommand } from '../../app/app';

export const ban = createCommand({
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('Ban a member from the server')
        .addUserOption((option) => option
            .setName('user')
            .setDescription('Provide a user')
            .setRequired(true),
        ),

    cb: async (app, interaction) => {
        const member = interaction.options.getMember('user') as GuildMember;

        if (!member.bannable) {
            await interaction.reply({
                content: 'This member cannot be banned',
                ephemeral: true,
            });

            return;
        }

        await member.ban();

        await interaction.reply(`${inlineCode(member.user.username)} has been banned!`);
    },
});