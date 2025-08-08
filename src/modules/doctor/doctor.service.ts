import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Doctor } from 'src/entities/Doctor.entity';
import { Repository } from 'typeorm';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { User } from 'src/entities/User.entity';

@Injectable()
export class DoctorService {
  constructor(
    @InjectRepository(Doctor)
    private doctorRepo: Repository<Doctor>,

    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async createDoctorProfile(userId: number, dto: CreateDoctorDto) {
    const user = await this.userRepo.findOneBy({ id: userId });
    if (!user || user.role !== 'doctor') {
      throw new NotFoundException('Doctor user not found');
    }

    const existing = await this.doctorRepo.findOne({ where: { userId } });
    if (existing) {
      throw new BadRequestException('Doctor profile already exists');
    }

    const profile = this.doctorRepo.create({ ...dto, user });
    return this.doctorRepo.save(profile);
  }

  async getDoctorProfile(userId: number) {
    return this.doctorRepo.findOne({
      where: { userId },
      relations: ['user'],
    });
  }

  async updateDoctorProfile(userId: number, dto: Partial<CreateDoctorDto>) {
    const profile = await this.doctorRepo.findOneBy({ userId });
    if (!profile) throw new NotFoundException('Doctor profile not found');

    Object.assign(profile, dto);
    return this.doctorRepo.save(profile);
  }

  async getAllDoctors() {
    return this.doctorRepo.find({
      relations: ['user'],
      order: { created_at: 'DESC' },
    });
  }

  async getDoctorById(userId: number) {
    const doctor = await this.doctorRepo.findOne({
      where: { userId },
      relations: ['user'],
    });
    if (!doctor) throw new NotFoundException('Doctor not found');
    return doctor;
  }
}
