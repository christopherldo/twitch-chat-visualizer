import { Module } from '@nestjs/common';
import { TokenManagerService } from './token-manager.service';

@Module({
  providers: [TokenManagerService],
  exports: [TokenManagerService],
})
export class AuthModule {}
