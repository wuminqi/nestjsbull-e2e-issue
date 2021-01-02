import {
  Injectable,
  OnApplicationShutdown,
  OnModuleDestroy,
} from '@nestjs/common';
// import { IssueEntity } from './models/issue.entity';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
import { debug as Debug } from 'debug';

const debug = Debug('issue:service');

import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Injectable()
export class IssuesService implements OnApplicationShutdown, OnModuleDestroy {
  constructor(
    // @InjectRepository(IssueEntity)
    // private readonly issueRepository: Repository<IssueEntity>,
    @InjectQueue('issues')
    private queue: Queue,
  ) {}

  async onApplicationShutdown(signal?: string) {
    // throw new Error("Method not implemented.");
    // debug(`onApplicationShutdown called: ${signal}`);
    // try {
    //   if (this.queue) {
    //     await this.queue.close();
    //     debug(`onApplicationShutdown this.queue closed`);
    //   }
    // } catch (err) {
    //   debug(`onApplicationShutdown: ${err}`);
    // }
  }

  async onModuleDestroy(): Promise<any> {
    // debug(`onModuleDestroy called`);
    // try {
    //   if (this.queue) {
    //     await this.queue.close();
    //     debug(`onModuleDestroy this.queue closed`);
    //   }
    // } catch (err) {
    //   debug(`onModuleDestroy: ${err}`);
    // }
  }

  async getIssues(): Promise<string> {
    return 'issues';
  }

  async addJob(): Promise<void> {
    await this.queue.add({
      foo: 'bar',
    });
  }
}
