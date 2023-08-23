import mongoose from 'mongoose';

const VoiceChannelPreferencesSchema = new mongoose.Schema({
    guildId: { type: String, required: true },
    userId: { type: String },
    name: { type: String },
    maxSlots: { type: Number, default: 0 },
});

const VoiceChannelPreferencesModel = mongoose.model('VoicePreferences', VoiceChannelPreferencesSchema);

export default VoiceChannelPreferencesModel;