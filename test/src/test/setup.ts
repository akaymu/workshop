import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

// declare global {
//   namespace NodeJS {
//     interface Global {
//       getCookie(id?: string, isActivated?: boolean, isAdmin?: boolean): string[];
//       getPayloadFromCookie(cookie: string[]): {
//         id: string;
//         email: string;
//         isActivated: boolean;
//         isAdmin: boolean;
//       } | null;
//       getUserWithId(id: string): Promise<{
//         email: string;
//         password: string;
//         isActivated: boolean;
//         isAdmin: boolean;
//       } | null>;
//     }
//   }
// }

// // Mock the NATS
// jest.mock('../nats-wrapper');

let mongo: any;
beforeAll(async () => {
  // process.env.JWT_KEY = 'test-jwt-secret-key';
  // process.env.LINK_KEY = 'test-link-secret-key';

  mongo = new MongoMemoryServer();
  const mongoUri = await mongo.getUri();

  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});

// global.getCookie = (id?: string, isActivated?: boolean, isAdmin?: boolean) => {
//   // Build a JWT payload. { id, email }
//   const payload = {
//     id: id || new mongoose.Types.ObjectId().toHexString(),
//     email: 'test@test.com',
//     isActivated: isActivated || false,
//     isAdmin: isAdmin || false
//   }

//   // Create the JWT!
//   const token = jwt.sign(payload, process.env.JWT_KEY!);

//   // Build session object { jwt: MY_JWT }
//   const session = { jwt: token };

//   // Turn that session into JSON
//   const sessionJSON = JSON.stringify(session);

//   // Take JSON and encode it as base64
//   const base64 = Buffer.from(sessionJSON).toString('base64');

//   // return a string thats the cookie with the encoded data
//   return [`express:sess=${base64}`];
// };

// global.getPayloadFromCookie = (cookie) => {
//   try {
//     const sesionAfterDecode = ((cookie[0].split(';'))[0].split(':sess='))[1];
//     const token = JSON.parse(Buffer.from(sesionAfterDecode, 'base64').toString('utf8')).jwt;
//     const payload = jwt.verify(token, process.env.JWT_KEY!) as {
//       id: string;
//       email: string;
//       isActivated: boolean;
//       isAdmin: boolean;
//     };
//     return payload;

//   } catch (err) {
//     return null;
//   }
// };

// global.getUserWithId = async (id) => {
//   try {
//     const user = await User.findById(id);
//     if (!user) {
//       return null;
//     }

//     return {
//       email: user.email,
//       password: user.password,
//       isActivated: user.isActivated,
//       isAdmin: user.isAdmin
//     };
//   } catch (err) {
//     return null;
//   }
// };