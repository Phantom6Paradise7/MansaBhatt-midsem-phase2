import { Link } from "react-router";
import PetCard from "../components/PetCard";
import petImages from "../assets/petImages";

function Home ({ pets, onAdopt, onCancel}) {
const totalPets = pets.length;
const readyPets = pets.filter((pet) => pet.vaccinated && !pet.isAdopted).length;
const adoptedPets = pets.filter((pet) => pet.isAdopted).length;
const newPets = pets.slice(0, 3);

return (
  <div>
    <section className="hero">
        <span className="hero-paw hero-paw-left">🐾</span>
        <span className="hero-paw hero-paw-right">🐾</span>
        <h1>Find the one who will be waiting for you</h1>
        <p className="hero-text">Puppies, kittens, rabbits and birds, all checked by a vet and looking
          for a family. Pick a pet, read their story and take them home.</p>
          <Link to="/pets/" className="btn btn-yellow">Meet the pets</Link>

        <div className="hero-photos">
          <img className="hero-img hero-img-left" src={petImages[5]} alt="Mithu the parrot" />
          <img className="hero-img hero-img-middle" src={petImages[7]} alt="Rocky the German Shepherd" />
          <img className="hero-img hero-img-right" src={petImages[2]} alt="Misty the Persian cat" />
        </div>

        <div className="chips">
          <Link to='/pets' className="chip">Dogs</Link>
          <Link to='/pets' className="chip">Cats</Link>
          <Link to='/pets' className="chip">Birds</Link>
          <Link to='/pets' className="chip">Rabbits</Link>
        </div>
    </section>

    <section className="stats">
      <div className="stat-box">
        <strong>{totalPets}</strong>
        <span>Pets listed</span>
      </div>
      <div className="stat-box">
        <strong>{readyPets}</strong>
        <span>Ready for adoption</span>
      </div>
      <div className="stat-box">
          <strong>{adoptedPets}</strong>
          <span>Adopted by you</span>
      </div>
    </section>
    <section>
      <div className="section-head">
          <h2>New this week</h2>
          <Link to="/pets">See all {totalPets} pets</Link>
        </div>
        <div className="pet-grid three-cols">{newPets.map((pet) => (
           <PetCard key={pet.id} pet={pet} onAdopt={onAdopt} onCancel={onCancel} />
        ))}</div>
    </section>
  </div>
  );
}

export default Home;