import 'dotenv/config';
import { Bot } from './bot/Bot';
import { client } from './client';
import { database, music, command, app } from './services';

database.connect(process.env.MONGO_URI!);

const bot = new Bot({
    client,
    services: {
        music,
        command,
        app
    }
});

bot.login(process.env.APP_TOKEN!);
bot.init();