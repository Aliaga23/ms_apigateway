import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { Usuario, LoginResponse } from './entities/usuario.entity';
import { CreateUsuarioInput, LoginInput, UpdateUsuarioInput } from './dto/usuario.input';

@Injectable()
export class UsuariosService {
  private readonly msMongoUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.msMongoUrl = this.configService.get<string>('MS_MONGO_URL') || '';
  }

  async register(createUsuarioInput: CreateUsuarioInput): Promise<Usuario> {
    try {
      const response = await firstValueFrom(
        this.httpService.post(`${this.msMongoUrl}/auth/register`, createUsuarioInput),
      );
      return response.data.data;
    } catch (error) {
      throw new HttpException(
        error.response?.data?.message || 'Error registrando usuario',
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async login(loginInput: LoginInput): Promise<LoginResponse> {
    try {
      const response = await firstValueFrom(
        this.httpService.post(`${this.msMongoUrl}/auth/login`, loginInput),
      );
      return response.data.data;
    } catch (error) {
      throw new HttpException(
        error.response?.data?.message || 'Error en login',
        error.response?.status || HttpStatus.UNAUTHORIZED,
      );
    }
  }

  async getProfile(token: string): Promise<Usuario> {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${this.msMongoUrl}/perfil`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      );
      return response.data.data;
    } catch (error) {
      throw new HttpException(
        error.response?.data?.message || 'Error obteniendo perfil',
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getAllUsers(page: number = 1, limit: number = 10): Promise<any> {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${this.msMongoUrl}/usuarios`, {
          params: { page, limit },
        }),
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        error.response?.data?.message || 'Error obteniendo usuarios',
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getUserById(id: string): Promise<Usuario> {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${this.msMongoUrl}/usuarios/${id}`),
      );
      return response.data.data;
    } catch (error) {
      throw new HttpException(
        error.response?.data?.message || 'Usuario no encontrado',
        error.response?.status || HttpStatus.NOT_FOUND,
      );
    }
  }

  async updateUser(id: string, updateUsuarioInput: UpdateUsuarioInput, token: string): Promise<boolean> {
    try {
      await firstValueFrom(
        this.httpService.put(`${this.msMongoUrl}/usuarios/${id}`, updateUsuarioInput, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      );
      return true;
    } catch (error) {
      throw new HttpException(
        error.response?.data?.message || 'Error actualizando usuario',
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteUser(id: string, token: string): Promise<boolean> {
    try {
      await firstValueFrom(
        this.httpService.delete(`${this.msMongoUrl}/usuarios/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      );
      return true;
    } catch (error) {
      throw new HttpException(
        error.response?.data?.message || 'Error eliminando usuario',
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
