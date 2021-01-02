import { Controller, Get, Post } from '@nestjs/common';
import { IssuesService } from './issues.service';

@Controller('issues')
export class IssuesController {
  constructor(private readonly issueService: IssuesService) {}

  @Get()
  async getIssues(): Promise<string> {
    return this.issueService.getIssues();
  }

  @Post()
  async addJob(): Promise<void> {
    await this.issueService.addJob();
  }
}
