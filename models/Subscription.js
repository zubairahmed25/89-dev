import mongoose from 'mongoose';
import CommonFields from './common/CommonFields';

const subscriptionSchema = new mongoose.Schema({
  userId: { type: mongoose.Types.ObjectId, required: true },
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
});

module.exports =
  mongoose.models?.Subscription ||
  mongoose.model('Subscription', subscriptionSchema);
