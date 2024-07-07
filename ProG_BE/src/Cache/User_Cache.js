import { BloomFilter } from "bloom-filters";
import redis from "redis";
import { getData_From_MongoDB } from "../Data/fetchData_MongoDB";
import { MAINDB_MONGODB_DBNAME } from "../../config";

export const redisClient = redis.createClient();
export const bloomConfig = new BloomFilter(1000, 0.01);

const url = MAINDB_MONGODB_DBNAME;
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

