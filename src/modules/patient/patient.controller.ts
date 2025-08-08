import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PatientService } from './patient.service';
import { CreatePatientDto } from './dto/create-patient.dto';

@Controller('patient')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @UseGuards(JwtAuthGuard)
  @Post('profile')
  create(@Body() dto: CreatePatientDto, @Request() req: any) {
    return this.patientService.createProfile(req.user.userId, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getOwn(@Request() req: any) {
    return this.patientService.getOwnProfile(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('profile')
  update(@Body() dto: Partial<CreatePatientDto>, @Request() req: any) {
    return this.patientService.updateProfile(req.user.userId, dto);
  }

  @Get()
  listAll() {
    return this.patientService.listAllPatients();
  }

  @Get(':id')
  getById(@Param('id') id: number) {
    return this.patientService.getPatientById(id);
  }
}
