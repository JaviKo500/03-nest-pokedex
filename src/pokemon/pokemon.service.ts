import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { isValidObjectId, Model } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PokemonService {
  constructor(
    @InjectModel( Pokemon.name )
    private readonly pokemonModel: Model<Pokemon>,
  ) {
    
  }

  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLowerCase();
    try {
      const pokemon = await this.pokemonModel.create( createPokemonDto );
      return pokemon;
    } catch (error) {
      this.messageError( error );
    }
  }

  findAll() {
    return `This action returns all pokemon`;
  }

  async findOne(query: string) {
    let  pokemon: Pokemon;
    if ( !isNaN( +query ) ) {
      pokemon = await this.pokemonModel.findOne({
        no: query
      });
    }

    if ( !pokemon && isValidObjectId( query ) ) {
      pokemon = await this.pokemonModel.findById( query );
    } 
    
    if ( !pokemon ) {
      pokemon = await this.pokemonModel.findOne( {
        name: query.trim().toLowerCase()
      });
    }

    if ( !pokemon ) throw new NotFoundException( `pokemon whit query "${query}" not found` );
    return pokemon;
  }

  async update(query: string, updatePokemonDto: UpdatePokemonDto) {
    const pokemon = await this.findOne( query );
    try {
      if ( updatePokemonDto.name ) {
        updatePokemonDto.name = updatePokemonDto.name.toLowerCase();
      }
      await pokemon.updateOne( updatePokemonDto, { new: true });
      return { ...pokemon.toJSON(), ...updatePokemonDto };
    } catch (error) {
      this.messageError( error );
    }
  }

  async remove(id: string) {
    const pokemon = await this.findOne( id );
    await pokemon.deleteOne();
  }

  messageError = ( error: any ) => {
    if ( error.code === 11000 ) {
      throw new BadRequestException( `Pokemon exist in db ${ JSON.stringify( error?.keyValue ) }` );
    }
    throw new InternalServerErrorException( 'Can\'t create pokemon - check server logs')
  }
}
