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

function generateMembersCards(filteredMembers) {
    const membersData = filteredMembers || JSON.parse(localStorage.getItem('members'));
    if (!membersData) {
        console.error('No se han encontrado datos de miembros en el localStorage');
        return;
    }

    const contentArea = document.querySelector('.content-area');
    contentArea.innerHTML = '';
    const row = document.createElement('div');
    row.className = 'row';

    membersData.forEach(member => {
        const col = document.createElement('div');
        col.className = 'col-md-3 mb-3';

        const card = document.createElement('div');
        card.className = 'card';

        const img = document.createElement('img');
        img.className = 'card-img-top';
        img.alt = member.name;
        const imagePath = `assets/images/members/${member.id}.png`;
        img.src = imagePath;
        img.onerror = function() {
            this.onerror = null;
            this.src = 'assets/images/members/no-member.png';
        };

        const cardBody = document.createElement('div');
        cardBody.className = 'card-body';

        const cardTitle = document.createElement('h5');
        cardTitle.className = 'card-title';
        cardTitle.textContent = member.name;

        const birthday = document.createElement('p');
        birthday.className = 'card-text';
        birthday.textContent = `Birthday: ${member.birthday}`;

        const weight = document.createElement('p');
        weight.className = 'card-text';
        weight.textContent = `Weight: ${member.weight}`;

        const height = document.createElement('p');
        height.className = 'card-text';
        height.textContent = `Height: ${member.height}`;

        const nationality = document.createElement('p');
        nationality.className = 'card-text';
        nationality.textContent = `Nationality: ${member.nationality}`;

        const agency = document.createElement('p');
        agency.className = 'card-text';
        agency.textContent = `Agency: ${member.agency}`;

        const bandName = document.createElement('p');
        bandName.className = 'card-text';
        bandName.textContent = `Band Name: ${member.bandName}`;

        cardBody.appendChild(cardTitle);
        cardBody.appendChild(birthday);
        cardBody.appendChild(weight);
        cardBody.appendChild(height);
        cardBody.appendChild(nationality);
        cardBody.appendChild(agency);
        cardBody.appendChild(bandName);

        card.appendChild(img);
        card.appendChild(cardBody);
        col.appendChild(card);
        row.appendChild(col);
    });

    contentArea.appendChild(row);
}

document.addEventListener('DOMContentLoaded', (event) => {
    generateCarouselItems();
    generateMembersCards();

    const searchForm = document.getElementById('searchForm');
    const searchInput = document.getElementById('searchInput');

    searchForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const searchTerm = searchInput.value.trim();

        if (searchTerm.length < 3) {
            Swal.fire(`Por favor ingrese al menos 3 caracteres`);
            return;
        }

        const bandsData = JSON.parse(localStorage.getItem('bands'));
        if (!bandsData) {
            console.error('No se han encontrado datos de bandas en el localStorage');
            return;
        }

        const membersData = JSON.parse(localStorage.getItem('members'));
        if (!membersData) {
            console.error('No se han encontrado datos de miembros en el localStorage');
            return;
        }

        const filteredBands = bandsData.filter(band => 
            Object.values(band).some(value => 
                value.toString().toLowerCase().includes(searchTerm.toLowerCase())
            )
        );

        const filteredMembers = membersData.filter(member => 
            Object.values(member).some(value => 
                value.toString().toLowerCase().includes(searchTerm.toLowerCase())
            )
        );

        console.log("Bandas encontradas:")
        console.table(filteredBands);
        console.log("Miembros encontradas:")
        console.table(filteredMembers);

        if (filteredBands.length === 0) {
            Swal.fire(`No se encontraron coincidencias. Cargando todas las bandas y miembros.`);
            generateCarouselItems();
            generateMembersCards();
        } else {
            generateCarouselItems(filteredBands);
            generateMembersCards(filteredMembers);
        }
    });
});