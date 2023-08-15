import * as discord from 'discord.js';

export function delay(ms: number): Promise<any> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export function bold(context: string | number): string {
    return discord.bold(context.toString());
}

export function inlineCode(context: string | number): string {
    return discord.inlineCode(context.toString());
}