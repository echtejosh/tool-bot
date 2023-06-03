import {
    CommandInteractionOptionResolver, Guild, GuildMember, inlineCode,
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
            PermissionFlagsBits.MuteMembers,
        )
        .addUserOption((option) => option
            .setName('member')
            .setDescription('Provide a member')
            .setRequired(true),
        )
        .addNumberOption((option) => option
            .setName('minutes')
            .setDescription('Provide an amount of time in minutes')
            .setRequired(true)
            .setMinValue(1)
            .setMaxValue(1440),
        ),


    cb: async (app, interaction) => {
        const options = interaction.options as CommandInteractionOptionResolver;
        const guild = interaction.guild;

        if (!guild) {
            return;
        }

        const member = options.getMember('member') as GuildMember;
        const timeout = options.getNumber('minutes');

        if (!timeout) {
            return;
        }

        const response = await member.timeout(timeout * 60 * 1000)
            .then(() => true)
            .catch(() => false);

        if (!response) {
            await interaction.reply({
                content: 'This member cannot be muted',
                ephemeral: true,
            });

            return;
        }

        await interaction.reply(`${inlineCode(member.user.username)} has been muted for ${timeout} minutes`);
    },
});