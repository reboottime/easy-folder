import { Module } from '@nestjs/common';

import { ApiModule } from './api/api.module';
import { DatabaseModule } from './database/database.module';
import { HealthModule } from './health/health.module';

@Module({
  imports: [ApiModule, DatabaseModule, HealthModule],
})
export class AppModule {}
