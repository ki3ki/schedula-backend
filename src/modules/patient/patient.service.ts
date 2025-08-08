import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Patient } from 'src/entities/Patient.entity';
import { User } from 'src/entities/User.entity';
import { Repository } from 'typeorm';
import { CreatePatientDto } from './dto/create-patient.dto';

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(Patient)
    private patientRepo: Repository<Patient>,

    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  // ✅ Create patient profile only if user is a patient and hasn't created one already
  async createProfile(userId: number, dto: CreatePatientDto) {
    const user = await this.userRepo.findOneBy({ id: userId });
    if (!user || user.role !== 'patient') {
      throw new NotFoundException('Only registered patients can create profiles');
    }

    const existing = await this.patientRepo.findOne({ where: { userId } });
    if (existing) {
      throw new BadRequestException('Patient profile already exists');
    }

    const profile = this.patientRepo.create({ ...dto, user });
    return this.patientRepo.save(profile);
  }

  // ✅ Get logged-in patient’s own profile
  async getOwnProfile(userId: number) {
    return this.patientRepo.findOne({
      where: { userId },
      relations: ['user'],
    });
  }

  // ✅ Update the logged-in patient’s profile
  async updateProfile(userId: number, dto: Partial<CreatePatientDto>) {
    const profile = await this.patientRepo.findOneBy({ userId });
    if (!profile) {
      throw new NotFoundException('Patient profile not found');
    }

    Object.assign(profile, dto);
    return this.patientRepo.save(profile);
  }

  // ✅ Get all patient profiles (open endpoint)
  async listAllPatients() {
    return this.patientRepo.find({ relations: ['user'] });
  }

  // ✅ Get single patient profile by ID (for public or internal use)
  async getPatientById(userId: number) {
    const profile = await this.patientRepo.findOne({
      where: { userId },
      relations: ['user'],
    });

    if (!profile) {
      throw new NotFoundException('Patient not found');
    }

    return profile;
  }
}

