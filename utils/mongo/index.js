//Add all Models here.
import User from '../../models/User';
import Post from '../../models/Post';
import Plan from '../../models/Plan';
import Payment from '../../models/Payment';
import Subscription from '../../models/Subscription';
import SubscriptionHistory from '../../models/SubscriptionHistory';
import { dbConnect, dbDisconnect } from '../dbConnect';

async function connectToDatabase() {
  try {
    await dbConnect();
  } catch (error) {
    console.error('Failed to connect to the database:', error);
  }
}

connectToDatabase();

//collectionsTable

const collectionsTable = {
  User: User,
  Payment: Payment,
  Plan: Plan,
  Post: Post,
  Subscription: Subscription,
  SubscriptionHistory: SubscriptionHistory,
};

//Log time

const logTime = async (query) => {
  const start = Date.now();
  try {
    return await query;
  } finally {
    const timeTaken = Date.now() - start;
    console.log(`MONGO: ${query}. Time taken: ${timeTaken}ms`);
  }
};

//functions to connect and disconnect from database

export const MongoDisconnect = () => {
  return dbDisconnect();
};

//All db operations here.

const getModel = (collection) => {
  return collectionsTable[collection];
};

export const Mongo = {
  create: async ({ collection, object }) => {
    const model = getModel(collection);
    return await logTime(new model(object).save());
  },

  upsert: async ({ collection, query, updateData }) => {
    updateData.updatedAt = Date.now();
    const model = getModel(collection);
    return await logTime(
      model.findOneAndUpdate(
        query,
        { $set: updateData },
        { new: true, upsert: true }
      )
    );
  },

  updateOneWithQuery: async ({
    collection,
    query,
    updateData,
    returnField,
  }) => {
    updateData.updatedAt = Date.now();
    const model = getModel(collection);
    return await logTime(
      model.findOneAndUpdate(
        query,
        { $set: updateData },
        { new: true, select: returnField }
      )
    );
  },

  updateOne: async ({
    collection,
    id,
    updateData,
    returnField,
    verifyUpdatedAt,
  }) => {
    const query = { _id: id };
    if (verifyUpdatedAt) {
      query.updatedAt = verifyUpdatedAt;
    }
    return await Mongo.updateOneWithQuery({
      collection,
      query,
      updateData,
      returnField,
    });
  },

  updateOneWithOptions: async ({
    collection,
    id,
    updateData,
    options = {},
  }) => {
    if (!options || options.timestamps !== false) {
      if (updateData.$set) {
        updateData.$set.updatedAt = Date.now();
      } else {
        updateData.$set = { updatedAt: Date.now() };
      }
    }
    const model = getModel(collection);
    return await logTime(
      model.findOneAndUpdate({ _id: id }, updateData, {
        new: true,
        ...options,
      })
    );
  },

  updateOneWithQueryAndOptions: async ({
    collection,
    query,
    updateData,
    options = {},
  }) => {
    const model = getModel(collection);
    return await logTime(
      model.findOneAndUpdate(query, updateData, {
        new: true,
        ...options,
      })
    );
  },

  updateMany: async ({ collection, query, updateData }) => {
    const model = getModel(collection);
    return await logTime(model.updateMany(query, updateData, { new: true }));
  },

  findAll: async ({ collection, query, returnField, limit, sort }) => {
    const model = getModel(collection);
    return await logTime(
      model.find(query, returnField)?.limit(limit)?.sort(sort)
    );
  },

  findOne: async ({ collection, query, returnField }) => {
    const model = getModel(collection);
    return await logTime(model.findOne(query, returnField));
  },

  deleteOne: async ({ collection, id }) => {
    const model = getModel(collection);
    return await logTime(model.deleteOne({ _id: id }));
  },

  deleteMany: async ({ collection, query }) => {
    const model = getModel(collection);
    return await logTime(model.deleteMany(query));
  },

  insertMany: async ({ collection, insertData }) => {
    const model = getModel(collection);
    return await logTime(model.insertMany(insertData));
  },
};
