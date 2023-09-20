import { MiddlewareConsumer, Module, NestModule, RequestMethod, forwardRef } from '@nestjs/common';
import { UserService } from './services/user.service';
import { UserEntity } from './models/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './controllers/user.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { RoleMiddleware } from 'src/middleware/role.middleware';

@Module({
  imports:[ConfigModule.forRoot({isGlobal:true}),JwtModule.register({

    secret:"secret",
    signOptions: { expiresIn: '1d' },
  }),TypeOrmModule.forFeature([UserEntity])
  ],
  providers: [UserService,RoleMiddleware],
  controllers:[UserController],
  exports:[UserService]
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(RoleMiddleware)
      .forRoutes({ path: 'user/vratiSveUsere', method: RequestMethod.GET },
      { path: 'user/vratiUsera/:id', method: RequestMethod.GET });
  }
}
