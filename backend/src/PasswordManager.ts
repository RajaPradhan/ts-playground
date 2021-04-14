import { scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';

const scryptAsync = promisify(scrypt);

export class PasswordManager {
    private hashedPasswordWithSalt = '';

    async toHash(password: string) {
        const salt = randomBytes(8).toString('hex');
        const buf = (await scryptAsync(password, salt, 64)) as Buffer;

        this.hashedPasswordWithSalt = `${buf.toString('hex')}.${salt}`;
    }

    async isValidPassowrd(suppliedPassowrd: string) {
        const [hashedPassword, salt] = this.hashedPasswordWithSalt.split('.');

        const buf = (await scryptAsync(suppliedPassowrd, salt, 64)) as Buffer;

        return buf.toString('hex') === hashedPassword;
    }
}
