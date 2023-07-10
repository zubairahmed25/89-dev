import { Mongo } from '../utils/mongo';

import { ObjectId } from 'mongoose';

import mongoose from 'mongoose';

import User from '../models/User';
import Post from '../models/Post';
import Plan from '../models/Plan';
import Payment from '../models/Payment';
import Subscription from '../models/Subscription';
import SubscriptionHistory from '../models/SubscriptionHistory';

export async function createCollections() {
  try {
    // Create users collection
    await User.createCollection();
    await User.insertMany(generateUserDummyData());

    // Create posts collection
    await Post.createCollection();

    // Create payments collection
    await Payment.createCollection();

    // Create subscriptions collection
    await Subscription.createCollection();

    // Create plans collection
    await Plan.createCollection();

    // Create subscription history collection
    await SubscriptionHistory.createCollection();
    // No initial data for subscription history collection

    console.log('Collections created successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error creating collections:', error);
    process.exit(1);
  }
}

function generateUserDummyData() {
  return [
    {
      _id: new mongoose.Types.ObjectId(),
      username: 'john_doe',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '1234567890',
      profileImageUrl: 'https://example.com/john_doe.jpg',
      password: 'hashedPassword',
      social_media_accounts: [],
      userType: 'Admin',
      subscriptions: {
        subscriptionId: new mongoose.Types.ObjectId(),
        subscriptionType: 'monthly',
        validity: '30 days',
      },
      created_at: new Date(),
      updated_at: new Date(),
    },
    // Add more user documents as needed
  ];
}

function generatePostDummyData() {
  return [
    {
      _id: new mongoose.Types.ObjectId(),
      content: 'Hello, world!',
      media: 'https://example.com/image.jpg',
      scheduled_time: new Date(),
      platform: 'Facebook',
      userId: new mongoose.Types.ObjectId(),
      status: 'pending_approval',
      created_at: new Date(),
      updated_at: new Date(),
    },
    // Add more post documents as needed
  ];
}

function generatePaymentDummyData() {
  return [
    {
      _id: new mongoose.Types.ObjectId(),
      payment_date: new Date(),
      payment_amount: '50',
      payment_type: 'Paypal',
      subscription_id: new mongoose.Types.ObjectId(),
      transactionId: '1234567890',
      userId: new mongoose.Types.ObjectId(),
      created_at: new Date(),
      updated_at: new Date(),
    },
    // Add more payment documents as needed
  ];
}

function generateSubscriptionDummyData() {
  return [
    {
      _id: new mongoose.Types.ObjectId(),
      user_id: new mongoose.Types.ObjectId(),
      plan_id: new mongoose.Types.ObjectId(),
      purchase_date: new Date(),
      expiry_date: new Date(),
      subscriptionAmount: '100',
      amount: '100',
      subscription_type: 'monthly',
      discount: {
        amount: 0,
        coupon: {
          couponCode: '',
          couponAmount: 0,
          couponPercentage: 0,
        },
      },
      coupon: {
        couponCode: '',
        couponAmount: 0,
        couponPercentage: 0,
      },
      status: 'active',
    },
    // Add more subscription documents as needed
  ];
}

function generatePlanDummyData() {
  return [
    {
      _id: new mongoose.Types.ObjectId(),
      plan_name: 'Basic Plan',
      description: 'Basic plan description',
      price: 50,
    },
    // Add more plan documents as needed
  ];
}

createCollections();
