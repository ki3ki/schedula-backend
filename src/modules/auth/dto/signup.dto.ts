export class SignupDto {
  name: string;
  email: string;
  password: string;
  phone: string;
  role: 'doctor' | 'patient';
}