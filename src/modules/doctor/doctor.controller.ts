import {
  Controller,
  Post,
  Get,
  Body,
  UseGuards,
  Request,
  Patch,
  Param,
} from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('doctor')
@UseGuards(JwtAuthGuard)
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @Post('profile')
  async createProfile(@Body() dto: CreateDoctorDto, @Request() req: any) {
    return this.doctorService.createDoctorProfile(req.user.userId, dto);
  }

  @Get('profile')
  async getProfile(@Request() req: any) {
    return this.doctorService.getDoctorProfile(req.user.userId);
  }

  @Patch('profile')
  async updateProfile(@Body() dto: Partial<CreateDoctorDto>, @Request() req: any) {
  return this.doctorService.updateDoctorProfile(req.user.userId, dto);
}

 @Get('all')
  async getAllDoctors() {
    return this.doctorService.getAllDoctors();
  }


  @Get(':id')
  async getDoctorById(@Param('id') id: number) {
    return this.doctorService.getDoctorById(id);
  }


}
