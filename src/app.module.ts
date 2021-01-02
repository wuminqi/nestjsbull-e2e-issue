import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BullModule } from '@nestjs/bull';
import { IssuesModule } from './issues/issues.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { TypeOrmModule } from '@nestjs/typeorm';
import { IssueEntity } from './issues/models/issue.entity';

const env = process.env;
const nodeEnv = env.NODE_ENV || 'development';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.${nodeEnv}`, '.env'],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('RDB_HOST'),
        port: parseInt(configService.get('RDB_PORT') || '3306', 10),
        username: configService.get('RDB_USERNAME'),
        password: configService.get('RDB_PASSWORD'),
        database: configService.get('RDB_DATABASE'),
        timezone: '+08:00',
        entities: [IssueEntity],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    IssuesModule,
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        redis: {
          host: configService.get('REDIS_HOST'),
          port: parseInt(configService.get('REDIS_PORT') || '6379', 10),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
