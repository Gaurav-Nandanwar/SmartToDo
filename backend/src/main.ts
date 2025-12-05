import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // Enable CORS for React Native app
    app.enableCors({
        origin: true,
        credentials: true,
    });

    // Enable validation
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true,
        }),
    );

    const port = process.env.PORT || 3000;
    // Listen on 0.0.0.0 to accept connections from local network devices
    await app.listen(port, '0.0.0.0');

    console.log(`🚀 SmartToDo Backend is running on:`);
    if (process.env.NODE_ENV === 'production') {
        console.log(`   - Production: Port ${port}`);
    } else {
        console.log(`   - Local: http://localhost:${port}`);
        console.log(`   - Network: http://192.168.1.20:${port}`);
    }
}

bootstrap();
