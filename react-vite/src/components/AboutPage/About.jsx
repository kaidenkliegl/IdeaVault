
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import './About.css'

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

      <div className="auth-buttons">
        <OpenModalMenuItem
          itemText="Log In"
          modalComponent={<LoginFormModal />}
        />
        <OpenModalMenuItem
          itemText="Sign Up"
          modalComponent={<SignupFormModal />}
        />
      </div>
    </div>
  );
}

export default AboutPage;
