function loadJSONData(url, localStorageKey) {
    return fetch(url)
        .then(response => response.json())
        .then(data => {
            localStorage.setItem(localStorageKey, JSON.stringify(data));
            console.log(`Datos cargados con exito en LocalStorage con la key: ${localStorageKey}`);
        })
        .catch(error => {
            console.error(`Error al cargar datos desde ${url}:`, error);
        });
}

const loadMembers = loadJSONData('data/json/members.json', 'members');
const loadBands = loadJSONData('data/json/bands.json', 'bands');

Promise.all([loadMembers, loadBands]).then(() => {
    console.log('La carga de datos iniciales ha terminado');
});