import { Client, CommandInteraction, GuildMember, TextChannel, VoiceChannel } from 'discord.js';
import { DisTube } from 'distube';
import { App, Event, EventType } from './app';
import { EventEmitter } from 'events';

export interface PlayerOptions {
    client: Client;
    distube: DisTube;
}

export class Player {
    public readonly client: Client;
    public readonly distube: DisTube;
    public readonly emitter: EventEmitter;

    constructor(options: PlayerOptions) {
        this.client = options.client;
        this.distube = options.distube;
        this.emitter = new EventEmitter();
    }

    public registerEvents(app: App) {
        for (const { type, name, cb } of app.events) {
            if (type === EventType.Distube) {
                this.distube.on(name, (...args: any[]) => cb(app, ...args));
            }

            if (type === EventType.Player) {
                this.emitter.on(name, (...args) => cb(app, ...args));
            }
        }
    }

    public async play(
        interaction: CommandInteraction,
        searchTerm: string,
    ) {
        const member = interaction.member as GuildMember;
        const textChannel = interaction.channel as TextChannel;
        const voiceChannel = member.voice.channel as VoiceChannel;

        try {
            await this.distube.play(voiceChannel, searchTerm, {
                textChannel,
                member,
            });
        } catch (err) {
            this.emitter.emit('error', interaction, err);
        }
    }
}