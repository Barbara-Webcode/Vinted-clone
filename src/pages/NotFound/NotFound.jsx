import "./notFound.css";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <main className="not-found">
      <h1>Erreur 404 </h1>
      <span>Page introuvable</span>
      <Link to="/">Retour à l'accueil</Link>
    </main>
  );
};

export default NotFound;
