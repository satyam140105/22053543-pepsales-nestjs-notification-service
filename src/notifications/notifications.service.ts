import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from './notification.entity';
import { CreateNotificationDto } from './notification.dto';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';


@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification)
    private readonly repo: Repository<Notification>,
    @InjectQueue('notifications') private notificationQueue: Queue,
  ) {}

 async create(dto: CreateNotificationDto) { 
  // Add notification job to queue instead of saving immediately
  await this.notificationQueue.add(dto, {
    attempts: 5,          // retry up to 5 times
    backoff: 10000,       // 10 seconds delay between retries
  });

  // Optionally return a success message or the job info
  return { message: 'Notification queued successfully' };
}

  findByUser(userId: number) {
    return this.repo.find({ where: { userId }, order: { createdAt: 'DESC' } });
  }
}
