import pkg from 'bloom-filters';
const { BloomFilter } = pkg;
import redis from "redis";
import { getData_From_MongoDB } from "../Data/fetchData_MongoDB.js";
import { MAINDB_MONGODB_DBNAME, MAINDB_MONGODB_URL } from "../../config.js";

export const redisClient = redis.createClient();
await redisClient.connect();

export const bloomConfig = new BloomFilter(1000, 10);

const url = MAINDB_MONGODB_URL;
const dbName = MAINDB_MONGODB_DBNAME;
const collectionName = 'user';

redisClient.on('error', (err) => {
    console.error('Redis error:', err);
});

export const fetchDataToCache = async () => {
    const key = "userCollections";
    const ttl = 60 * 60; // Time-to-live in seconds - 1 giờ

    try {
        const value = await redisClient.get(key);
        if (!value) {
            const data = await getData_From_MongoDB(url, dbName, collectionName);
            await redisClient.set(key, JSON.stringify(data), 'EX', ttl);
            const usernames = data.map(user => user.username);
            usernames.forEach(username => {
                bloomConfig.add(username);
            });
            console.log('Data fetched from MongoDB and cached');
            return data;
        } else {
            console.log('Data fetched from cache');
            return JSON.parse(value);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};
await fetchDataToCache()