/*
TODO
x (- Faker-Package installieren)
x (- npm Script einrichten)
x - Faker importieren
x - Models importieren
x - Verbindung zur DB herstellen
x - Collections leeren (deleteMany())
 - 100 Datensätze laut Schema erzeugen (einzelne Objekte, die als Documents gespeichert werden)
 - Datensätze in DB speichern
 - Error Handling
*/

console.log("run seed script");

import { faker } from "@faker-js/faker";
import Photo from "./models/Photo.js";
import "./lib/mongoose.js";

const addPhoto = async () => {
  const newPhoto = new Photo({
    price: faker.commerce.price(),
    url: faker.image.image(640, 480, true),
    date: faker.date.past(),
    theme: faker.word.noun(),
  });

  await newPhoto.save();
};

const addPhotos = async (count = 20) => {
  for (let i = 0; i < count; i++) {
    console.log("creating photo: ", i + 1);
    await addPhoto();
  }
};

try {
  if (!process.argv.includes("doNotDelete")) {
    console.log("deleting all photos...");
    await Photo.deleteMany();
    console.log("done");
  }

  console.log("creating new photos...");
  await addPhotos(
    process.argv[2] === "doNotDelete" ? undefined : process.argv[2]
  );
  console.log("done");

  console.log("seeding finished, happy coding!");
  process.exit(0);
} catch (error) {
  console.error(error);
  process.exit(1);
}
