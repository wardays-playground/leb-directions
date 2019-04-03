var paramsTry = [{
        name: 'Address1',
        country: 'Spain',
        city: 'Barcelona',
        street: 'Diagonal',
        number: '605'
    },
    {
        name: 'Address2',
        country: 'Spain',
        city: 'Barcelona',
        street: '',
        number: ''
    },
    {
        name: 'Address3',
        country: '',
        city: '',
        street: 'Diagonal',
        number: '605'
    },
    {
        name: 'Address4',
        country: 'Japan',
        city: null,
        street: 'Diagonal',
        number: '605'
    }];

const addressDisplayer = (array) => {
    const lackingPropertiesMessage = "No se puede mostrar la dirección debido a que faltan las siguientes propiedades:";
    array.forEach( obj => {
        const keys = Object.keys(obj);
        const lackingProperties = keys.filter( key => { return !obj[key]});

        if (((lackingProperties.includes('city')) || (lackingProperties.includes('country'))) && ((lackingProperties.length === 1) || (lackingProperties.length === 0))) {
            console.log(`${obj['name']}: ${obj['street']} ${obj['number']}`);
        }
        else if (((lackingProperties.includes('street')) || (lackingProperties.includes('number'))) && ((lackingProperties.length === 1) || (lackingProperties.length === 0))) {
            console.log(`${obj['city']}: ${obj['country']}(${obj['name']})`);
        }
        else if (lackingProperties.length === 0) {
            console.log(`${obj['name']}: ${obj['street']} ${obj['number']}, ${obj['city']} - ${obj['country']}`);
        }
        else if (keys.length < 4) {
            console.log(lackingPropertiesMessage, lackingProperties.join());
        }
        else {
            console.log(lackingPropertiesMessage, lackingProperties.join());
        }
    });
};

addressDisplayer(paramsTry);
