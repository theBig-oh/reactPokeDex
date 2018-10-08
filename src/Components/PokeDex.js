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
/*    langs.map((lan,x) => {
      console.log(lan.code);
      console.log(lang);
      if(lan.code == lang.toString()) {
        return (
          <div className={` language innerContainer`} key={i} onClick={(event) => {this.changeLang(lang)}}> {lan.lang} </div> 
        )
      } else {
        console.log('not found');
      }
    })*/

    for(let x=0;x<langs.length;x++) {
      if(langs[x].code == lang.toString()) {

        return (
          <div className={` language innerContainer`} key={i} onClick={(event) => {this.changeLang(lang)}}> {langs[x].lang} </div> 
        )
      }
    }
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
          <div className='gen-lang-container'>
            <div className='gen-title innerContainer'>
              Available in these languages.
            </div>
            <div className='lang-display'>
              {shownLangs}
            </div>
          </div>

        </div>
      )
  }
}