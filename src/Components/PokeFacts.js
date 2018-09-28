import React, { Component }  from 'react';
import { Link } from 'react-router-dom';
import GetPKMN from './GetPKMN';


export default class PokeFacts extends Component {
  constructor() {
    super();
    this.state = {
      pokemonStats: {},
      pokemonDex: {},
      currentInfo: 0,
      hasLoaded: false,
    }
    this.setPokemonFacts = this.setPokemonFacts.bind(this);
  }

  setPokemonFacts() {
    const pokeID = this.props.propped.match.params.pkmnId;
    const pokeApis = ['pokemon','pokemon-species'];
    const getPKMN = new GetPKMN;
    
    getPKMN.makeCall(pokeApis[0],pokeID,pokeApis[0]).then((data) => {
      this.setState({
        pokemonStats: data,
        currentPKMN: pokeID
      })
    })
    getPKMN.makeCall(pokeApis[1],pokeID,pokeApis[0]).then((data) => {
      this.setState({
        pokemonDex: data,
        hasLoaded: true,
      })
    })

  }

  componentDidMount() {
    this.setPokemonFacts();
  }
  render() {

    const loadingScreen = <div className='loading-screen'> 
                              <div className='loading-text'>
                                Loading
                              </div>
                              <div className='loading-dots'>
                              ...
                              </div>

                          </div>;


    const loadedContent =  <div className='loaded-content'>
                              <div className='pokemon-container'> 
                                <div className='pokemon-image-nav-container'>
                                  <div className='pokemon-image-container'>

                                  </div>

                                  <div className='pokemon-name-container'>
                         
                                  </div>

                                </div>

                                <div className='pokemon-content-container'>


                                </div>

                              </div>

                              <div className='linkContainer'>
                                <Link to='/' className='go-back-link' >

                                  {`< Go back`}
                                </Link>

                              </div>
                            </div>; 


    const hasLoaded = () => {
      let loadedState = this.state.hasLoaded ? loadedContent : loadingScreen;
      return loadedState
    }

    console.log(hasLoaded());
    return (
        <div className='poke-facts'> 
            {hasLoaded()}
        </div>
      )
  }
}