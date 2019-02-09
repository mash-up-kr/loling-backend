import { pbkdf2, randomBytes } from 'crypto';
import { promisify } from 'util';


const randomBytesAsync = promisify(randomBytes);
const pbkdf2Async = promisify(pbkdf2);


export class EncryptOption {
    /** Iteration count */
    iteration?: number = 102041;

    /** Algorithm for hash generator. Default is 'sha1', but don't use in production. */
    digest?: 'sha1' | 'sha512' = 'sha1';

    /** Salt value for use. If doesn't provide it will generate randomly. */
    salt?: Buffer;

    /**
     * Salt size for generate randomly, if you don't provide salt.
     * Recommend size is at least 16 byte.
     * Unit is byte.
     */
    saltSize?: number = 64;

    /** Size of key that will be generated. Unit is byte. */
    keySize?: number = 64;
}


export interface EncryptResult {
    /** Salt that have been used. */
    salt: Buffer;

    /** Plaint text. */
    text: string;

    /** Base64 encoded encrypted text. */
    encryptedText: string;
}


/**
 * Create salt randomly.
 * @param size
 */
async function createSaltBuffer(size: number): Promise<Buffer> {
    return await randomBytesAsync(size);
}


/**
 * Make encryption for plain text.
 * @param text
 * @param option
 */
export async function encrypt(
    text: string,
    option?: EncryptOption,
): Promise<EncryptResult> {
    const opt = { ...new EncryptOption(), ...option } as EncryptOption;

    let salt = opt.salt;

    if (!salt) {
        salt = await createSaltBuffer(opt.saltSize);
    }

    const key = await pbkdf2Async(text, salt, opt.iteration, opt.keySize, opt.digest);

    return {
        salt,
        text,
        encryptedText: key.toString('base64'),
    };
}
