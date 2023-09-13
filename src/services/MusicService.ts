import {
    Client,
    CommandInteraction,
    Guild,
    GuildMember,
    TextChannel,
    VoiceBasedChannel,
    VoiceChannel,
} from 'discord.js';
import { EventCategory } from '../enums/event';
import { Event } from '../interfaces/event';
import DisTube from 'distube';
import { Bot } from '../bot/Bot';

export interface MusicServiceEvents {
    error: [CommandInteraction, Error];
}

export interface MusicServiceOptions {
    client: Client;
    distube: DisTube;
    events: Event<EventCategory.Distube, any>[];
}

export interface PlayOptions {
    voiceChannel: VoiceBasedChannel;
    textChannel: TextChannel;
    member: GuildMember;
    skip?: boolean;
}

export class MusicService {
    private readonly client: Client;
    private readonly distube: DisTube;
    private readonly events: Event<EventCategory.Distube, any>[];

    constructor(options: MusicServiceOptions) {
        this.client = options.client;
        this.distube = options.distube;
        this.events = options.events;
    }

    public setupEventListeners(bot: Bot) {
        for (const { name, callback } of this.events) {
            bot.client.on(name, (...args) => callback(bot, ...args));
        }
    }

    public getQueue(guild: Guild) {
        return this.distube.getQueue(guild.id);
    }

    public async play(interaction: CommandInteraction, searchTerm: string, options: PlayOptions) {
        const { skip, member, voiceChannel, textChannel } = options;

        try {
            await this.distube.play(voiceChannel, searchTerm, {
                textChannel,
                member,
                skip,
            });

            return true;
        } catch (err) {
            return false;
        }
    }
}