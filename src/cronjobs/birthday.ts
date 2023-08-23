import { createCronjob } from '../app/app';

export const birthday = createCronjob({
    schedule: '0 0 * * *',

    cb: async (app) => {

    },
});