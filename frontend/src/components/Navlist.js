import { Link } from "react-router-dom";

const item = [{item : "Login" , link : "/login"}, {item: "Register" , link : "/register" },{item: "Live Poll" , link : "/poll" }];

export default function Navlist() {
  return (
    <div className="flex">
      <ul className="flex space-x-6">
        {item.map((i, index) => {
          return (
            <Link key={index} to={i.link} className="font-medium text-xs hover:text-cyan-400">
              {i.item}
            </Link>
          );
        })}
      </ul>
    </div>
  );
}