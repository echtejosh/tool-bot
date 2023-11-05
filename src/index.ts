import 'dotenv/config';
import { Bot } from './bot/Bot';
import { client } from './client';
import { database, music, command, event } from './services';

database.connect(process.env.MONGO_URI!);

const bot = new Bot({
    client,
    services: {
        music,
        command,
        event
    }
});

bot.login(process.env.APP_TOKEN!);
bot.init();