import React from "react";

// We'll use ethers to interact with the Ethereum network and our contract
import { ethers } from "ethers";

// We import the contract's artifacts and address here, as we are going to be
// using them with ethers
import NFTItemArtifact from "../contracts/NFTItem.json";
import NFTMarketplaceArtifact from "../contracts/NFTMarketplace.json";
import NFTItemAddress from "../contracts/NFTItem-contract-address.json";
import NFTMarketplaceAddress from "../contracts/NFTMarketplace-contract-address.json";

// All the logic of this dapp is contained in the Dapp component.
// These other components are just presentational ones: they don't have any
// logic. They just render HTML.
import { NoWalletDetected } from "./NoWalletDetected";
import { ConnectWallet } from "./ConnectWallet";
import { Loading } from "./Loading";
import { Transfer } from "./Transfer";
import { NoTokensMessage } from "./NoTokensMessage";
import { MintNFTButton } from "./MintNFTButton";
import axios from "axios";
import { SellNFTButton } from "./SellNFTButton";
import { m } from "framer-motion";

// axios.defaults.baseURL= "https://5ous2fgk3m.execute-api.us-east-1.amazonaws.com/default";

// This is the default id used by the Hardhat Network
const HARDHAT_NETWORK_ID = "80001";
const HARDHAT_NETWORK_HEX_ID = "0x13881";
// This is an error code that indicates that the user canceled a transaction
const ERROR_CODE_TX_REJECTED_BY_USER = 4001;

// This component is in charge of doing these things:
//   1. It connects to the user's wallet
//   2. Initializes ethers and the Token contract
//   3. Polls the user balance to keep it updated.
//   4. Transfers tokens by sending transactions // don't need
//   5. Renders the whole application
//
// Note that (3) and (4) are specific of this sample application, but they show
// you how to keep your Dapp and contract's state in sync,  and how to send a
// transaction.
export class Dapp extends React.Component {
  constructor(props) {
    super(props);

    // We store multiple things in Dapp's state.
    // You don't need to follow this pattern, but it's an useful example.
    this.initialState = {
      // The info of the token (i.e. It's Name and symbol)
      tokenData: undefined,
      // The user's address and balance
      selectedAddress: undefined,
      balance: undefined,
      // The ID about transactions being sent, and any possible error with them
      txBeingSent: undefined,
      transactionError: undefined,
      networkError: undefined,
    };

    this.state = this.initialState;
  }

  render() {
    // Ethereum wallets inject the window.ethereum object. If it hasn't been
    // injected, we instruct the user to install a wallet.
    if (window.ethereum === undefined) {
      return <NoWalletDetected />;
    }

    // The next thing we need to do, is to ask the user to connect their wallet.
    // When the wallet gets connected, we are going to save the users's address
    // in the component's state. So, if it hasn't been saved yet, we have
    // to show the ConnectWallet component.
    //
    // Note that we pass it a callback that is going to be called when the user
    // clicks a button. This callback just calls the _connectWallet method.
    if (!this.state.selectedAddress) {
      //重要
      return <ConnectWallet connectWallet={() => this._connectWallet()} />;
    }

    // If the token data or the user's balance hasn't loaded yet, we show
    // a loading component.//不需要
    if (!this.state.tokenData || !this.state.balance) {
      return <Loading />;
    }

    // If everything is loaded, we render the application.
    //不需要
    return (
      <div className="container p-4">
        <div className="row">
          <div className="col-12">
            <h1>
              {this.state.tokenData.name} ({this.state.tokenData.symbol})
            </h1>
            <p>
              Welcome <b>{this.state.selectedAddress}</b>, you have{" "}
              <b>
                {this.state.balance.toString()} {this.state.tokenData.symbol}
              </b>
              .
            </p>
          </div>
        </div>

        <hr />

        <div className="row">
          <div className="col-12">
            {/*
              If the user has no tokens, we don't show the Transfer form
            */}
            {this.state.balance.eq(0) && (
              <>
                {/* <NoTokensMessage selectedAddress={this.state.selectedAddress} /> */}
                <MintNFTButton
                  signer={this._provider.getSigner(0)}
                  NFTItem={this._NFTItem}
                />
              </>
            )}

            {/*
              This component displays a form that the user can use to send a 
              transaction and transfer some tokens.
              The component doesn't have logic, it just calls the transferTokens
              callback.
            */}
            {this.state.balance.gt(0) && (
              <SellNFTButton
                signer={this._provider.getSigner(0)}
                NFTMarketplace={this._NFTMarketplace}
                NFTItem={this._NFTItem}
                tokenId="1" /* need to ask backend */
              />
            )}
          </div>
        </div>
      </div>
    );
  }

  async _connectWallet() {
    // This method is run when the user clicks the Connect. It connects the
    // dapp to the user's wallet, and initializes it.

    // To connect to the user's wallet, we have to run this method.
    // It returns a promise that will resolve to the user's address.
    const [selectedAddress] = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    // Once we have the address, we can initialize the application.

    // First we check the network
    this._checkNetwork();

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const message = axios
      .post(
        "https://ve8x4frvd8.execute-api.us-east-1.amazonaws.com/default/getNonce",
        {
          address: selectedAddress,
        }
      )
      .then(function (res) {
        console.log(res.data);
      })
      
    // 准备要签名的消息
    const newMessage = selectedAddress + " " + message
    const messageBytes = ethers.utils.toUtf8Bytes(newMessage);

    // 使用 Metamask 进行消息签名
    const signature = await signer.signMessage(messageBytes);

    const authen = axios.post(
      "https://ve8x4frvd8.execute-api.us-east-1.amazonaws.com/default/authenticate",
      {
        address: selectedAddress,
        signature: signature
      }
    ).then(function (res) {
      console.log(res.data)
    })

    this._initialize(selectedAddress);

    // We reinitialize it whenever the user changes their account.
    window.ethereum.on("accountsChanged", ([newAddress]) => {
      this._stopPollingData(); //不需要
      // `accountsChanged` event can be triggered with an undefined newAddress.
      // This happens when the user removes the Dapp from the "Connected
      // list of sites allowed access to your addresses" (Metamask > Settings > Connections)
      // To avoid errors, we reset the dapp state
      if (newAddress === undefined) {
        return this._resetState();
      }

      this._initialize(newAddress);
    });
  }

  async _initialize(userAddress) {
    // This method initializes the dapp

    // We first store the user's address in the component's state
    this.setState({
      selectedAddress: userAddress,
    });

    // Then, we initialize ethers, fetch the token's data, and start polling
    // for the user's balance.

    // Fetching the token data and the user's balance are specific to this
    // sample project, but you can reuse the same initialization pattern.
    this._initializeEthers(); //不需要
    this._getTokenData(); //不需要
    this._startPollingData(); //不需要
  }

  async _initializeEthers() {
    //不需要
    // We first initialize ethers by creating a provider using window.ethereum
    this._provider = new ethers.providers.Web3Provider(window.ethereum);

    // Then, we initialize the contract using that provider and the token's
    // artifact. You can do this same thing with your contracts.
    this._NFTItem = new ethers.Contract(
      NFTItemAddress.address,
      NFTItemArtifact.abi,
      this._provider.getSigner(0)
    );
    console.log("NFTItem", NFTItemAddress.address);

    this._NFTMarketplace = new ethers.Contract(
      NFTMarketplaceAddress.address,
      NFTMarketplaceArtifact.abi,
      this._provider.getSigner(0)
    );
  }

  // The next two methods are needed to start and stop polling data. While
  // the data being polled here is specific to this example, you can use this
  // pattern to read any data from your contracts.
  //
  // Note that if you don't need it to update in near real time, you probably
  // don't need to poll it. If that's the case, you can just fetch it when you
  // initialize the app, as we do with the token data.
  _startPollingData() {
    //不需要
    this._pollDataInterval = setInterval(() => this._updateBalance(), 1000);

    // We run it once immediately so we don't have to wait for it
    this._updateBalance();
  }

  _stopPollingData() {
    //不需要
    clearInterval(this._pollDataInterval);
    this._pollDataInterval = undefined;
  }

  // The next two methods just read from the contract and store the results
  // in the component state.
  async _getTokenData() {
    //不需要
    const name = await this._NFTItem.name();
    const symbol = await this._NFTItem.symbol();

    this.setState({ tokenData: { name, symbol } });
  }

  async _updateBalance() {
    //不需要
    const balance = await this._NFTItem.balanceOf(this.state.selectedAddress);
    this.setState({ balance });
  }

  // This method resets the state
  _resetState() {
    this.setState(this.initialState);
  }

  async _switchChain() {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: HARDHAT_NETWORK_HEX_ID }],
    });
    await this._initialize(this.state.selectedAddress);
  }

  // This method checks if the selected network is Localhost:8545
  _checkNetwork() {
    if (window.ethereum.networkVersion !== HARDHAT_NETWORK_ID) {
      this._switchChain();
    }
  }
}
