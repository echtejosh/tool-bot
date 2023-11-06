import mongoose from 'mongoose';

export class DatabaseService {

    public isConnected() {
        return mongoose.connection.readyState === 1;
    }

    public async connect(uri: string) {
        try {
            await mongoose.connect(uri);

            console.log('Established a connection to MongoDB');
        } catch (err) {
            console.error('Failed to establish a connection to MongoDB');
        }
    }
}