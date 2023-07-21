import React from "react";

import { NetworkErrorMessage } from "./NetworkErrorMessage";

export function ConnectWallet({ connectWallet, networkError, dismiss }) {
  return (
    <div className="container">
      <div className="row justify-content-md-center">
        <div className="col-12 text-center">
          {/* Wallet network should be set to Localhost:8545. */}
          {networkError && (
            <NetworkErrorMessage 
              message={networkError} 
              dismiss={dismiss} 
            />
          )}
        </div>
        {/* <div className="flex flex-col items-center justify-center h-screen bg-cover" style={{ backgroundImage: "url('path/to/your/background-image.jpg')" }}> */}
        <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-2xl font-semibold mb-4">Please connect to your wallet.</p>
        <button
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded"
          type="button"
          onClick={connectWallet}
        >
          Connect Wallet
        </button>
      {/* </div> */}
      </div>
      </div>
    </div>
  );
}
