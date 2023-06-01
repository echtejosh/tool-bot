"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
class Echo {
    constructor() {
        this.data = new discord_js_1.SlashCommandBuilder()
            .setName('echo')
            .setDescription('Repeats a given message in the same channel')
            .addStringOption((option) => option
            .setName('message')
            .setDescription('Provide a message')
            .setRequired(true));
    }
    callback(app, interaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const options = interaction.options;
            const message = options.getString('message');
            if (!message) {
                return;
            }
            yield interaction.reply(message);
        });
    }
    ;
}
exports.default = new Echo();
