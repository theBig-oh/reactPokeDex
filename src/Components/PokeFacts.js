import React, { Component }  from 'react';
import { Link } from 'react-router-dom';
import GetPKMN from './GetPKMN';
import PokeTypes from './PokeTypes';
import PokemonPhysical from './PokemonPhysical';
import PokeDex from './PokeDex';


export default class PokeFacts extends Component {
  constructor() {
    super();
    this.state = {
      pokemonStats: {},
      pokemonDex: {},
      currentInfo: 1,
      hasLoaded: 0,
      pokemonColor: null,
    }
    this.setPokemonFacts = this.setPokemonFacts.bind(this);
    this.setPokemonColors = this.setPokemonColors.bind(this);
  }

  setPokemonFacts() {
    const pokeID = this.props.propped.match.params.pkmnId;
    const pokeApis = ['pokemon','pokemon-species'];
    const getPKMN = new GetPKMN;
    const getPoke = new GetPKMN;

     
    getPoke.makeCall(pokeApis[0],pokeID,pokeApis[0]).then((data) => {
      return data;
    }).then(data => {
      let loadState = this.state.hasLoaded + 1;
      this.setState({
        pokemonStats: data,
        hasLoaded: loadState,
      })
    })
    getPKMN.makeCall(pokeApis[1],pokeID,pokeApis[1]).then((datar) => {
      return datar;
    }).then(datar => {
      let loadState = this.state.hasLoaded + 1;
      this.setState({ 
        pokemonDex: datar,
        hasLoaded: loadState,
      })
    })


  }

  setPokemonColors(pkmnColor) {
    const colorType = 'pkmn_'+pkmnColor;
    this.setState({
      pokemonColor: colorType
    });
  }

  componentWillMount() {
    this.setPokemonFacts();
  }
  componentDidMount() {
    this.setPokemonFacts();
  }
  render() {

    const mainPkmnImage = {
          background:'url(https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other-sprites/official-artwork/'+this.props.propped.match.params.pkmnId+'.png)no-repeat',
          backgroundSize:'100% 100%',
          backgroundPosition:'center',
        };
    const pokemonColor = this.state.pokemonColor;
    const pokemonInfo = [this.state.pokemonDex, this.state.pokemonStats];
    const loadingScreen = <div className='loading-screen'> 
                              <div className='loading-text'>
                                Loading
                              </div>
                              <div className='loading-dots'>
                              ...
                              </div>

                          </div>;

    const pokemonContent = [<PokemonPhysical pkColors={pokemonColor} pokeInfo={pokemonInfo[1]} pokeInf = {pokemonInfo[0]}/>, <PokeDex pDex={pokemonInfo[0]}/> ]

    const loadedContent =  <div className='loaded-content'>
                              <div className={`pokemon-container ${pokemonColor} `}> 
                                <div className='pokemon-image-nav-container baseContainer'>
                                  <div className='pokemon-image-container innerContainer'>
                                    <div className={`pokemon-image `} style={mainPkmnImage}>

                                    </div>
                                  </div>

                                  <div className='pokemon-name-container'>
                                    <div className='pokemon-name'>
                                      {pokemonInfo[0].name}
                                    </div> 
                                    <div className='pokemon-id'>
                                      Dex #{pokemonInfo[0].id}
                                    </div>
                                    <div className='pokemon-types-container'>
                                      <div className='typeText'>
                                        Type: 
                                      </div>
                                      <PokeTypes pkmnTypes={pokemonInfo[1].types} pkColor={this.setPokemonColors}/>
                                    </div>
                                  </div>

                                  <div className='pokemon-content-nav'>


                                  </div>
                                </div>

                                <div className='pokemon-content-container baseContainer'>

                                  {pokemonContent[this.state.currentInfo]}

                                </div>

                              </div>

                              <div className='linkContainer'>
                                <Link to='/' className='go-back-link' >

                                  {`< Go back`}
                                </Link>

                              </div>
                            </div>; 


    const hasLoaded = () => {
      let loadedState = this.state.hasLoaded == 4 ? loadedContent : loadingScreen;
      return loadedState
    }

    return (
        <div className='poke-facts'> 
            {hasLoaded()}
        </div>
      )
  }
}