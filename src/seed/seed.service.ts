import { Injectable } from '@nestjs/common';
import { PokeResponse } from './interfaces/poke-response.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';

@Injectable()
export class SeedService {

  constructor(
    @InjectModel( Pokemon.name )
    private readonly pokemonModel: Model<Pokemon>,
    private readonly axiosAdapter: AxiosAdapter,
  ) {
    
  }


  async executeSeed() {
    await this.pokemonModel.deleteMany({});
    const data = await  this.axiosAdapter.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=650');
    // const insertPromisesArray = [];
    const pokemonsToInsert: { name: string, no: number } []= []
    data.results.forEach( ( { name, url } ) => {
      const segments = url.split('/');
      const no = +segments[ segments.length - 2 ];
      pokemonsToInsert.push({ name, no });
      // insertPromisesArray.push( this.pokemonModel.create({ name: name, no}) );
      // await this.pokemonModel.create({ name: name, no});
    });
    await this.pokemonModel.insertMany( pokemonsToInsert );
    // await Promise.all(insertPromisesArray);; 
    return 'seed executed';
  }
}
