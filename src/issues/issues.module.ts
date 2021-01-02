import { Module } from '@nestjs/common';
import { IssuesController } from './issues.controller';
import { BullModule } from '@nestjs/bull';
import { IssuesService } from './issues.service';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { IssueEntity } from './models/issue.entity';
import { IssuesProcessor } from './issues.processor';

@Module({
  imports: [
    // TypeOrmModule.forFeature([IssueEntity]),
    BullModule.registerQueue({
      name: 'issues',
    }),
  ],
  controllers: [IssuesController],
  providers: [IssuesService, IssuesProcessor],
})
export class IssuesModule {}
