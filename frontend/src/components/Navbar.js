import { Link } from "react-router-dom";
import Navlist from "./Navlist";

export default function Navbar() {
  return (
    <section className="absolute flex justify-between items-center px-6 pt-2 z-10 w-screen">
        <Link to={"/"} className="font-semibold text-3xl">dVote</Link>
        <Navlist></Navlist>
    </section>
  );
}