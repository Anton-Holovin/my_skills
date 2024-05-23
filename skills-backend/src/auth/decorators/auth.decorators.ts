import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../jwt/guards/jwt.guards';

export const Auth = () => UseGuards(JwtAuthGuard);
