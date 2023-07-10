import mongoose from 'mongoose';
import CommonFields from './common/CommonFields';

const subscriptionHistorySchema = new mongoose.Schema({
  userId: { type: mongoose.Types.ObjectId, required: true },
  oldSubscriptions: [
    {
      // SubscriptionScheme (skip userId or other unnecessary fields)
      planId: { type: mongoose.Types.ObjectId, required: true },
      purchaseDate: { type: Date, default: Date.now },
      expirydate: Date,
      subscriptionAmount: { type: String, required: true },
      amount: { type: String, required: true },
      subscriptionType: { type: String, required: true },
      discount: {
        amount: { type: Number, default: 0 },
        coupon: {
          couponCode: String,
          couponAmount: { type: Number, default: 0 },
          couponPercentage: { type: Number, default: 0 },
        },
      },
      coupon: {
        couponCode: String,
        couponAmount: { type: Number, default: 0 },
        couponPercentage: { type: Number, default: 0 },
      },
      status: {
        type: String,
        enum: ['active', 'canceled', 'expired'],
        default: 'active',
      },
      ...CommonFields,
    },
  ],
  ...CommonFields,
});

module.exports =
  mongoose.models?.SubscriptionHistory ||
  mongoose.model('SubscriptionHistory', subscriptionHistorySchema);
