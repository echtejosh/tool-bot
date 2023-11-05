import DisTube from 'distube';
import { client } from './client';
import { SpotifyPlugin } from '@distube/spotify';

export const distube = new DisTube(client, {
    plugins: [
        new SpotifyPlugin({
            emitEventsAfterFetching: true,
        })
    ]
});