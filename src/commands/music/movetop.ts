import { createCommand } from '../../app/app';
import { Guild, GuildMember, SlashCommandBuilder } from 'discord.js';

export const movetop = createCommand({
    data: new SlashCommandBuilder()
        .setName('movetop')
        .setDescription('Move a song to the first position inside the queue')
        .addNumberOption((option) => option
            .setName('position')
            .setDescription('Reference a position of a song inside of the queue')
            .setRequired(true),
        ),

    cb: async (app, interaction) => {
        const guild = interaction.guild as Guild;
        const queue = app.audioPlayer.distube.getQueue(guild);
        const member = interaction.member as GuildMember;
        const voiceChannel = member.voice.channel;
        const position = interaction.options.getNumber('position')!;

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

        const songs = queue.songs;
        const song = songs[position];

        if (!song) {
            await interaction.reply({
                content: 'There was no song in the queue with the provided position, try again',
                ephemeral: true,
            });

            return;
        }

        songs.splice(position, 1);
        songs.splice(1, 0, song);

        await interaction.reply(`Moved song to the top`);
    },
});