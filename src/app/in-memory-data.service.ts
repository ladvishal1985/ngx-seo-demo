import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const heroes = [
      { id: 11, name: 'Mr. Nice', image: "assets/images/nice.jpg", description: "Mr. Nice is a movie starring Rhys Ifans, Chlo� Sevigny, and David Thewlis. The life story of Howard Marks, an elite British drug smuggler.", rating: "3" },
      { id: 12, name: 'Narco', image: "assets/images/narcos.jpg", description: "As drug lord Pablo Escobar rises, Colombian and U.S. law enforcement find themselves battling an enemy who will do anything to keep his empire.", rating: "4" },
      { id: 13, name: 'Bombasto', image: "assets/images/bombasto1.jpg", description: "A lone detective tracks down a psychotic killer through the filth ridden streets of Downtown, but his nemesis seems to be far more clever then he could have ever expected.", rating: "3" },
      { id: 14, name: 'Celeritas', image: "assets/images/celeritas1.jpg", description: "Through his adventures, Fawcett Comics/DC Comics superhero Captain Marvel and his Marvel Family gained a host of enemies. See the articles below for the different villains.", rating: "2" },
      { id: 15, name: 'Magneta', image: "assets/images/magneta.jpg", description: "Magneta is a mutant in with powers over magnetism. She has patterned her costume and herself after Magneto, who she considers to be her direct predecessor.", rating: "3" },
      { id: 16, name: 'RubberMan', image: "assets/images/rubberman1.jpg", description: "A character with a limited Voluntary Shapeshifting power, that results in his body acting like it is made of rubber. This can be a very versatile ability as long as the user is creative and not afraid to look silly, though the silliness potential means this tends to be a power given to Fun Personified characters.", rating: "4" },
      { id: 17, name: 'Dynama', image: "assets/images/dynama1.jpg", description: "Captain Dynamo (real name William Warner) is a fictional comic book superhero, created by writer Jay Faerber and artist Fran Bueno, who first appeared as a supporting character in Noble Causes: Extended Family #2 (June 2004) by Image Comics.", rating: "3" },
      { id: 18, name: 'Dr IQ', image: "assets/images/driq.jpg", description: "Driq was a native of the planet Criq and at some point became a member of the Green Lantern Corps where he was part of the Green Lantern Corps of Klyminade where he developed a reputation for being a master strategist.", rating: "2" },
      { id: 19, name: 'Magma', image: "assets/images/magma1.jpg", description: "Magma (real name Amara Juliana Olivians Aquilla; also known as Alison Crestmere) is a fictional superhero appearing in American comic books published by Marvel Comics.", rating: "4" },
      { id: 20, name: 'Tornado', image: "assets/images/tornado1.jpg", description: "Red Tornado is a fictional superhero appearing in American comic books published by DC Comics.", rating: "2" }
    ];
    return { heroes };
  }
}

