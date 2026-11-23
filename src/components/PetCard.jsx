import { Link } from "react-router";
import petImages from "../assets/petImages";

export function getAge (months) {
  if (months < 12) {
    return months + " months";
  }
  const years = Math.floor(months/12);
  return years === 1 ? "1 year" : years + " years";
}

export function getFee(fee) {
  return fee === 0 ? "Free" : "₹" + fee;
}

function PetCard ({pet, onAdopt, onCancel}) {
  let actionButton;
  if (pet.isAdopted) {
    actionButton = (
      <button className="btn btn-outline" onClick={() => onCancel(pet.id)}>Cancel Adoption</button>
    );
  } else if (pet.vaccinated) {
    actionButton = (
      <button className="btn btn-main" onClick={() => onAdopt(pet.id)}>
        Adopt {pet.name}
      </button>
    )
  } else {
    actionButton = <span className="pending-text">Vaccination Pending</span>;
  }
  
  return (
    <div className="pet-card">
      <Link to = {"/pets/" + pet.id} className="pet-photo-link">
      <img className = "pet-photo" src={petImages[pet.id]} alt={pet.name + ", " + pet.breed} />
      </Link>

      <div className="pet-top-row">
        <h3 className="pet-name">
          {pet.name} {pet.emoji}
        </h3>
        <span className="pet-fee">{getFee(pet.adoptionFee)}</span>
      </div>

      <p className="pet-info">
        {pet.type}, {pet.breed}
        <br />
        {getAge(pet.ageMonths)} old
      </p>
      <span className={pet.vaccinated ? "badge badge-green" : "badge badge-orange"}>
        {pet.vaccinated ? "Vaccinated ✓" : "Vaccination Pending"}
      </span>
      <div className="pet-actions">{actionButton}
        <Link to = {"/pets/" + pet.id} className="learn-more">
        Learn More
        </Link>
      </div>
    </div>
  );
}

export default PetCard;