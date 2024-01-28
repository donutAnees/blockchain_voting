import Icon from "../components/Icon";

export default function Home() {
  return (
    <div className="bg-slate-50 h-screen bg-light-bg absolute bg-cover w-screen">
      <h1 className="text-center font-extrabold text-5xl mx-auto mt-32 animate-slide-in">
      Revolutionize democracy with blockchain voting: where transparency meets security, <br /> and every vote shapes the future
      </h1>
      <p className="text-slate-800 font-light mt-8 text-center">
        The exclusive hub for all the tools essential to trace transactions{" "}
        <span className="text-cyan-400">effortlessly</span> and{" "}
        <span className="text-cyan-400">effectively</span>
      </p>
      <div className="mt-16">
        <Icon />
      </div>
    </div>
  );
}
