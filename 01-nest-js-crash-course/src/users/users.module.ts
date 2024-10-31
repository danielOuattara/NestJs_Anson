import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UsersController } from './controllers/users/users.controller';
import { UsersService } from './services/users/users.service';
import { UsersMiddleware } from './middlewares/user/users.middleware';
import { AdminMiddleware } from './middlewares/admin/admin-middleware';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(UsersMiddleware).forRoutes();

    // OR

    // consumer.apply(UsersMiddleware).forRoutes(UsersController);

    // OR

    // consumer.apply(UsersMiddleware).forRoutes({
    //   path: 'users',
    //   method: RequestMethod.GET,
    // });

    // OR

    // consumer.apply(UsersMiddleware).forRoutes({
    //   path: 'users/**',
    //   method: RequestMethod.GET,
    // });

    // OR

    consumer.apply(UsersMiddleware).forRoutes(
      {
        path: 'users',
        method: RequestMethod.GET,
      },
      {
        path: 'users/**',
        method: RequestMethod.GET,
      },
    );

    consumer.apply(AdminMiddleware).forRoutes(
      {
        path: 'users',
        method: RequestMethod.GET,
      },
      {
        path: 'users/**',
        method: RequestMethod.GET,
      },
    );
  }
}
