//Buscador de informacion de grupos de kpop

//Clase que puede almacenar cualquier elemento del json girls
class Member {
    constructor(name, birthday, weight, height, nationality, agency, bandName) {
      this.name = name;
      this.birthday = birthday;
      this.weight = weight;
      this.height = height;
      this.nationality = nationality;
      this.agency = agency;
      this.bandName = bandName;
    }
}
  
//Clase que puede almacenar cualquier elemento del json bands
class Band {
    constructor(bandName, agency, membersAmount, yearsActive, numberOfAlbums) {
      this.bandName = bandName;
      this.agency = agency;
      this.membersAmount = membersAmount;
      this.yearsActive = yearsActive;
      this.numberOfAlbums = numberOfAlbums;
    }
}

// Funcion generica para cargar un archivo json con una lista de elementos en un array segun la clase del elemento
async function loadData(url, ClassType) {
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data.map(item => new ClassType(...Object.values(item)));
    } catch (error) {
      console.error('Ha ocurrido un error al cargar el archivo ['+ url +']:', error);
      return [];
    }
}

//Funcion que carga los json en la carpeta assets
async function loadKpopData(membersUrl, bandsUrl) {
    const members = await loadData(membersUrl, Member);
    const bands = await loadData(bandsUrl, Band);
    return { members, bands };
}

// Funcion generica para buscar un string dentro de un array de elementos
function filterArray(array, searchString) {
    return array.filter(item => 
        Object.values(item).some(value => 
            value.toString().toLowerCase().includes(searchString.toLowerCase())
        )
    );
}

// Funcion que controla el ingreso del string para la busqueda
function searchAndPrint(members, bands) {
    let searchString = '';
    
    while (searchString.length < 3) {
        searchString = prompt('Ingrese al menos 3 caracteres para la búsqueda:');
        if (searchString === null) {
            console.log('Busqueda cancelada por el usuario');
            return;
        }
        if (searchString.length < 3) {
            alert('Por favor ingrese al menos 3 caracteres.');
        }
    }
  
    const matchingMembers = filterArray(members, searchString);
    const matchingBands = filterArray(bands, searchString);
  
    if (matchingMembers.length > 0) {
        console.log('Miembros encontrados:', matchingMembers);
    } else {
        console.log('No se han encontrado miembros que calcen con el input ingresado.');
    }
    
    if (matchingBands.length > 0) {
        console.log('Bandas encontradas:', matchingBands);
    } else {
       console.log('No se han encontrado bandas que calcen con el input ingresado.');
    }
}

const membersUrl = 'assets/members.json';
const bandsUrl = 'assets/bands.json';
    
loadKpopData(membersUrl, bandsUrl).then(data => {
    console.log('Members:', data.members);
    console.log('Bands:', data.bands);

    searchAndPrint(data.members, data.bands);
});