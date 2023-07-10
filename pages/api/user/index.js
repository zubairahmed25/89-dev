//database utiltiy import here.
import { Mongo } from '../../../utils/mongo';

const HttpResponse = (data) => {
  return { data: data ? data : {} };
};

export const ensureUser = (handler) => {
  return async function (req, res) {
    return handler(req, res);
  };
};

export const withAuth = (handler) => {
  return async function (req, res) {
    let user = null;
    const start = Date.now();
    let ok = true;
    let httpStatus = 200;
    const apiName = `${handler.name}(${req.method})`;
    try {
      return await handler(req, res);
    } catch (error) {
      throw error;
    } finally {
      const timeTaken = Date.now() - start;
      const message =
        `API-Server: ${req.url} - ${apiName}. User: ${user?.email}. UserType: ${user?.userType}. ` +
        `Succeeded: ${ok}. HttpStatus: ${httpStatus}. Time: ${timeTaken}ms.`;
      console.log(message);
    }
  };
};

const handleGet = async (req, res) => {
  const users = await Mongo.findAll({ collection: 'User', query: {} });

  // const users = {username:"tauseef"};
  res.status(200).json(HttpResponse(users));
};

const UserAPI = async (req, res) => {
  const { method } = req;

  switch (method) {
    case 'GET':
      const get = ensureUser(handleGet);
      return get(req, res);

    default:
      throw new Error(`Method not supported`);
  }
};

export default withAuth(UserAPI);
