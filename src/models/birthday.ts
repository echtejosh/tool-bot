import mongoose from 'mongoose';

const BirthdaySchema = new mongoose.Schema({
    guildId: { type: String, required: true },
    userId: { type: String, required: true },
    date: { type: Date },
    isEnabled: { type: Boolean, default: false },
});

const BirthdayModel = mongoose.model('Birthday', BirthdaySchema);

export default BirthdayModel;