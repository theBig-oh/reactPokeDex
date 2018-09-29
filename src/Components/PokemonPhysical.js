import React, { Component }  from 'react';


export default class PokemonPhysical extends Component {
  constructor() {
    super();

  }

  render() {
    const pkColor = this.props.pkColors;
    console.log(pkColor);
    return (
        <div className={`pokemon-physical ${pkColor}`}> 
          <div className='pokemon-height'>
            <div className='pkmn-phys-title'>
              Height
            </div>
          </div>

          <div className='pokemon-weight'>
            <div className='pkmn-phys-title'>
              Weight
            </div>

          </div> 

          <div className='pokemon-region'>
            <div className='pkmn-phys-title'>
              Habitat
            </div>

          </div>
          <div className='pokemon-region'>
            <div className='pkmn-phys-title'>
              Abilities
            </div>

          </div>
          <div className='pokemon-stats'>
            <div className='pkmn-phys-title'>
              Stats Attributes 
            </div>                                      
            <div className='pokemon-stats-baseLvl'>
                {/* Add Stats in bar format then EV int at the end with a "+" sign */}
            </div>


          </div>

        </div>

    )
  }

}