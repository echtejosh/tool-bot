import mongoose from 'mongoose';

const VoiceChannelEntryScheme = new mongoose.Schema({
    guildId: { type: String, required: true, unique: true },
    channelId: { type: String },
    isEnabled: { type: Boolean, default: false },
});

const VoiceChannelEntryModel = mongoose.model('Voice', VoiceChannelEntryScheme);

export default VoiceChannelEntryModel;