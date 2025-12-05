import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from '../users/user.schema';
import { RegisterDto, LoginDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        private jwtService: JwtService,
    ) { }

    async register(registerDto: RegisterDto) {
        const { email, password, name } = registerDto;

        // Check if user already exists
        const existingUser = await this.userModel.findOne({ email });
        if (existingUser) {
            throw new UnauthorizedException('Email already exists');
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = new this.userModel({
            email,
            password: hashedPassword,
            name,
        });

        await user.save();

        // Generate JWT token
        const payload = { sub: user._id, email: user.email };
        const access_token = this.jwtService.sign(payload);

        return {
            access_token,
            user: {
                id: user._id,
                email: user.email,
                name: user.name,
            },
        };
    }

    async login(loginDto: LoginDto) {
        const { email, password } = loginDto;

        console.log('Login attempt for email:', email);

        // Find user
        const user = await this.userModel.findOne({ email });
        if (!user) {
            console.log('User not found:', email);
            throw new UnauthorizedException('Invalid credentials');
        }

        console.log('User found, verifying password...');

        // Verify password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            console.log('Invalid password for user:', email);
            throw new UnauthorizedException('Invalid credentials');
        }

        console.log('Password valid, generating token...');

        // Generate JWT token
        const payload = { sub: user._id, email: user.email };
        const access_token = this.jwtService.sign(payload);

        console.log('Login successful for user:', email);

        return {
            access_token,
            user: {
                id: user._id,
                email: user.email,
                name: user.name,
            },
        };
    }

    async validateUser(userId: string) {
        const user = await this.userModel.findById(userId);
        if (!user) {
            throw new UnauthorizedException('User not found');
        }
        return user;
    }
}
