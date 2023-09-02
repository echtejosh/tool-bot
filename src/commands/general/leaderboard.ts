import { EmbedBuilder, Guild, GuildMember, PermissionsBitField, SlashCommandBuilder } from 'discord.js';
import { createCommand } from '../../utils/command';
import LeaderboardModel from '../../models/leaderboard';

export const leaderboard = createCommand({
    data: new SlashCommandBuilder()
        .setName('leaderboard')
        .setDescription('Shows a leaderboard of active users in this server')
        .addSubcommand((option) => option
            .setName('remove')
            .setDescription('Removes a user from the leaderboard')
            .addUserOption((option) => option
                .setName('member')
                .setDescription('Provide a user')
                .setRequired(true),
            ),
        )
        .addSubcommand((option) => option
            .setName('view')
            .setDescription('Shows the leaderboard stats'),
        ),

    callback: async (bot, interaction) => {
        const member = interaction.member as GuildMember;
        const guild = interaction.guild as Guild;

        switch (interaction.options.getSubcommand()) {
            case 'remove':
                if (!member.permissions.has(PermissionsBitField.Flags.Administrator)) {
                    await interaction.reply({
                        content: 'Sorry, you have insufficient permissions to use this command',
                        ephemeral: true,
                    });

                    return;
                }

                const memberOption = interaction.options.getMember('member') as GuildMember;

                await LeaderboardModel.findOneAndDelete({
                    guildId: guild.id,
                    userId: memberOption.id,
                }).exec();

                await interaction.reply('Leaderboard entry has been successfully removed');
                break;
            case 'view':
                const leaderboard = await LeaderboardModel
                    .find({ guildId: guild.id })
                    .sort({ points: -1 })
                    .limit(10)
                    .exec();

                const members = [];
                const points = [];

                for (const entry of leaderboard) {
                    if (!entry.userId) {
                        continue;
                    }

                    const member = await bot.client.users.fetch(entry.userId, {
                        cache: true,
                    });

                    if (
                        member &&
                        entry.points > 0
                    ) {
                        members.push(member.tag);
                        points.push(entry.points);
                    }
                }

                const membersList = members
                    .map((username, i) => `${i + 1} - ${username}`)
                    .join('\n\n');

                const pointsList = points.join('\n\n');

                const embed = new EmbedBuilder()
                    .setTitle('Leaderboard')
                    .setDescription('The list of the most active members of this server')
                    .setTimestamp()
                    .setFields([
                        {
                            name: 'Members',
                            value: membersList || '-',
                            inline: true,
                        },
                        {
                            name: 'Points',
                            value: pointsList || '-',
                            inline: true,
                        },
                    ]);

                await interaction.reply({ embeds: [embed] });
                break;
        }
    },
});