import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientModule } from './client/client.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { CommonModule } from './common/common.module';
import { VehiclesModule } from './vehicles/vehicles.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [ClientModule, AppointmentsModule, CommonModule, VehiclesModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
