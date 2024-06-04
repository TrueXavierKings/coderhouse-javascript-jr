function generateCarouselItems(filteredBands) {
    const bandsData = filteredBands || JSON.parse(localStorage.getItem('bands'));
    if (!bandsData) {
        console.error('No se han encontrado datos de bandas en el localStorage');
        return;
    }

    const carouselInner = document.querySelector('.carousel-inner');
    carouselInner.innerHTML = '';

    const isTotalLoad = filteredBands == null || filteredBands.length === 0 ? true : false;

    bandsData.forEach((band, index) => {
        const itemDiv = document.createElement('div');
        itemDiv.className = `carousel-item ${index === 0 ? 'active' : ''}`;

        const captionDiv = document.createElement('div');
        captionDiv.className = 'carousel-caption d-none d-md-block carousel-section';

        const h5 = document.createElement('h5');
        h5.textContent = band.bandName;
        captionDiv.appendChild(h5);

        const captionDetailDiv = document.createElement('div');
        captionDetailDiv.className = 'carousel-caption-details';

        const agencyP = document.createElement('p');
        agencyP.textContent = "Agencia: " + band.agency;
        captionDetailDiv.appendChild(agencyP);

        const numberOfMembersP = document.createElement('p');
        numberOfMembersP.textContent = "Cantidad Miembros: " + band.membersAmount;
        captionDetailDiv.appendChild(numberOfMembersP);

        const yearsActiveP = document.createElement('p');
        yearsActiveP.textContent = "Años activa: " + band.yearsActive;
        captionDetailDiv.appendChild(yearsActiveP);

        const results = document.createElement('p');
    
        results.textContent = isTotalLoad ? "Índice banda actual / Bandas en total: " + (index + 1) + "/" + bandsData.length : "Índice banda actual / Bandas encontradas: " + (index + 1) + "/" + bandsData.length;
        captionDetailDiv.appendChild(results);

        captionDiv.appendChild(captionDetailDiv);

        const img = document.createElement('img');
        img.src = `assets/images/bands/${band.key}/carousel.png`;
        img.className = 'd-block w-100 carousel-image';
        img.alt = band.bandName;

        itemDiv.appendChild(captionDiv);
        itemDiv.appendChild(img);
        carouselInner.appendChild(itemDiv);
    });
}

document.addEventListener('DOMContentLoaded', (event) => {
    generateCarouselItems();

    const searchForm = document.getElementById('searchForm');
    const searchInput = document.getElementById('searchInput');

    searchForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const searchTerm = searchInput.value.trim();

        if (searchTerm.length < 3) {
            alert('Por favor ingrese al menos 3 caracteres');
            return;
        }

        const bandsData = JSON.parse(localStorage.getItem('bands'));
        if (!bandsData) {
            console.error('No se han encontrado datos de bandas en el localStorage');
            return;
        }

        const filteredBands = bandsData.filter(band => 
            Object.values(band).some(value => 
                value.toString().toLowerCase().includes(searchTerm.toLowerCase())
            )
        );

        if (filteredBands.length === 0) {
            alert('No se encontraron coincidencias. Cargando todas las bandas.');
            generateCarouselItems();
        } else {
            generateCarouselItems(filteredBands);
        }
    });
});