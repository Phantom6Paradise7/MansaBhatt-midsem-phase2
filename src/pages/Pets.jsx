import { useState } from "react";
import PetCard from "../components/PetCard";

function Pets({pets, onAdopt, onCancel}) {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [sortBy, setSortBy] = useState("default");
  const [readyOnly, setReadyOnly] = useState(false);

  const petTypes = ["All", "Dog", "Cat", "Rabbit", "Bird"];

  const searchText = search.trim().toLowerCase();

  const filteredPets = pets.filter((pet) => {
    const matchesSearch = 
    pet.name.toLowerCase().includes(searchText) || pet.breed.toLowerCase().includes(searchText);
    const matchesType = typeFilter === "All" || pet.type === typeFilter;
    const matchesReady = !readyOnly || (pet.vaccinated && !pet.isAdopted);
    return matchesSearch && matchesType && matchesReady;
  });

  const shownPets = [...filteredPets];
  if (sortBy === "age") {
    shownPets.sort((a, b) => a.ageMonths - b.ageMonths);
  } else if (sortBy === "fee") {
    shownPets.sort((a, b) => a.adoptionFee - b.adoptionFee);
  }

  return (
    <div>
      <h1 className="page-title">Find a pet</h1>
      <div className="toolbar">
        <input type="text" 
        className="field"
        placeholder="Search by name or breed"
        aria-label="Search by name or breed"
        value={search}
        onChange={(e) => setSearch(e.target.value)}/>

        <select
          className="field"
          aria-label="Filter by type"
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
        >
          {petTypes.map((type) => (
            <option key={type} value={type}>
              {type === "All" ? "All types" : type}
            </option>
          ))}
        </select>

        <select
          className="field"
          aria-label="Sort pets"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="default">Sort: Newest</option>
          <option value="age">Age: youngest first</option>
          <option value="fee">Fee: low to high</option>
        </select>

        <label className="check-label">
          <input
            type="checkbox"
            checked={readyOnly}
            onChange={(e) => setReadyOnly(e.target.checked)}
          />
          Ready to adopt only
        </label>
      </div>
      
      <p className="result-count">
        Showing {shownPets.length} of {pets.length} pets
      </p>

        {shownPets.length === 0 ? (
        <div className="empty-box">
          <h2>No pets match your search</h2>
          <p>Try a different name, breed or type.</p>
        </div>
      ) : (
        <div className="pet-grid">
          {shownPets.map((pet) => (
            <PetCard key={pet.id} pet={pet} onAdopt={onAdopt} onCancel={onCancel} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Pets;