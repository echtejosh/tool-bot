import mongoose from 'mongoose';

const VoiceChannelSchema = new mongoose.Schema({
    guildId: { type: String, required: true },
    channelId: { type: String, required: true },
    ownerId: { type: String, required: true },
});

const VoiceChannelModel = mongoose.model('VoiceChannel', VoiceChannelSchema);

export default VoiceChannelModel;