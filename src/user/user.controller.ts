import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { User } from './entities';
import { UserDuplicatedPhoneNumberException, UserDuplicatedUserIdException } from './exceptions';
import { CreateUserPayload } from './payloads';
import { FindUserByPhoneNumberQuery, FindUserByUserIdQuery } from './queries';
import { UserService } from './user.service';
import { ApiOkResponse } from '@nestjs/swagger';


@Controller('users')
export class UserController {
    constructor(private userService: UserService) {
    }

    @Post()
    @ApiOkResponse({
        description: '회원가입: 사용자를 생성합니다.',
    })
    async createUser(@Body() payload: CreateUserPayload): Promise<User> {
        await this.checkUserId({ id: payload.id });
        await this.checkUserPhoneNumber({ phoneNumber: payload.phoneNumber });

        const anonymousUser = await this.userService.getUserByEncryptedPhoneNumber(
            payload.phoneNumber,
        );

        if (anonymousUser && anonymousUser.anonymous) {
            return await this.userService.identifyAnonymous(anonymousUser, payload);
        }

        return await this.userService.createUser(payload);
    }

    @Get('check-id')
    async checkUserId(@Query() query: FindUserByUserIdQuery): Promise<void> {
        if (await this.userService.getUserByUserId(query.id)) {
            throw new UserDuplicatedUserIdException();
        }
    }

    @Get('check-phone-number')
    async checkUserPhoneNumber(@Query() query: FindUserByPhoneNumberQuery): Promise<void> {
        const { phoneNumber } = query;

        if (await this.userService.getUserByPhoneNumber(phoneNumber)) {
            throw new UserDuplicatedPhoneNumberException();
        }
    }
}
