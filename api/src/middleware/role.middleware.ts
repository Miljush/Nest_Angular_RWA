import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RoleMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      console.log("Zoran");
      let cookie = req.cookies['jwt'];
      const data=await this.jwtService.verifyAsync(cookie);
      if(!data){
        throw new UnauthorizedException();
      }
      const userRole = data.role
      if (userRole === 'user') {
        next();
      } else {
        throw new Error('Unauthorized');
      }
    } catch (error) {
      return res.status(401).json({ message: 'Unauthorized'+error });
    }
  }
}