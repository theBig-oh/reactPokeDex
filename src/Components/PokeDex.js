import React, { Component }  from 'react';





export default class PokeDex extends Component {
  constructor(props) {
    super();
    this.state = {
      gens:[],
      langs: [],
      rawDex: props.pDex.flavor_text_entries,
    }

  }
  setGenerations(props) {

    // There's no easy way to do this... 
    // Gotta map out each generation by their games cause the data doesn't include generation type. 

    const rawDex = this.state.rawDex;
    const gamegens = [
      {'gen':'generation-i',
        'games':[
            'red',
            'blue',
            'yellow'
          ]
        },
      {'gen':'generation-ii',
        'games':[
            'gold',
            'silver',
            'crystal'
          ]
        },
      {'gen':'generation-iii',
        'games':[
            'ruby',
            'sapphire',
            'emerald',
            'firered',
            'leafgreen'
          ]
        },
      {'gen':'generation-iv',
        'games':[
            'diamond',
            'pearl',
            'platinum',
            'heartgold',
            'soulsilver'

          ]
        },
      {'gen':'generation-v',
        'games':[
            'black',
            'white',
            'black-2',
            'white-2'
          ]
        },
      {'gen':'generation-vi',
        'games':[
            'x',
            'y',
            'alpha-sapphire',
            'omega-ruby'
          ]
        },
  ];
  
  const findGenGames = () => {
    const results = []; 

    rawDex.map((dexData,i) => {
      gamegens.map((gens,x) => {
        gens.games.map((game,z) => {
          if(game == dexData.version.name) {
            

            results[gens.gen] = gens.gen;
          }
        })
      })
    });
    return results
  };

  this.setState({
    gens: findGenGames()
  })


  }
  componentWillMount() {
    this.setGenerations(this.props.pDex.flavor_text_entries);
  }


  render() {
    const unsortedDex = this.state.rawDex;


    return (
        <div className='pokemon-dex'> 
          <div className='dex-title innerContainer'> 
            Dex entries
          </div>

        </div>
      )
  }
}