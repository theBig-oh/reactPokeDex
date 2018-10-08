import React, { Component }  from 'react';


export default class PokeDex extends Component {
  constructor(props) {
    super(props);
    console.log(props);

    this.state = {
      currentDex: 0,
    }
    this.changeGen = this.changeGen.bind(this);
  }

  changeGen(event) {
    this.setState({
      currentDex: event,
    })
  }
  render() {

    // Need to refactor this 
    // to make it more modular 
    // by design

    const gamegens = [
      {'gen':'generation-i',
        'displayGen': 'I',
        'games':[
            'red',
            'blue',
            'yellow'
          ],
          'collectedGames': [],
        },
      {'gen':'generation-ii',
        'displayGen': 'II',
        'games':[
            'gold',
            'silver',
            'crystal'
          ],
          'collectedGames': [],
        },
      {'gen':'generation-iii',
        'displayGen': 'III',
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
        'displayGen': 'IV',
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
        'displayGen': 'V',
        'games':[
            'black',
            'white',
            'black-2',
            'white-2'
          ],
          'collectedGames': [],
        },
      {'gen':'generation-vi',
        'displayGen': 'VI',
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
    gamegens.map((generation,i) => {
      let isThere = false;            // Filters the unsorted pokemon dex entries into
      let finalObject = {             // objects sorted by generations. 
        genname: generation.gen,
        dexData: [],
        displaygen: generation.displayGen,
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
        results.push(finalObject);
      }
      
    })

    console.log(results);

    return results
  }


  let genObjects = this.props.pDex ? findGenGames() : [];

  console.log(genObjects);

  let shownGens = genObjects.map((gen,i) => {
    let activeClass = 'not-active';
    if(i == this.state.currentDex) {
      activeClass = 'active-gen';
    }
    return (
      <div className={`${gen.genname}  ${activeClass} generations innerContainer`} key={i} onClick={(event) => {this.changeGen(i)}} > {gen.displaygen} </div>
    )
  })


    return (
        <div className='pokemon-dex'> 
          <div className='gen-selection-container'> 
            <div className ='gen-title innerContainer'> 
              PokeDex Entries appear in Generation... 
            </div>
            <div className='gen-display'> 
              { shownGens }
            </div>          
          </div> 
        </div>
      )
  }
}