/*import '../css/style.scss';
import MakeElement from './Tools/MakeElement.js';





function RenderSite(){
  let body = document.querySelector('body');

  console.log(body);

  let makeEle = new MakeElement;

  let bodyContainer = makeEle.createEle('div','bodyContainer',[12,12,12,12],'bodyContain');  
      bodyContainer.innerHTML = `<div> Hey, Welcome to PureJS </div>`;

  
  body.append(bodyContainer);
}

RenderSite(); 
*/



import '../css/style.scss';
import React from "react";
import ReactDOM from "react-dom";
import {Link, Router, Route, Switch } from 'react-router-dom';
import Home from './Home';
import PokeFacts from './PokeFacts';
import GetPKMN   from './GetPKMN';

function makeBlock(x,y,size,velocity,direction) {
  this.x = x;
  this.y = y;
  this.size = size;
  this.velocity = velocity;
  this.direction = direction;
}

/* 
    GridBlocks

    

*/
class GridBlocks {
  constructor(count) {

    this.fps = 60;
    this.canvas = null;
    this.width = 10;
    this.height = 10;
    this.minSpeed = this.fps / 2;
    this.maxSpeed = this.fps - 2;
    this.blocks = count;
    this.interId = 0;
    
  }

  initialize(div) {
    const self = this;
    const canvas = document.createElement('canvas');

    this.containerDiv = div;
    
    self.width = window.innerWidth;
    self.height = window.innerHeight;
    
    window.addEventListener('resize', function resize(event) {
      self.width = window.innerWidth;
      self.height = window.innerHeight;
      self.canvas.width = self.width;
      self.canvas.height = self.height;
      self.draw();
    });

    div.appendChild(canvas);

    this.canvas = canvas;
    this.canvas.width = this.width;
    this.canvas.height = this.height;

  }
  
  start() {
    const self = this;
    const blocks = Array(this.blocks).fill(null);
  
    let newBlocks = [];

    blocks.map((block, i) => {
      if(i%2==0) {
        
        block = new makeBlock(this.width - (Math.random()*this.width/2),Math.random()*this.height,Math.random()*3+2,(Math.random()*(this.maxSpeed - this.minSpeed))+this.minSpeed,true);
      } else {
        block = new makeBlock(Math.random()*this.width/2,Math.random()*this.height,Math.random()*3+2,(Math.random()*(this.maxSpeed - this.minSpeed))+this.minSpeed,false);
      }
      newBlocks.push(block);
    });
    
    this.blocks = newBlocks;

    this.interId = setInterval(function() {
      self.update();
      self.draw();
      
    }, 1000/this.fps);
  }

  update() {
    let dTime = 1/this.fps;
    this.blocks.map( (block,i) => {
      let deltaAngle = Math.sin(Math.PI / (Math.random() * (2 - 0) + 0 ));

      if(block.direction) {
        block.x += dTime * block.velocity;

        if(block.x > this.width + 40) {
          
          this.blocks[i] = new makeBlock(this.width/2,Math.random()*this.height,Math.random()*3+1,(Math.random()*(this.maxSpeed - this.minSpeed))+this.minSpeed,true,deltaAngle);
        }
      } else {
        block.x -= dTime * block.velocity;
        if(block.x < -40) {
          this.blocks[i] = new makeBlock(this.width/2,Math.random()*this.height,Math.random()*3+1,(Math.random()*(this.maxSpeed - this.minSpeed))+this.minSpeed,false,deltaAngle);
       }
      }
    });
  }

  draw() {
    const ctx = this.canvas.getContext('2d');
    const blocks = this.blocks;

    ctx.clearRect(0,0,this.width,this.height);

    blocks.forEach((block, i )=> {
      ctx.strokeStyle = 'rgba(24,64,35,0.8)';
      ctx.lineWidth = 5;
      ctx.fillStyle= 'rgba(2,225,35,0.6)';

      ctx.fillRect(block.x,block.y,block.size*10,block.size*10);

    })
  }
}



function PokemonSelect(props) {
  const pkid = props.pokemon[1]+1;
  const pokem = 'pkmn/'+(pkid);

  

  return (
    
    <div className='pokemon-selection'> 
      <Link to={pokem} className='pokemon-select'>
        <h2> {props.pokemon[0].name} </h2>
        <div className='pokeImage'>

        </div>
  
      </Link>
      
    </div>
    
  )
}




class App extends React.Component {
  constructor() {
    super();

    this.state = {
      data: [],
      maxPKMN: [],
      hasLoaded: false,
    }
  }

  setStatePKMN() {
    const self = this; 
    const getPKMN = new GetPKMN;

    getPKMN.makeCall('pokemon','?limit=861','index').then((data) => {
      let pokeData = [];
      
      data.results.map((result,i) => {
        pokeData.push(result);
      });

      self.setState({
        data: pokeData,
        maxPKMN: pokeData.length,
      })

    })
  } 
  
  componentWillMount() {
    this.setStatePKMN();
  }

  componentDidMount() {
  let canvas = ReactDOM.findDOMNode(this.refs.gridcanvas);
 /* let mobileCanvas = ReactDOM.findDOMNode(this.refs.mobilegridcanvas);*/
  const gridfield = new GridBlocks(500);
  const mobilegrid = new GridBlocks(50);
  gridfield.initialize(canvas);
  gridfield.start();

/*  mobilegrid.initialize(mobileCanvas);
  mobilegrid.start();*/
  }
  render() { 
    const allpkmn = [];

    this.state.data.map( (pkmn, i) => {
      allpkmn.push(pkmn);
    })


/*  
  function to build out later. 

  Make a way to detect resize, and 
  re-render the gridboxes instead of having one side wait
  til it reaches the end to render more. 



  const isMobile = () => {
      if(window.innerWidth < 500) {
        return true
      }
      return false
    };


*/
    console.log(this.props);
    
    return (
      <div ref='gridcanvas' className='bodyContain'>
        <div className='content-wrapper'>
          <div className='top-layer'>  </div>
          <div className='body-content'> 
            <Switch>

          <Route exact path='/' render={
            (props) => (
              <Home pkmnList={allpkmn} />
            )
          }/>
          <Route exact path='/pkmn/:pkmnId' render={
            (props) => (
              <PokeFacts propped = {props} />
            )
          }/>


            </Switch>

          </div>
          <div className='bottom-layer'>  </div>
        </div>
        
      </div>
      )
  }
}

export default App;