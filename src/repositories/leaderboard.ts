import LeaderboardModel from '../models/leaderboard';
import { Leaderboard } from '../types';

export async function getLeaderboard(guildId: string) {
    const _entries = await LeaderboardModel
        .find({ guildId })
        .sort({ points: -1 })
        .limit(10)
        .exec();

    const entries = _entries.map((entry) => {
        return {
            userId: entry.userId,
            points: entry.points,
        };
    });

    return { guildId, entries } as Leaderboard;
}

export async function updateLeaderboard(leaderboard: Leaderboard) {
    const { guildId, entries } = leaderboard;

    for (const { userId, points, isMember } of entries) {
        LeaderboardModel.updateOne(
            { guildId, userId },
            { points, isMember },
        );
    }
}
