import React, { Component } from 'react';
import { Link, Router} from 'react-router-dom';
import Pagination from "react-js-pagination";

function Pokemon(props){
  
  const pkid = props.pokemon[1]+1;
  const pokem = '/pkmn/'+(pkid);

  /*
    The style below retrieves the sprites from the pokeAPI github, thankfully they're all under 1kb.

  */


  let style = {
    background:'url(https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'+pkid+'.png)no-repeat',
    backgroundSize:'100%',
    height:'10vh',
    
    backgroundPosition:'center',
    
  }
  let mobileStyle = {
    background:'url(https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'+pkid+'.png)no-repeat 10px/100%',
    
    height:'6vh',
    
    backgroundPosition:'center',
    
  }
  

  return (
      <div id='' className='pokemon-selection '>
          <Link   to={pokem}  id='' className='poke-name '>
            <p className='pokemon-selection-name'>{props.pokemon[0].name}</p>

            <div id=''className='hidden-xs hidden-sm col-md-3 col-lg-3 'style={style}></div>
            <div id=''className='col-xs-3 col-sm-3 hidden-md hidden-lg 'style={mobileStyle}></div>
          </Link>


      </div>


    )
}




class Home extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      pkmnList: [],
      totalPKMN: props.pkmnList.length,
      currentPage: 1,
      pkmnPerPage: 12,
      mobilePKMNPerPage: 6,
      currentShownPKMN: [],
      mobileShownPKMN: [],
      currentBase: 0,
      mobileBase: 0,


    }
    
    this.pokeCollect = this.pokeCollect.bind(this);
    this.setStatePKMN = this.setStatePKMN.bind(this);
    this.handlePokeClick = this.handlePokeClick.bind(this);
  }
  

  setStatePKMN(props) {
    console.log('This is from setStatePKMN()');
    
    
  }

   

  pokeCollect(deskStartPKMN, mobileStartPKMN) {
    console.log('this is on pokeCollect()');

    const allpkmn = this.props.pkmnList;
    const collect = this.state.currentShownPKMN;
    const mobileCollect = this.state.mobileShownPKMN;
    const end = deskStartPKMN + this.state.pkmnPerPage; 
    const mobileEnd = mobileStartPKMN + this.state.mobilePKMNPerPage;
    const self = this;


      for(var i = deskStartPKMN; i < deskStartPKMN + this.state.pkmnPerPage; i++){
        if(allpkmn[i] == null){
          console.log('Intial Value was Null, retrying...');
        } else {
          collect.push([allpkmn[i], i]);
          

        }
      }
      for(var x=mobileStartPKMN; x < mobileStartPKMN + this.state.mobilePKMNPerPage; x++){
        if(allpkmn[x] == null){
          console.log('Mobile Initial Value was null, retrying...');
        } else {
          mobileCollect.push([allpkmn[x],x]);
        }
      }
    
  }


  handlePokeClick(prop){
    console.log(event);
    console.log(prop);

    this.setState({
      currentPage: prop,
      mobilePage: prop,
      currentBase: (prop - 1) * this.state.pkmnPerPage,
      mobileBase: (prop - 1) * this.state.mobilePKMNPerPage,
      currentShownPKMN: [],
      mobileShownPKMN: [],
    });
  }



  componentDidUpdate() {
    console.log('this is from componentDidUpdate()');
    console.log(this.props);

    this.state.pkmnList = this.props.pkmnList;
    this.state.totalPKMN = this.props.pkmnList.length;
       
  }
  componentDidMount() {
    console.log('this is from componentDidMount()');  
  }
  
  render() {
    console.log('this is on render()');
    
    const self = this;
    



    this.pokeCollect(this.state.currentBase,this.state.mobileBase); 
    let currentPKMN = this.state.currentShownPKMN;
    let mobilePKMN = this.state.mobileShownPKMN;
    let currentBases = [
                        this.state.currentBase,
                        this.state.mobileBase,
                      ];
    let currentPages = [
                        this.state.currentPage,
                        this.state.mobilePage,
                      ];


    return (
      <div className='home-screen app-body-content'>
        <div className='desktop-screen'>
          {
            currentPKMN.map((pkmn,id) => {
              return <Pokemon key={id} pokemon={pkmn} />
            })
          }
        </div>
        <div className={'mobile-screen'}>
        


        </div>
        <div className='page-button-container'>
        {/*  <PokePages bases={currentBases} pages={currentPages} />*/}

          <Pagination bsClass='poke-select col-xs-12 col-sm-12 col-md-12 col-lg-12'
            totalItemsCount={this.props.pkmnList.length}
            activePage={this.state.currentPage}
            onChange={this.handlePokeClick}
            itemsCountPerPage={12}
            pageRangeDisplayed={1}
            hideFirstLastPages={true}
          />        
        </div>
      </div>
    )
  }
}

export default Home;