
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation() {
  return (
    <div className="Navbar">
      <ul>
        <li>
          <ProfileButton />
        </li>
      </ul>
    </div>
  );
}

export default Navigation;
