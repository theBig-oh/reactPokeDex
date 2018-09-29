import React, { Component }  from 'react';

export default class PokeTypes extends Component {
  constructor() {
    super()
    
    this.setParentColor = this.setParentColor.bind(this);
  }

  setParentColor(clor) {
    this.props.pkColor(clor);
  }
  componentDidMount() {
    const mainType = () => {
      let mnType;
      console.log(this.props.pkmnTypes); 
      let proppedType = this.props.pkmnTypes.map((pkType,i) => {
        if(pkType.slot == 1) {
          console.log('this is the main type ');
          mnType = pkType.type.name;
        }
      });
      return mnType; 
    }

    console.log(mainType());

    console.log(this.props);

    this.setParentColor(mainType());
  
  }
  render() {
    const types = this.props.pkmnTypes.map((pkType,i) => {
      if(pkType.slot == 1) {
        console.log('this is the main type '+ pkType.type.name);

      } 
      return (
         <div key={i} className={`type_${pkType.type.name} slot_${pkType.slot}`}>
            {pkType.type.name}
          </div>
        )
    })
    return (
      <div className='pokemon-type-container'>
        {types}
      </div>
    )
  }
}