import React, { Component }  from 'react';



export default class PokeTypes extends Component {
  constructor() {
    super()

    this.setParentColor = this.setParentColor.bind(this);

  }

  setParentColor(clor) {
    if(clor != undefined) {
      console.log('this is in setParentColor, and is not undefined');
      this.props.pkColor(clor);
    }
    console.log(clor);
  }
  componentDidMount() {
    const mainType = () => {
      let mnType;
      console.log(this.props.pkmnTypes); 
      let proppedType = this.props.pkmnTypes ? this.props.pkmnTypes.forEach((pkType,i) => {
        if(pkType.slot == 1 && pkType.type.name != undefined) {
          console.log('this is the main type ');
          mnType = pkType.type.name;
        }
      }) : 'not ready';
      return mnType; 
    }
    this.setParentColor(mainType());

  }
  componentDidUpdate(prevState,prevProps) {
    if(this.props.pkTypes == null) {
      this.setParentColor(this.props.pkTypes);
    }
  }
  render() {

    if(this.props.pkmnTypes === undefined) {
      console.log('this is undefined here');
      return (
        <div className='pokemon-type-container'>
          Not loaded yet
        </div>
      )
    } else {
      
       let typed = this.props.pkmnTypes.map((pkType,i) => {
          return (
             <div key={i}  className={`type_${pkType.type.name} slot_${pkType.slot}`}>
                {pkType.type.name}
              </div>
            )
        })
      return (
        <div className='pokemon-type-container'>
          {typed}
        </div>
      )
    }

  }
}



/*

export default class PokeTypes extends Component {

  state = {};


  static getDerivedStateFromProps(nextProps, prevState) {
    if(prevState.prevPro != nextProps.pkTypes) {
      return {
        prevPro: nextProps.pkTypes,
        mainPkType: null,
      }
    }

    return nextProps
      

  }

  componentDidMount() {
    console.log('This is from componentDidMount() in pkTypes');


    this.getMainType(this.props.pkTypes);

  }
  componentDidUpdate(prevProps, prevState) {

  }
  render() {
    let types = () => {
      if(this.state.pkmnTypes === undefined) {
        console.log('not loaded yet');
        return <div className='loadingTypes'> Loading... </div>
      } else {
       let typed = this.state.pkmnTypes.map((pkType,i) => {
          return (
             <div key={i} className={`type_${pkType.type.name} slot_${pkType.slot}`}>
                {pkType.type.name}
              </div>
            )
        })
        return typed
      }
    }; 



    return (
      <div className='pokemon-type-container'>
        {types()}
      </div>
    )
  
  }

  getMainType(types) {
    console.log(types);

  }
}*/