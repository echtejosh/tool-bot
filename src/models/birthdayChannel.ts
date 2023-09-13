import mongoose from 'mongoose';

const BirthdayChannelSchema = new mongoose.Schema({
    guildId: { type: String, required: true, unique: true },
    channelId: { type: String },
    isEnabled: { type: Boolean, default: false },
});

const BirthdayChannelModel = mongoose.model('BirthdayChannel', BirthdayChannelSchema);

export default BirthdayChannelModel;