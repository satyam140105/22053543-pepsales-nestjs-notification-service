import { IsEnum, IsInt, IsNotEmpty } from 'class-validator';

export class CreateNotificationDto {
  @IsInt()
  userId: number;

  @IsEnum(['email', 'sms', 'in-app'])
  type: 'email' | 'sms' | 'in-app';

  @IsNotEmpty()
  message: string;
}
