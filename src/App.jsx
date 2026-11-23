import { useState } from "react";
import { Routes, Route, Link } from 'react-router';
import petsData from './data/pets';
import Navbar from './components/Navbar';
import PetDetails from './pages/PetDetails';
import Pets from './pages/Pets';
import Home from './pages/Home';
import Adopted from './pages/Adopted';

function App(){
  const [pets, setPets] = useState(petsData);

  function adoptPet(id) {
    const updated = pets.map((pet) => {
      if (pet.id === id && pet.vaccinated) {
        return { ...pet, isAdopted: true};
      }
      return pet;
    });
    setPets(updated);
  }
  function cancelAdoption(id) {
    const updated = pets.map((pet) => {
      if (pet.id === id) {
        return { ...pet, isAdopted: false}
      }
      return pet;
    });
    setPets(updated);
  }
  const adoptedCount = pets.filter((pet) => pet.isAdopted).length;

  return (
    <div className="app">
      <Navbar adoptedCount={adoptedCount} />
      <main className="page">
        <Routes>
          <Route path="/" element={<Home pets={pets} onAdopt={adoptPet} onCancel={cancelAdoption} />} ></Route>
          <Route path="/pets" element={<Pets pets={pets} onAdopt={adoptPet} onCancel={cancelAdoption} />} ></Route>
          <Route path="/pets/:id" element={<PetDetails pets={pets} onAdopt={adoptPet} onCancel={cancelAdoption} />} ></Route>
          <Route path="/adopted" element={<Adopted pets={pets} onAdopt={adoptPet} onCancel={cancelAdoption} />} ></Route>
          <Route path="*" element = {<div className="empty-box"><h2>Page not found</h2>
          <Link to="/pets" className="btn btn-main">Back to all pets</Link>
          </div>}></Route>
        </Routes>
      </main>
      <footer className="footer">
        <p className="footer-icons">🐶🐱🐰🦜🐦</p>
        <h3>Every pet deserves a home that fits.</h3>
      </footer>
    </div>
  )
}


export default App; 