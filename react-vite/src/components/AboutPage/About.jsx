import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import "./About.css";

function AboutPage() {
  return (
    <div className="about-page">
      <h1>Welcome to IdeaVault</h1>
      <p>
        IdeaVault is your personal space to capture, organize, and manage your
        ideas, notes, and tasks all in one place. Whether you’re brainstorming
        for a project, keeping track of important information, or just jotting
        down thoughts, IdeaVault helps you stay focused and productive. Sign up
        or log in to start creating your notebooks and turn your ideas into
        reality!
      </p>

      <ul className="auth-buttons">
        <button className="auth-button">
          <OpenModalMenuItem
            itemText="Log In"
            modalComponent={<LoginFormModal />}
          />
        </button>
        <button className="auth-button">
          <OpenModalMenuItem
            itemText="Sign Up"
            modalComponent={<SignupFormModal />}
          />
        </button>
      </ul>
    </div>
  );
}

export default AboutPage;
