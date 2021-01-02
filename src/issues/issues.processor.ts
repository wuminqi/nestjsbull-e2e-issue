import { Process, Processor } from '@nestjs/bull';

import { Job } from 'bull';

@Processor('issues')
export class IssuesProcessor {
  @Process()
  handler(job: Job) {
    console.log(job.data);
  }
}
