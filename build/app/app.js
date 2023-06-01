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
exports.App = void 0;
class App {
    constructor(client, commands, events) {
        this.client = client;
        this.commands = commands;
        this.events = events;
    }
    init() {
        this.registerDiscordEvents();
    }
    login(token) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.client.login(token);
        });
    }
    registerDiscordEvents() {
        for (const event of this.events.values()) {
            this.client.on(event.name, (...args) => event.callback(this, ...args));
        }
    }
    deployDiscordCommands() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const slashCommands = Array.from(this.commands.values(), (command) => command.data);
            yield ((_a = this.client.application) === null || _a === void 0 ? void 0 : _a.commands.set(slashCommands));
        });
    }
}
exports.App = App;
