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

  //devolver array quitando los valores repetidos

  

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

  //filtrar direcciones por una o más propiedades

  filterByProperties (...props) {
    let helperArray = [];
    const coincidences = [];
    prueba.forEach((obj) => {
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

  //devuelve dirección con el número más alto

  highest () {
    const defined = [];
    this.array.forEach((obj) => { if (obj['number']) { defined.push(obj); } })
    defined.sort((a,b) => { return Number(b['number']) - Number(a['number']); })
    return defined[0];
  }

  //devuelve dirección con el número más bajo

  lowest () {
    const defined = [];
    this.array.forEach((obj) => { if (obj['number']) { defined.push(obj); } })
    defined.sort((a,b) => { return Number(a['number']) - Number(b['number']); })
    return defined[0];
  }

  //coincidencias dada una o más propiedades

  coincidencesByProperties (...props) {
    return this.filterByProperties(...props).length;
  }
}


