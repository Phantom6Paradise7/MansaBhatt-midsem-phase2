import { Link } from "react-router";
import PetCard from "../components/PetCard";

function Adopted({ pets, onAdopt, onCancel }) {
  const adoptedPets = pets.filter((pet) => pet.isAdopted);

  let totalFee = 0;
  adoptedPets.forEach((pet) => {
    totalFee = totalFee + pet.adoptionFee;
  });

  if (adoptedPets.length === 0) {
    return (
      <div>
        <h1 className="page-title">Your adoptions</h1>
        <div className="empty-box">
          <h2>No pets adopted yet</h2>
          <Link to="/pets" className="btn btn-main">
            Find a pet
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="page-title">Your adoptions</h1>
      <p className="total-fee">
        Total adoption fee: <strong>₹{totalFee}</strong>
      </p>

      <div className="pet-grid">
        {adoptedPets.map((pet) => (
          <PetCard key={pet.id} pet={pet} onAdopt={onAdopt} onCancel={onCancel} />
        ))}
      </div>
    </div>
  );
}

export default Adopted;