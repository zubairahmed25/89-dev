import mongoose from 'mongoose';
import CommonFields from './common/CommonFields';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  profileImageUrl: String,
  password: { type: String, required: true },
  socialMediaAccounts: [
    {
      platform: { type: String, enum: ['Facebook', 'Twitter', 'Instagram'] },
      accessToken: String,
      refreshToken: String,
      expiresAt: Date,
    },
  ],
  userType: {
    type: String,
    required: true,
    enum: ['Admin', 'Client', 'Super Admin'],
    default: 'Client',
  },
  subscriptions: {
    subscriptionId: mongoose.Types.ObjectId,
    subscriptionType: String,
    validity: String,
  },
  ...CommonFields,
});

module.exports = mongoose.models?.User || mongoose.model('User', userSchema);
