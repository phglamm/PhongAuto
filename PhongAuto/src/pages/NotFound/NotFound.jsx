import "./NotFound.css";
import { Link } from "react-router-dom";
import { duongdan } from "../../routes";
export default function NotFound() {
  return (
    <div>
      <Link to={duongdan.home}>Back to Home</Link>
    </div>
  );
}
