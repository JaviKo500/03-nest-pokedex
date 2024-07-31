import { join } from 'path';

import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MongooseModule } from '@nestjs/mongoose';

import { PokemonModule } from './pokemon/pokemon.module';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { ConfigModule } from '@nestjs/config';
import { EnvConfiguration } from './config/env.config';
import { JoiValidationSchema } from './config/validation';


@Module({
  imports: [
    ConfigModule.forRoot({
      load: [
        EnvConfiguration
      ],
      validationSchema: JoiValidationSchema
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public')
    }),
    MongooseModule.forRoot(
      EnvConfiguration().mongoDb,
      {
        dbName: 'pokemonDb',
      }
    ),
    PokemonModule,
    CommonModule,
    SeedModule,
  ],
})
export class AppModule {}
