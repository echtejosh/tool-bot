import { createCommand } from '../../app/app';
import { Guild, GuildMember, SlashCommandBuilder } from 'discord.js';

export const shuffle = createCommand({
    data: new SlashCommandBuilder()
        .setName('shuffle')
        .setDescription('Reorders the position of songs within the queue randomly'),

    cb: async (app, interaction) => {
        const guild = interaction.guild as Guild;
        const queue = app.audioPlayer.distube.getQueue(guild);
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
            !voiceChannel.members.has(app.client.user!.id) &&
            app.client.voice.adapters.get(guild.id)
        ) {
            await interaction.reply({
                content: 'Unable to use this command without being in the same voice channel as me',
                ephemeral: true,
            });

            return;
        }

        await queue.shuffle();

        await interaction.reply('Queue has been randomized');
    },
});