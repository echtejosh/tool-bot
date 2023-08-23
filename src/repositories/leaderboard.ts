import LeaderboardModel from '../models/leaderboard';
import { Leaderboard } from '../types';

export async function get(guildId: string) {
    const entries = await LeaderboardModel
        .find({ guildId })
        .sort({ points: -1 })
        .limit(10)
        .exec();

    return { guildId, entries } as Leaderboard;
}