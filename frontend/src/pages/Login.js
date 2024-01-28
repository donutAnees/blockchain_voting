import { useSDK } from "@metamask/sdk-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Login({ account, setAccount }) {
  const { sdk, connected, connecting, provider, chainId } = useSDK();

  const navigate = useNavigate();

  useEffect(() => {
    if (!account || account.length === 0) {
      // Check if account doesn't exist or its length is 0
      const acc = JSON.parse(window.localStorage.getItem("account"));
      if (acc && acc.length > 0) setAccount(acc);
    }
  }, [account,setAccount]);

  const connect = async () => {
    try {
      const accounts = await sdk?.connect();
      setAccount(accounts?.[0]);
      window.localStorage.setItem("account", JSON.stringify(accounts?.[0]));
      navigate("/vote");
    } catch (err) {
      alert(`failed to connect..`, err);
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="w-2/4 h-2/4 flex flex-col justify-center items-center gap-5">
        <button
          className="p-4 bg-blue-500 rounded-sm w-32 text-white font-bold"
          onClick={connect}
        >
          Connect
        </button>
        {connected && (
          <div className="text-center">
            <>
              {chainId && `Connected chain: ${chainId}`}
              <p></p>
              {account && `Connected account: ${account}`}
            </>
          </div>
        )}
      </div>
    </div>
  );
}
