import React, { Component }  from 'react';

function setGenerations(props) {

    // There's no easy way to do this... 
    // Gotta map out each generation by their games cause the data doesn't include generation type. 

    const rawDex = props;
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

  let gens = new findGenGames();

  console.log(gens);
  return gens

}



export default class PokeDex extends Component {
  constructor(props) {
    super(props);
    console.log(props);
  }
  render() {
    const gamegens = [
      {'gen':'generation-i',
        'games':[
            'red',
            'blue',
            'yellow'
          ],
          'collectedGames': [],
        },
      {'gen':'generation-ii',
        'games':[
            'gold',
            'silver',
            'crystal'
          ],
          'collectedGames': [],
        },
      {'gen':'generation-iii',
        'games':[
            'ruby',
            'sapphire',
            'emerald',
            'firered',
            'leafgreen'
          ],
          'collectedGames': [],
        },
      {'gen':'generation-iv',
        'games':[
            'diamond',
            'pearl',
            'platinum',
            'heartgold',
            'soulsilver'

          ],
          'collectedGames': [],
        },
      {'gen':'generation-v',
        'games':[
            'black',
            'white',
            'black-2',
            'white-2'
          ],
          'collectedGames': [],
        },
      {'gen':'generation-vi',
        'games':[
            'x',
            'y',
            'alpha-sapphire',
            'omega-ruby'
          ],
          'collectedGames': [],
        },

  ];    

  const findGenGames = () => {
    let results = [];
/*    this.props.pDex.map((dexEntry, i) => {
      let dexGenName = dexEntry.version.name;
      let isThere = false;

      console.log(dexGenName);
      gamegens.map((gens,z) => {
        gens.games.map((game,x)=> {
          if(game == dexGenName) {
            
          }
        })
      })
    })*/


    gamegens.map((generation,i) => {
      let isThere = false;
      let isEntry = false;
      let finalObject = {
        genname: generation.gen,
        dexData: [],
      }
      generation.games.map((game,x) => {
        this.props.pDex.map((dexEntry, a) => {
          if(dexEntry.version.name == game) {
            isThere = true
            finalObject.dexData.push(dexEntry);

          }
        })
      })
      if(isThere) {
        finalObject.genname = generation.gen,
        results.push(finalObject);
      }
      
    })

    console.log(results);

    return results
  }


  let renderedGens = this.props.pDex ? findGenGames() : [];

  console.log(renderedGens);

    return (
        <div className='pokemon-dex'> 
          {
            
          }
        </div>
      )
  }
}