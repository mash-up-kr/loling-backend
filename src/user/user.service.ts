import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as crypto from 'crypto';
import { Repository } from 'typeorm';
import { environment } from '../../environment';
import { encrypt, EncryptOption } from '../lib/encryption';
import { User } from './entities';
import { CreateUserPayload } from './payloads';


@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {
    }

    async getUserById(id: number): Promise<User | undefined> {
        return await this.userRepository.findOne(id);
    }

    async getUserByUserId(userId: string): Promise<User | undefined> {
        return await this.userRepository.findOne({ userId });
    }

    async getUserByPhoneNumber(phoneNumber: string): Promise<User | undefined> {
        return await this.userRepository.findOne({ phoneNumber });
    }

    async getUserByEncryptedPhoneNumber(phoneNumber: string): Promise<User | undefined> {
        const encryptedPhoneNumber = await this.encryptPhoneNumber(phoneNumber);
        return await this.userRepository.findOne({ encryptedPhoneNumber });
    }

    async createUser(payload: CreateUserPayload): Promise<User> {
        const user = new User();

        user.userId = payload.id;
        user.name = payload.name;
        user.birthday = new Date(
            payload.birthday.year,
            payload.birthday.month - 1,
            payload.birthday.day,
        ).toISOString();
        user.createdDatetime = new Date().toISOString();
        user.phoneNumber = payload.phoneNumber;
        user.anonymous = false;

        // 비밀번호를 암호화하여 저장합니다.
        const encryptResult = await encrypt(payload.password, this.getPasswordEncryptOption());

        user.passwordSalt = encryptResult.salt.toString('base64');
        user.password = encryptResult.encryptedText;

        return await this.userRepository.save(user);
    }

    async authorizeUserWithPassword(user: User, password: string): Promise<boolean> {
        const { encryptedText } = await encrypt(password, this.getPasswordEncryptOption(user.passwordSalt));
        return user.password === encryptedText;
    }

    async encryptPhoneNumber(phoneNumber: string): Promise<string> {
        const { encryptedText } = await encrypt(phoneNumber, this.getPhoneNumberEncryptOption(phoneNumber));
        return encryptedText;
    }

    private getPasswordEncryptOption(salt?: string): EncryptOption {
        const option: EncryptOption = {
            iteration: 130023,
            digest: environment.config.production ? 'sha512' : 'sha1',
        };

        if (salt) {
            option.salt = Buffer.from(salt, 'base64');
        }

        return option;
    }

    private getPhoneNumberEncryptOption(phoneNumber: string): EncryptOption {
        const hash = crypto.createHash('md5');
        hash.update(phoneNumber);

        const buffer = Buffer.from(hash.digest('base64'), 'base64');

        return {
            iteration: 103045,
            digest: 'sha512',
            salt: buffer,
            saltSize: buffer.byteLength,
        };
    }
}
