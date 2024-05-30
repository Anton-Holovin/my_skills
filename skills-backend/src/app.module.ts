import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import initAdminJs from './admin.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public')
    }),
    ConfigModule.forRoot(),
    AuthModule,
    UserModule,
    import('@adminjs/nestjs').then(initAdminJs)
  ]
})
export class AppModule {}
