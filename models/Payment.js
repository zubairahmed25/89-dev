import mongoose from 'mongoose';
import CommonFields from './common/CommonFields';

const paymentSchema = new mongoose.Schema({
  paymentDate: { type: Date, default: Date.now },
  paymentAmount: { type: String, required: true },
  paymentType: { type: String, required: true },
  subscriptionId: { type: mongoose.Types.ObjectId, required: true },
  transactionId: String,
  userId: { type: mongoose.Types.ObjectId, required: true },
  ...CommonFields,
});

module.exports =
  mongoose.models?.Payment || mongoose.model('Payment', paymentSchema);
