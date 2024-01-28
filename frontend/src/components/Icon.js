import { Link } from "react-router-dom";

import login from "../images/login.png"
import register from "../images/register.png"

const items = [
  {
    icon: "Login",
    img: login,
    link: "/login",
  },
  {
    icon: "Register",
    img: register,
    link: "/register",
  },
];

export default function Icon() {
  return (
    <div className="flex justify-center">
      {items.map((item, index) => {
        return (
          <Link
            key={index}
            to={item.link}
            className=" bg-icon-bg h-56 w-56 bg-no-repeat bg-cover mx-8 rounded-3xl flex flex-col items-center hover:scale-110 cursor-pointer"
          >
            <div className="w-3/4 text-center m-6">
              <h3 className="text-white text-xl font-extrabold">{item.icon}</h3>
              <img src={item.img} alt="" className="m-auto my-6" />
              <p className="text-white text-l font-medium">
                {item.description}
              </p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
