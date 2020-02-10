const pokedex = document.getElementById("pokedex"); 

console.log(pokedex);

const fetchPokemon = () => { 

    const promises = []; 
    for( let i = 1; i < 152; i++ ) { 
    const url = `https://pokeapi.co/api/v2/pokemon/${i}`; 
    promises.push(fetch(url).then((res) => res.json())); 
    }

    Promise.all(promises).then(results => {
        const pokemon = results.map((data) => ({
            name: data.name, 
            id: data.id, 
            image: data.sprites['front_default'], 
            type: data.types.map( type => type.type.name).join(", ")
        // the map function will iterate through an array of some sort of items and it will create a new array by converting each item in some way so what this is doing it's iterating through each result which each the data coming back from the API call it's gonna get a reference to each one of those it's going to transform it by converting it to an object in the format that we choose and the format that we choose 
        })); 

        displayPokemon(pokemon);
    });
};
const displayPokemon = (pokemon) => {
    console.log(pokemon);
    const pokemonHTMLString = pokemon.map ( pokeman => `
    <li class="card">
        <img class = "card-image" src="${pokeman.image}" />
        <h2 class = "card-title"> ${pokeman.id}, ${pokeman.name}</h2>
        <p class = "card-subtitle">Type: ${pokeman.type}</p>
    </li>
    `).join("")
    pokedex.innerHTML = pokemonHTMLString;
}
fetchPokemon(); 
