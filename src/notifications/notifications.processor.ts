import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';

@Processor('notifications')
export class NotificationsProcessor {
  
  @Process()
  async handleNotification(job: Job<any>) {
    // job.data contains your notification info
    try {
      // call your email/SMS sending logic here
      console.log('Sending notification:', job.data);
      // simulate sending
    } catch (error) {
      console.error('Error sending notification:', error);
      throw error;  // Bull will handle retry based on settings
    }
  }
}
