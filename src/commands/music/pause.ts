import { createCommand } from '../../utils/command';
import { Guild, GuildMember, SlashCommandBuilder } from 'discord.js';

export const pause = createCommand({
    data: new SlashCommandBuilder()
        .setName('pause')
        .setDescription('Pauses the queue'),

    callback: async (bot, interaction) => {
        const guild = interaction.guild as Guild;
        const queue = bot.musicService.getQueue(guild);
        const member = interaction.member as GuildMember;
        const voiceChannel = member.voice.channel;

        if (!queue) {
            await interaction.reply({
                content: 'No songs are playing right now',
                ephemeral: true,
            });

            return;
        }

        if (!voiceChannel) {
            await interaction.reply({
                content: 'Unable to use this command outside of a voice channel',
                ephemeral: true,
            });

            return;
        }

        if (
            !voiceChannel.members.has(bot.client.user!.id) &&
            bot.client.voice.adapters.get(guild.id)
        ) {
            await interaction.reply({
                content: 'Unable to use this command without being in the same voice channel as me',
                ephemeral: true,
            });

            return;
        }

        if (queue.paused) {
            await interaction.reply({
                content: 'Unable to pause queue as queue is already paused',
                ephemeral: true,
            });

            return;
        }

        queue.pause();

        await interaction.reply('Paused the queue');
    },
});