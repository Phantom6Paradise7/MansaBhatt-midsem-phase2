import { useParams, Link } from "react-router";
import PetCard, { getAge, getFee } from "../components/PetCard";
import petImages from "../assets/petImages";

function PetDetails ({ pets, onAdopt, onCancel }) {
  const { id } = useParams();
  const pet = pets.find((p) => p.id === Number(id));

   if (!pet) {
    return (
      <div className="empty-box">
        <h2>We could not find the following pet</h2>
        <Link to="/pets" className="btn btn-main">
          Back to all pets
        </Link>
      </div>
    );
  }

  const similarPets = pets
    .filter((p) => p.type === pet.type && p.id !== pet.id)
    .slice(0, 3);

  let actionButton;
  if (pet.isAdopted) {
    actionButton = (
      <button className="btn btn-outline" onClick={() => onCancel(pet.id)}>
        Cancel Adoption
      </button>
    );
    } else if (pet.vaccinated) {
    actionButton = (
      <button className="btn btn-main" onClick={() => onAdopt(pet.id)}>
        Adopt {pet.name}
      </button>
    );
  } else {
    actionButton = <span className="pending-text">Vaccination Pending</span>;
  }
  return (
    <div>
      <Link to="/pets" className="back-link">
        Back to all pets
      </Link>

      <section className="details">
        <div className="details-photo-wrap">
          <img
            className="details-photo"
            src={petImages[pet.id]}
            alt={pet.name + ", " + pet.breed}
          />
        </div>

        <div className="details-info">
          <h1>
            {pet.name} {pet.emoji}
          </h1>
          <p className="details-sub">
            {pet.breed} {pet.type.toLowerCase()}, {getAge(pet.ageMonths)} old
          </p>

          <div className="info-grid">
            <div className="info-tile">
              <span>Gender</span>
              <strong>{pet.gender}</strong>
            </div>
            <div className="info-tile">
              <span>Vaccination</span>
              <strong>{pet.vaccinated ? "Vaccinated ✓" : "Pending"}</strong>
            </div>
            <div className="info-tile">
              <span>Adoption fee</span>
              <strong>{getFee(pet.adoptionFee)}</strong>
            </div>
            <div className="info-tile">
              <span>Status</span>
              <strong>{pet.isAdopted ? "Adopted by you" : "Looking for a home"}</strong>
            </div>
          </div>

          <div className="details-actions">{actionButton}</div>
        </div>
      </section>
{similarPets.length > 0 && (
        <section className="similar">
          <h2>More {pet.type.toLowerCase()}s you may like</h2>
          <div className="pet-grid three-cols">
            {similarPets.map((p) => (
              <PetCard key={p.id} pet={p} onAdopt={onAdopt} onCancel={onCancel} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default PetDetails;