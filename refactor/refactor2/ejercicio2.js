const params = [{
  name: 'Address1',
  country: 'Spain',
  city: 'Barcelona',
  street: 'Diagonal',
  number: '605'
},
{

  country: 'Italy',
  city: 'Rome',
  street: '',
  number: '',
  name: 'Address5'
},
{
  name: 'Address2',
  country: 'Spain',
  city: 'Madrid',
  street: '',
  number: ''
},
{
  name: 'Address3',
  country: '',
  city: undefined,
  street: 'Gran Via',
  number: '10'
},
{
  name: 'Address4',
  country: 'Spain',
  city: 'Murcia',
  street: 'Alfonso X',
  number: '11'
},
{
  name: 'Address5',
  country: 'Italy',
  city: 'Rome',
  street: '',
  number: ''
},
{
  name: 'Address6',
  country: '',
  city: null,
  street: '',
  number: '5'
},
{ 
  country: '',
  city: '',
  name: 'Address3',
  street: 'Gran Via',
  number: '10'
}]



class Analisis {
  constructor (array) {
    this.array = array;
  }

  // número de direcciones con al menos una propiedad vacía

  empty () {
    let emptyAddressNumber = 0;
    this.array.forEach((obj) => {
      const emptyValues = [];
      let keys = Object.keys(obj);
      keys.forEach((key) => {
          let objectValue = obj[key];
          if (!objectValue) { emptyValues.push(key); }
      })
      if (emptyValues.length != 0) { emptyAddressNumber++ }
    })
    return emptyAddressNumber;
  }

  emptyRefactored () {
    const emptyValues = this.array.filter( obj => {
      const keys = Object.keys(obj);
      const emptyKeys = keys.filter( key  => { return !obj[key]; })
      return emptyKeys.length !== 0;
    })
    return emptyValues.length;
  }

  //devolver array quitando los objetos repetidos
 
  noRepeat () {
    this.array.forEach ( obj => {
      const keys = Object.keys(obj);
      const objectValues = keys.map( key => { return obj[key]; });
      for(let i = this.array.length - 1; i > this.array.indexOf(obj); i--) {
        let objLoop = this.array[i];
        const keysLoop = Object.keys(objLoop);
        const valuesLoop = keysLoop.map( keyLoop => { return objLoop[keyLoop] })
        if ( valuesLoop.sort().join('') === objectValues.sort().join('') ) { this.array.splice( i, 1); }
      }
    })
    return this.array;
  }

  // ordenar asd o des según una propiedad

  onePropertyOrder (property, order) {
    const emptyProperties = [];
    const orderedProperties = [];
    this.array.forEach((obj) => {
      if (obj[property]) {
        orderedProperties.push(obj);
      }
      else {
        emptyProperties.push(obj);
      }
    })
    if (emptyProperties.length !== 0) console.log(`Los siguientes elementos no han podido ser ordenados por tener valor "null", "undefined" o estar vacíos: ${emptyProperties}`);
    let sortingFunction = null;
    if (property === 'number') sortingFunction = (a,b) => { return Number(a[property]) - Number(b[property]); }
    else {
      sortingFunction = (a,b) => {
        if (a[property] < b[property]) {
          return -1;
        }
        return 0;
      }
    }
    orderedProperties.sort(sortingFunction);
    if (order === 'des') orderedProperties.reverse();
    return orderedProperties;

  }

  onePropertyOrderRefactored (property, order) {
    const orderedProperties = this.array.filter( obj => { return obj[property]; })

    let sortingFunction = null;
    if (property === 'number') { sortingFunction = (a,b) => { return Number(a[property]) - Number(b[property]); } }
    else { sortingFunction = (a,b) => { if (a[property] < b[property]) { return -1} return 0; } }
    
    if (order === 'des') { return orderedProperties.sort(sortingFunction).reverse(); }
    else { return orderedProperties.sort(sortingFunction); }
  }

  //filtrar direcciones por una o más propiedades

  filterByProperties (...props) {
    let helperArray = [];
    const coincidences = [];
    this.array.forEach((obj) => {
      let keys = Object.keys(obj);
      helperArray = [];
      keys.forEach((key) => {
        let value = obj[key];
        props.forEach((item) => {
          if (value){
            if (value.toLowerCase() === item.toLowerCase()) {
              helperArray.push(value);
              if (helperArray.length === props.length) {
                coincidences.push(obj);
              }
            }
          } 
        })
      })   
    })
    return coincidences;
  }

  filterByPropertiesRefactored (...props) {
    const coincidences = this.array.filter( obj => {
      const keys = Object.keys(obj);
      const matches = keys.filter( key => {
        if(obj[key]) {
          const lowerCaseProps = props.map( item => { return item.toLowerCase(); })
          return lowerCaseProps.includes(obj[key].toLowerCase());
        } 
      })
      return matches.length === props.length;
    })
    return coincidences;
  }


  //-------
  //funcion para ayudar a ordenar los números

  orderedNumbers () {
    const defined = this.array.filter( obj => { return obj['number'] });
    return defined.sort((a,b) => { return Number(b['number']) - Number(a['number']); });
  }

  //--------

  
  //devuelve dirección con el número más alto

  highest () {
    const defined = [];
    this.array.forEach((obj) => { if (obj['number']) { defined.push(obj); } })
    defined.sort((a,b) => { return Number(b['number']) - Number(a['number']); })
    return defined[0];
  }

  highestRefactored () {
    return this.orderedNumbers()[0];
  }

  //devuelve dirección con el número más bajo

  lowest () {
    const defined = [];
    this.array.forEach((obj) => { if (obj['number']) { defined.push(obj); } })
    defined.sort((a,b) => { return Number(a['number']) - Number(b['number']); })
    return defined[0];
  }

  lowestRefactored () {
    return this.orderedNumbers().reverse()[0];
  }

  //coincidencias dada una o más propiedades

  coincidencesByProperties (...props) {
    return this.filterByProperties(...props).length;
  }
}


const anal = new Analisis(params);

console.log(anal.noRepeat());




