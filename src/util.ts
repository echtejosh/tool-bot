import * as discord from 'discord.js';

export function delay(ms: number): Promise<any> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export function bold(context: any): string {
    try {
        return discord.bold(context.toString());
    } catch (err) {
        throw new Error('content of context cannot be set parsed to string');
    }
}