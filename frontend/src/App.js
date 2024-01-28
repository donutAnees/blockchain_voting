import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import Root from "./pages/Root";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Verify from "./pages/Verify";
import { useState } from "react";
import { MetaMaskProvider } from "@metamask/sdk-react";

function App() {
  const [account, setAccount] = useState("");

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root></Root>,
      children: [
        {
          path: "/",
          element: <Home></Home>,
        },
        {
          path: "/login",
          element: <Login account={account} setAccount={setAccount}></Login>,
        },
        {
          path: "/register",
          element: <Root></Root>,
          children: [
            {
              path: "",
              element: <Register></Register>,
            },
            {
              path: "verify",
              element: <Verify setAccount={setAccount}></Verify>,
            },
          ],
        },
      ],
    },
  ]);
  return (
    <MetaMaskProvider
      debug={false}
      sdkOptions={{
        dappMetadata: {
          name: "React Voting Dapp",
          url: window.location.href,
        },
      }}
    >
      <div className="App">
        <RouterProvider router={router} />
      </div>
    </MetaMaskProvider>
  );
}

export default App;
