import mongoose from 'mongoose';
import { Service } from './Service';

export class DatabaseService implements Service {

    public isConnected() {
        return mongoose.connection.readyState === 1;
    }

    public async connect(uri: string) {
        try {
            await mongoose.connect(uri);

            console.log('Established a connection to database');
        } catch (err) {
            console.error('Failed to establish a connection to database');
        }
    }
}