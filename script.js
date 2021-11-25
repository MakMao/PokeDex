const poke_container = document.getElementById('poke_container');
const form = document.querySelector('.search-form')
const search = document.getElementById('search-input')

const pokemons_number = 150;


const colors = {
	fire: ['#FDDFDF', '#F78383', '#7C0303'],
	grass: ['#DEFDE0', '#73D57A', '#005106'],
	electric: ['#FCF7DE', '#F5EB4F', '#7A7301'],
	water: ['#DEF3FD', '#7FD5FE', '#025983'],
	ground: ['#f4e7da', '#C1AA93', '#784007'],
	rock: ['#d5d5d4', '#898989', '#3B3939'],
	fairy: ['#fceaff', '#F4B4FF', '#7C0491'],
	poison: ['#98d7a5', '#6D9275', '#005112'],
	bug: ['#f8d5a3', '#D09E57', '#6E4205'],
	dragon: ['#97b3e6', '#65779A', '#1F345D'],
	psychic: ['#eaeda1', '#C3C687', '#666B04'],
	fighting: ['#E6E0D4', '#BFB5A2', '#695328'],
	normal: ['#F5F5F5', '#DADADA', '#626262'],
    ice: ['#C1FEFF', '#49DBFF', '#06738F'],
    ghost: ['#FFC4FD', '#A26DA0', '#5A0F56']
};

const main_types = Object.keys(colors);

const fetchPokemons = async () => {
	for (let i = 1; i <= pokemons_number; i++) {
		await getPokemon(i);
	}
};

const getPokemon = async id => {
	const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
	const res = await fetch(url);
	const pokemon = await res.json();
	createPokemonCard(pokemon);
	const list = pokemon.name
	console.log(list);
};


function createPokemonCard(pokemon) {
	const pokemonEl = document.createElement('div');
	pokemonEl.classList.add('pokemon');
	
    const img = pokemon.sprites.other.dream_world.front_default
	const typeName = pokemon.types[0].type.name
	const poke_types = pokemon.types.map(type => type.type.name);
    const light = colors[typeName][0]; 
    const dark = colors[typeName][1]; 
    const veryDark = colors[typeName][2]; 

	const length = Math.floor(Math.random() * pokemon.moves.length)

    const move1 = pokemon.moves[length].move.name
	    const move2 = () => {
		if(pokemon.name == 'ditto') 
		{ return 'transform'
			}return pokemon.moves[1].move.name
		}
    const move3 = () => {
		if(pokemon.name == 'ditto') 
		{ return 'transform'
			}return pokemon.moves[2].move.name
		}
		

	const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
	
	const pokeInnerHTML = `
        <div class="card">
            <div class="card__header" style="background:${light}">
				<h3 style="color:${veryDark}" class="poke-name">#${pokemon.id} ${name}</h3>
                <div style="background:${light}; border: 5px solid ${dark}" 	class="card__img-container">
                    <img src="${img}" alt="" class="card__img">
                </div>
            </div>
            <div style="background:${dark}" class="card__body">
				<div class="card__type">
					<h4 style="color:${veryDark}">Type:<br> <span>${poke_types[0]}</span></h4>
				</div>
                <div style="color:${veryDark}" class="card__moves">
                    <h4>Moves:</h4>
                    <ul style="color:${veryDark}">
                        <li>${move1}</li>
                        <li>${move2()}</li>
                        <li>${move3()}</li>
                    </ul>
                </div>
            </div>
        </div>
    `;

	pokemonEl.innerHTML = pokeInnerHTML;
	poke_container.appendChild(pokemonEl);
}

fetchPokemons();


//search form
form.addEventListener("keyup", (e) => {

	const keys = e.target.value.toLowerCase()
	const items = document.querySelectorAll('.poke-name')

	e.preventDefault()
	items.forEach((item)=> {
	  const pokeName = item.textContent.split(' ')[1]
	  if(pokeName.toLowerCase().startsWith(keys)) {
		item.parentElement.parentElement.parentElement.style.display = "block";
	  } else {
		item.parentElement.parentElement.parentElement.style.display = "none";
	  }
	})
})

//select options
//select options

const select = document.getElementById('poke-types')

main_types.forEach((type) => {
	const option = document.createElement('option')
	select.appendChild(option)
	option.textContent = type
})

select.addEventListener('change', (e) => {
	const pokeTypes = document.querySelectorAll('.card__type')
	const target = e.target.value

	
	pokeTypes.forEach((type) => {
		const pokeType = type.textContent
		if(pokeType.includes(target)){
			type.parentElement.parentElement.parentElement.style.display = "block"
		}else {
			type.parentElement.parentElement.parentElement.style.display = "none"
		}
	})
})

