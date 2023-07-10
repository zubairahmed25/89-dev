import mongoose from 'mongoose';
import CommonFields from './common/CommonFields';

const postSchema = new mongoose.Schema({
  content: { type: String, required: true },
  media: String,
  scheduledTime: Date,
  platform: { type: String, required: true },
  userId: { type: mongoose.Types.ObjectId, required: true },
  status: {
    type: String,
    enum: ['pending_approval', 'scheduled', 'published', 'change_requested'],
    default: 'pending_approval',
  },
  ...CommonFields,
});

module.exports = mongoose.models?.Post || mongoose.model('Post', postSchema);
