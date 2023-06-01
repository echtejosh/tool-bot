"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const app_1 = require("./app/app");
const discord_js_1 = require("discord.js");
const util_1 = require("./util/util");
// commands
const echo_1 = __importDefault(require("./commands/echo"));
// events
const ready_1 = __importDefault(require("./events/ready"));
const interactionCreate_1 = __importDefault(require("./events/interactionCreate"));
const client = new discord_js_1.Client({
    intents: [
        discord_js_1.GatewayIntentBits.Guilds,
        discord_js_1.GatewayIntentBits.MessageContent,
        discord_js_1.GatewayIntentBits.GuildMessages,
        discord_js_1.GatewayIntentBits.GuildMembers,
    ],
});
const commands = (0, util_1.processDiscordCommands)(echo_1.default);
const events = (0, util_1.processDiscordEvents)(ready_1.default, interactionCreate_1.default);
const app = new app_1.App(client, commands, events);
app.login(process.env.SECRET_TOKEN)
    .then(() => console.log('Logged in'))
    .catch(() => console.error('Invalid token'));
app.init();
