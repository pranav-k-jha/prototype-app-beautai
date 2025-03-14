import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { BusinessesModule } from './modules/businesses/businesses.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UsersModule } from './modules/users/users.module';
import { DataSource } from 'typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { AppService } from './app.service';
import { ServicesModule } from './modules/services/services.module';
import { ConfigService } from '@nestjs/config';
import { PreferencesModule } from './modules/preferences/preferences.module';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      validationSchema: Joi.object({
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.number().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_DATABASE: Joi.string().required(),
        GRAPHQL_SCHEMA_PATH: Joi.string().required(),
      }),
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: parseInt(configService.get('DB_PORT'), 10),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database:
          configService.get('NODE_ENV') === 'test'
            ? configService.get('TEST_DB_DATABASE')
            : configService.get('DB_DATABASE'),
        entities: [__dirname + '/modules/**/*.entity.{js,ts}'],
        migrations: [
          /*...*/
        ],
        synchronize: true,
        autoLoadEntities: true,
      }),
      inject: [ConfigService], // Inject ConfigService to access environment variables
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), process.env.GRAPHQL_SCHEMA_PATH),
    }),
    BusinessesModule,
    ServicesModule,
    UsersModule,
    AuthModule,
    PreferencesModule,
    ServicesModule,
  ],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
