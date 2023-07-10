import mongoose from 'mongoose';
import CommonFields from './common/CommonFields';

const planSchema = new mongoose.Schema({
  planName: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  ...CommonFields,
});

module.exports = mongoose.models?.Plan || mongoose.model('Plan', planSchema);
