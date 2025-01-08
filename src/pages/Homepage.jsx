import { NavLink } from "react-router";

export default function Homepage() {
  return (
    <>
      <div className="bg-gray-900 h-[100vh] min-w-full">
        <div className="flex h-full items-center justify-center">
          <div className="text-white text-center">
            <div className="text-center py-20">
              <h1 className="text-4xl font-bold">What The Chess</h1>
              <img src="/poster.png" className="w-[300px] mx-auto" />
              <h1 className="text-2xl font-semibold">
                Greetings, Knight of the Chessboard!
              </h1>
            </div>
            <div className="py-2">
              <NavLink to="/main-menu">
                <button className="rounded-md font-semibold text-gray-900 bg-yellow-500 w-48 py-2">
                  Play
                </button>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
