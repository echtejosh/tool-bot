import { createCommand } from '../../utils/command';
import { Guild, GuildMember, inlineCode, SlashCommandBuilder, TextChannel } from 'discord.js';

export const play = createCommand({
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Play a song')
        .addStringOption((option) => option
            .setName('search_term')
            .setDescription('Play any song by providing a search term or a url')
            .setRequired(true),
        ),

    callback: async (bot, interaction) => {
        const searchTermOption = interaction.options.getString('search_term')!;
        const guild = interaction.guild as Guild;
        const member = interaction.member as GuildMember;
        const textChannel = interaction.channel as TextChannel;
        const voiceChannel = member.voice.channel;

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

        await interaction.reply(`Searching ${inlineCode(searchTermOption)}`);

        const request = await bot.services.music.play(searchTermOption, {
            textChannel,
            voiceChannel,
            member,
        });

        if (!request) {
            await interaction.reply({
                content: 'The URL is private or unavailable',
                ephemeral: true,
            });
        }
    },
});