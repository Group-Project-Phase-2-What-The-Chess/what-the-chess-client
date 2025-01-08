import Chessgame from "../components/Chessgame";

export default function InGamePage() {
  return (
    <>
      <div className="bg-gray-900 min-h-screen min-w-full">
        <div className="container mx-auto w-[1200px]">
          <h1 className="text-center flex justify-center items-center h-[40vh] text-4xl font-semibold text-white">
            What The Chess
          </h1>
          <div className="flex justify-center h-[20vh] items-center gap-x-4">
            <div className="rounded-md h-[450px] w-[350px] bg-slate-600 px-4">
              <div className="p-4 text-white">
                <h1 className="text-2xl font-semibold">Users Panel</h1>
                <p>User 1 (White)</p>
              </div>
            </div>
            <div className="App">
              <div className="mx-auto w-[450px]">
                <Chessgame />
              </div>
            </div>
            <div className="rounded-md h-[450px] w-[350px] bg-slate-600 px-4">
              <div className="p-4 text-white">
                <h1 className="text-2xl font-semibold">Chat</h1>
                <div className="py-2">
                  <p>User1: Hai...</p>
                  <p>User1: Hai...</p>
                  <p>User1: Hai...</p>
                  <p>User1: Hai...</p>
                  <p>User1: Hai...</p>
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    className="rounded-md text-black px-2 outline-none focus:outline-none"
                  />
                  <button className="bg-blue-500 rounded-md px-2 py-1">
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
