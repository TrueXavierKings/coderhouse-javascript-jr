//Clase que puede almacenar cualquier elemento del json girls
class Member {
    constructor(name, birthday, weight, height, nationality, agency, bandName, bandKey) {
      this.name = name;
      this.birthday = birthday;
      this.weight = weight;
      this.height = height;
      this.nationality = nationality;
      this.agency = agency;
      this.bandName = bandName;
      this.bandKey = bandKey;
    }
}
  
//Clase que puede almacenar cualquier elemento del json bands
class Band {
    constructor(bandName, agency, membersAmount, yearsActive, numberOfAlbums, key) {
      this.bandName = bandName;
      this.agency = agency;
      this.membersAmount = membersAmount;
      this.yearsActive = yearsActive;
      this.numberOfAlbums = numberOfAlbums;
      this.key = key;
    }
}