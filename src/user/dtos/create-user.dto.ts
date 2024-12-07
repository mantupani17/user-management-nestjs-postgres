
import { IsPasswordMatching } from '@app/common/decorators/confirm-password';
import { PartialType } from '@nestjs/mapped-types';
import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, IsTaxId, MaxLength, MinLength } from 'class-validator';

export class CreateUserPayload {
    @IsString()
    @IsEmail()
    email: string

    @IsOptional()
    username?: string

    @IsString()
    @MinLength(8, { message: 'Password must be at least 8 characters long' })
    @MaxLength(20, { message: 'Password must be at most 20 characters long' })
    password: string

    @IsString()
    @IsNotEmpty({ message: 'Confirm Password is required' })
    @IsPasswordMatching('password', { message: 'Passwords do not match' })
    confirmPassword: string

    @IsOptional()
    @IsString()
    firstName?: string
    
    @IsOptional()
    @IsString()
    lastName?: string
    
    @IsOptional()
    @IsString()
    mobile?: string

    @IsOptional()
    @IsNumber()
    roleId: number;
}


export class LoginPayload {
    @IsOptional()
    @IsString()
    @IsEmail()
    email?: string

    @IsOptional()
    username?: string

    @IsString()
    password: string
}

export class LogoutPaylod {
    @IsString()
    token?: string
}

export class VerifyAccountPaylod {
    @IsString()
    token?: string
}

export class InitiateForgotPaswordPaylod {
    @IsString()
    email?: string
}

export class ForgotPasswordPayload {
    @IsString()
    @MinLength(8, { message: 'Password must be at least 8 characters long' })
    @MaxLength(20, { message: 'Password must be at most 20 characters long' })
    password: string

    @IsString()
    @IsNotEmpty({ message: 'Confirm Password is required' })
    @IsPasswordMatching('password', { message: 'Passwords do not match' })
    confirmPassword: string

    @IsString()
    token?: string
}


export class UpdateUserPayload extends PartialType(CreateUserPayload) {}