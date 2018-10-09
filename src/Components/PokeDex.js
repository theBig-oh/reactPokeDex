import React, { Component }  from 'react';


export default class PokeDex extends Component {
  constructor(props) {
    super(props);
    console.log(props);

    this.state = {
      currentDex: 0,
      currentLang: 'en',
    }
    this.changeGen = this.changeGen.bind(this);
    this.changeLang = this.changeLang.bind(this);
  }
  changeLang(lang) {
    this.setState({
      currentLang: lang,
    })
  }
  changeGen(event) {
    this.setState({
      currentDex: event,
      currentLang: 'en'
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

  const langs = [
      {'code':'en','lang':'English',},
      {'code':'ja','lang':'Japanese',},
      {'code':'roomaji','lang':'Romaji',},
      {'code':'ko','lang':'Korean',},
      {'code':'zh','lang':'Chinese',},
      {'code':'fr','lang':'French',},
      {'code':'de','lang':'German',},
      {'code':'es','lang':'Spanish',},
      {'code':'it','lang':'Italian',},
      {'code':'cs','lang':'Czech',},
      {'code':'ja-kanji','lang':'Kanji',},
      {'code':'ja-Hrkt','lang':'Hirgana/Katakana',}

    ];

  const findGenGames = () => {
    let results = [];
    gamegens.map((generation,i) => {
      let isThere = false;
      let isReady = false;            // Filters the unsorted pokemon dex entries into
      let finalObject = {             // objects sorted by generations. 
        genname: generation.gen,
        dexData: [],
        displaygen: generation.displayGen,
        genLangs: [],
      }
      let rawLanguages = [];
      generation.games.map((game,x) => {       
        this.props.pDex.map((dexEntry, a) => {
          if(dexEntry.version.name == game) {
            isThere = true;
            finalObject.dexData.push(dexEntry);
            rawLanguages.push(dexEntry.language.name);
          }
        })
      })
/*        finalObject.genLangs = new Set(rawLanguages);*/ // Could use this, but wanted to do it through a method that 
        
        let getLangs = (rawLanguages) => rawLanguages.filter((o,k) => rawLanguages.indexOf(o)==k); 
        finalObject.genLangs = getLangs(rawLanguages);
        console.log(getLangs(rawLanguages)); 
      if(isThere) {
        results.push(finalObject);
      }
      
    })

    console.log(results);

    return results
  }


  let genObjects = this.props.pDex ? findGenGames() : [];

  console.log(genObjects);
  /* 

    User can now pick which generation they can view 

  */
  let shownGens = genObjects.map((gen,i) => { 
    let activeClass = 'not-active';
    if(i == this.state.currentDex) {
      activeClass = 'active-gen';
    }
    return (
      <div className={`${gen.genname} ${activeClass} generations innerContainer`} key={i} onClick={(event) => {this.changeGen(i)}} > {gen.displaygen} </div>
    )
  })

  let shownLangs = genObjects[this.state.currentDex].genLangs.map((lang,i) => {
    for(let x=0;x<langs.length;x++) { // Weird... langs.map wasn't working so had to do a for loop. Need to look into this. 
      if(langs[x].code == lang.toString()) {
        let activeClass = 'not-active';
        if(lang.toString() == this.state.currentLang) {
          activeClass = 'active-lang';
        }
        return (
          <div className={`${activeClass} language innerContainer`} key={i} onClick={(event) => {this.changeLang(lang)}}> {langs[x].lang} </div> 
        )
      }
    }
  });

  let shownDex = genObjects[this.state.currentDex].dexData.map((dex,i) => {
    if(dex.language.name == this.state.currentLang) {
      return (
        <div key={i} className='dex-entry innerContainer'> 
          <div className='dex-content'> {dex.flavor_text} </div>

          <div className='dex-game'> <span className='pokeTitle'>Pokemon</span> <span className='poke-version'>{dex.version.name}</span> </div>
        </div>
      )
    }
  })
    return (
        <div className='pokemon-dex'> 
          <div className='gen-selection-container dex-containers'> 
            <div className ='gen-title innerContainer'> 
              PokeDex Entries appear in Generation... 
            </div>
            <div className='gen-display dynamic-display'> 
              { shownGens }
            </div>          
          </div> 
          <div className='gen-lang-container dex-containers'>
            <div className='gen-title innerContainer'>
              Available in these languages.
            </div>
            <div className='lang-display dynamic-display'>
              {shownLangs}
            </div>
          </div>
          <div className='entry-container'> 
            {shownDex}

          </div>
        </div>
      )
  }
}