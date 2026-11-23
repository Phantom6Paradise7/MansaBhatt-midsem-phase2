import {Link} from 'react-router';

function Navbar ({ adoptedCount }) {
  return (
    <header className='navbar'>
      <nav className='navbar-inner'>
        <Link to='/' className='logo'>
        <span className="logo-paw">🐾</span>
        Adopt me</Link>
        <div className="nav-links">
            <Link to = '/'>Home</Link>
            <Link to = '/pets'>Find a pet</Link>
            <Link to = '/adopted' className='adopted-link'>Adopted<span className="count-pill">{adoptedCount}</span></Link>
        </div>
      </nav>
    </header>
  )
}

export default Navbar;