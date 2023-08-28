import { createCommand } from '../../app/app';
import { Guild, GuildMember, SlashCommandBuilder } from 'discord.js';
import { inlineCode } from '../../util';

export const play = createCommand({
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Play a song')
        .addStringOption((option) => option
            .setName('search_term')
            .setDescription('Play any song by providing a search term or a url')
            .setRequired(true),
        )
        .addBooleanOption((option) => option
            .setName('skip')
            .setDescription('Skip to this song')
            .setRequired(true),
        ),

    cb: async (app, interaction) => {
        const searchTermOption = interaction.options.getString('search_term')!;
        const skipOption = interaction.options.getBoolean('skip')!;

        const guild = interaction.guild as Guild;
        const member = interaction.member as GuildMember;
        const voiceChannel = member.voice.channel;

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

        await interaction.reply(`Searching ${inlineCode(searchTermOption)}`);

        await app.player.play(interaction, searchTermOption, skipOption);
    },
});