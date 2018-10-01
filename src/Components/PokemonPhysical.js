import React, { Component }  from 'react';

function PkHeight(pkHeight) {
  let raw = pkHeight.pkHeight;

  const metricHeight = () => {
    let tens = (raw/10) + ' m';
    return tens
  }

  const imperialHeight = () => {
    let rawHeight = raw / 10;
    let rawInches = Math.round(rawHeight * 39.370 );
    let feet = Math.floor((rawInches/12));
    let convertInches =   rawInches - (feet * 12) ;

    let returnResults = <div className='convertHeight'>
                          <div className='feet'>
                            {feet} ft
                          </div>
                          <div className='inches'>

                          {convertInches} in.

                          </div>
                      </div>;

    return returnResults
  }
  return (
    <div className='pokemonHeight'>
      <div className='metric height'>
        <div className='metricName heightName'> Metric: </div>
        <div className='metricTotal heightTotal'> {metricHeight()} </div> 
      </div>
      <div className='imperial height'>
        <div className='imperialName heightName'> Imperial: </div>
        <div className='imperialTotal heightTotal'> {imperialHeight()} </div> 
      </div>


    </div>
    )
}


function PkWeight(pkWeight) {
  let raw = pkWeight.pkWeight / 10;

  const metricWeight = () => {
    let tens = raw + '  kg';
    return tens;
  }

  const imperialWeight = () => {
    let returnResults = ((raw * 2.20462).toFixed(1)) + '  lbs';
    return returnResults
  }


  return (
    <div className='pokemonWeight'>
      <div className='metric Weight'>
        <div className='metricName WeightName'> Metric: </div>
        <div className='metricTotal WeightTotal'> {metricWeight()} </div> 
      </div>
      <div className='imperial Weight'>
        <div className='imperialName WeightName'> Imperial: </div>
        <div className='imperialTotal WeightTotal'> {imperialWeight()} </div> 
      </div>


    </div>

    )
}


function PkHabitat(pkHabitat) {

  return (
    <div className='pokemonHabitat'> 
      <div className='habitatName'>
        {pkHabitat.pkHabitat.name}
      </div>
      <div className={`habitatImage ${pkHabitat.pkHabitat.name}`}>

      </div>


    </div>

    )
}


export default class PokemonPhysical extends Component {
  constructor() {
    super();

  }

  render() {
    const pkColor = this.props.pkColors;
    const height = this.props.pokeInfo.height;
    const weight = this.props.pokeInfo.weight;
    const habitat = this.props.pokeInf.habitat;
    console.log(habitat);
    return (
        <div className={`pokemon-physical ${pkColor}`}> 
          <div className='pokemon-height innerContainer'>
            <div className='pkmn-phys-title innerTitle'>
              Height
            </div>
            <PkHeight pkHeight={height}/>
          </div>

          <div className='pokemon-weight innerContainer'>
            <div className='pkmn-phys-title innerTitle'>
              Weight
            </div>
            <PkWeight pkWeight={weight} />
          </div> 

          <div className='pokemon-habitat innerContainer'>
            <div className='pkmn-phys-title innerTitle'>
              Habitat
            </div>
            <div className='pkmn-habitat'>
              <PkHabitat pkHabitat={habitat} />

            </div>
          </div>
          <div className='pokemon-region innerContainer'>
            <div className='pkmn-phys-title innerTitle'>
              Abilities
            </div>

          </div>
          <div className='pokemon-stats innerContainer'>
            <div className='pkmn-phys-title innerTitle'>
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