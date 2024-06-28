import "./Navbar.css"

const Navbar = () => {
  return (
    <div className="admin-panel-navbar">
      <div className="admin-panel-navbar__logo">

        <h3>Hangla</h3>
        <p>Admin Panel</p>
      </div>
      
      <div className="admin-panel-navbar__menu">
        <ul>
          <li>Admin 1</li>
          <li>
            <button>Log out</button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar
