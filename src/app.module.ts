import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { AuthModule } from './modules/auth/auth.module';
import { DoctorModule } from './modules/doctor/doctor.module';  
import { PatientModule } from './modules/patient/patient.module';



@Module({
 imports: [
  TypeOrmModule.forRoot(typeOrmConfig),
  AuthModule, DoctorModule, PatientModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
