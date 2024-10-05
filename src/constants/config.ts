import { config } from 'dotenv';
import fs from 'fs';
import path from 'path';

const env = process.env.NODE_ENV;
const connectionString = process.env.MONGODB_CONNECTION_STRING;
const mongoDbUserCollection = process.env.MONGODB_USER_COLLECTION;
const envFilename = `.env.${env}`;

console.log(mongoDbUserCollection);

if (!env) {
	console.error('NODE_ENV is not set');
	process.exit(1);
}

console.log(`Detected NODE_ENV = ${env}, using ${envFilename}`);

if (!fs.existsSync(path.resolve(envFilename))) {
	console.log(`Environment file not found ${envFilename}`);
	console.log(`Please create file ${envFilename} and take examples from .env.example`);
	process.exit(1);
}

config({
	path: envFilename,
});

export const isProduction = env === 'production';

export const envConfig = {
	port: process.env.PORT || 4000,
	mongoDBConnectionString: connectionString as string,
	mongoDBUserCollection: mongoDbUserCollection as string
};
