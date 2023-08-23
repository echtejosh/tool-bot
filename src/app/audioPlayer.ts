import { Client, CommandInteraction, GuildMember, TextChannel, VoiceChannel } from 'discord.js';
import { DisTube } from 'distube';
import { EventEmitter } from 'events';

export interface AudioplayerOptions {
    client: Client;
    distube: DisTube;
}

export class AudioPlayer {
    public readonly client: Client;
    public readonly distube: DisTube;
    public readonly emitter: EventEmitter = new EventEmitter();

    constructor(options: AudioplayerOptions) {
        this.client = options.client;
        this.distube = options.distube;
    }

    public async play(interaction: CommandInteraction, query: string) {
        const member = interaction.member as GuildMember;
        const textChannel = interaction.channel as TextChannel;
        const voiceChannel = member.voice.channel as VoiceChannel;

        try {
            await this.distube.play(voiceChannel, query, {
                textChannel,
                member,
            });
        } catch (err) {
            this.emitter.emit('error', interaction, err);
        }
    }
}