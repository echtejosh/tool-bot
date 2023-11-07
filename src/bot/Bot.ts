import { Client } from 'discord.js';
import { CommandService } from '../services/CommandService';
import { AppService } from '../services/AppService';
import { MusicService } from '../services/MusicService';

export interface Services {
    command: CommandService;
    app: AppService;
    music: MusicService;
}

export interface BotOptions {
    client: Client;
    services: Services;
}

export class Bot {
    public readonly client: Client;
    public readonly services: Services;

    constructor(options: BotOptions) {
        this.client = options.client;
        this.services = options.services;
    }

    public init() {
        this.services.app.setupEventListeners(this);
        this.services.music.setupEventListeners(this);
    }

    public async login(token: string) {
        try {
            await this.client.login(token);

            console.log('Established a connection to Discord');
        } catch (err) {
            throw new Error('Failed to establish a connection to Discord');
        }
    }
}