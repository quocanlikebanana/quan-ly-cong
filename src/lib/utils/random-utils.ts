import { v4 as uuidv4 } from 'uuid';

export class RandomUtils {
    static generateRandomUUID(): string {
        return uuidv4();
    }
}