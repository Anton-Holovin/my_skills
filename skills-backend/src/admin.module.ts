import * as process from 'node:process';
import { PrismaService } from './prisma/prisma.service';

const DEFAULT_ADMIN = {
  email: process.env.ADMIN_LOGIN,
  password: process.env.ADMIN_PASSWORD
};
const authenticate = async (email: string, password: string) => {
  if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
    return Promise.resolve(DEFAULT_ADMIN);
  }
  return null;
};

export default async function ({ default: { AdminModule } }) {
  const { AdminJS } = await import('adminjs');
  const { Database, Resource, getModelByName } = await import('@adminjs/prisma');
  const prisma = new PrismaService();

  AdminJS.registerAdapter({ Database, Resource });

  return AdminModule.createAdminAsync({
    useFactory: async () => {
      return {
        adminJsOptions: {
          rootPath: '/admin',
          resources: [
            {
              resource: { model: getModelByName('User'), client: prisma },
              options: {
                navigation: {
                  name: null,
                  icon: 'Users'
                }
              }
            }
          ],
          branding: {
            companyName: `${process.env.PROJECT_NAME} - Admin panel`,
            logo: '/logo.svg',
            favicon: '/favicon-32x32.png'
          }
        },
        auth: {
          authenticate,
          cookieName: 'adminjs',
          cookiePassword: 'secret'
        },
        sessionOptions: {
          resave: true,
          saveUninitialized: true,
          secret: 'secret'
        }
      };
    }
  });
}
