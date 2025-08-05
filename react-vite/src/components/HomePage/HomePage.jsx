
import AllNotesList from '../NotesPage/UserNotes';
import NotebookList from '../Notebooks/NotebookList';
import './HomePage.css';  // Optional: for styling

function HomePage() {
  return (
    <div className="homepage-container">
      <div className="home-notes">
        <AllNotesList />
      </div>
      <div className="home-notebooks">
        <NotebookList />
      </div>
    </div>
  );
}

export default HomePage;
