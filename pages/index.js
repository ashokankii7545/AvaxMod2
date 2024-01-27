import {
  useState,
  useEffect,
  useRef,
} from "react";
import { ethers } from "ethers";
import AvengersWalletAbi from "../artifacts/contracts/Assessment.sol/Avengers.json";

export default function HomePage() {
  const [
    AvengersWallet,
    setAvengersWallet,
  ] =
    useState(
      undefined,
    );
  const [
    AvengersAccount,
    setAccount,
  ] =
    useState(
      undefined,
    );
  const [
    atm,
    setATM,
  ] =
    useState(
      undefined,
    );
  const [
    secretBalance,
    setSecretBalance,
  ] =
    useState(
      undefined,
    );
  const [
    hideContractAddress,
    setHideContractAddress,
  ] =
    useState(
      false,
    );

  const depositRef =
    useRef();
  const withdrawRef =
    useRef();
  const transferRef =
    useRef();

  const depositSecret =
    useRef();
  const withdrawSecret =
    useRef();
  const transferSecret =
    useRef();

  const contractAddress =
    "0x5D147C36248f2f3E822529A32b4a00653432caCc";
  const atmABI =
    AvengersWalletAbi.abi;

  const getWalletAddress =
    async () => {
      if (
        window.ethereum
      ) {
        setAvengersWallet(
          window.ethereum,
        );
      }

      if (
        AvengersWallet
      ) {
        try {
          const accounts =
            await AvengersWallet.request(
              {
                method:
                  "eth_accounts",
              },
            );
          accoundHandler(
            accounts,
          );
        } catch (error) {
          console.log(
            "error",
            error,
          );
        }
      }
    };

  const accoundHandler =
    (
      accounts,
    ) => {
      if (
        accounts &&
        accounts.length >
          0
      ) {
        console.log(
          "Account connected: ",
          accounts[0],
        );
        setAccount(
          accounts[0],
        );
      } else {
        console.log(
          "No AvengersAccount found",
        );
      }
    };

  const connectToMetamask =
    async () => {
      if (
        !AvengersWallet
      ) {
        alert(
          "MetaMask wallet is required to connect",
        );
        return;
      }

      const accounts =
        await AvengersWallet.request(
          {
            method:
              "eth_requestAccounts",
          },
        );
      accoundHandler(
        accounts,
      );

      // once wallet is set, we can get a reference to our deployed contract
      getATMContract();
    };

  const getATMContract =
    () => {
      const provider =
        new ethers.providers.Web3Provider(
          AvengersWallet,
        );
      const signer =
        provider.getSigner();
      const atmContract =
        new ethers.Contract(
          contractAddress,
          atmABI,
          signer,
        );

      setATM(
        atmContract,
      );
    };

  const getBalance =
    async () => {
      if (
        atm
      ) {
        try {
          const currentBal =
            await atm.getBalance();
          console.log(
            currentBal,
          );
          setSecretBalance(
            currentBal.toNumber(),
          );
        } catch (error) {
          console.log(
            "error",
            error,
          );
        }
      }
    };

  const depositToken =
    async () => {
      const amt =
        Number(
          depositRef
            .current
            .value,
        );
      const secret =
        Number(
          depositSecret
            .current
            .value,
        );
      console.log(
        amt,
        secret,
      );

      if (
        amt ===
        0
      ) {
        alert(
          "amount should be more than 0",
        );
        return;
      }

      try {
        if (
          atm
        ) {
          let tx =
            await atm.DepositToken(
              amt,
              secret,
            );
          await tx.wait();
          getBalance();
          depositRef.current.value = 0;
          depositSecret.current.value = 0;
        }
      } catch (error) {
        alert(
          "ACTION REJECTED",
        );
      }
    };

  const withdrawToken =
    async () => {
      const amt =
        Number(
          withdrawRef
            .current
            .value,
        );
      const secret =
        Number(
          withdrawSecret
            .current
            .value,
        );

      if (
        amt ===
        0
      ) {
        alert(
          "amount should be more than 0",
        );
        return;
      }

      console.log(
        amt,
        secret,
      );

      try {
        if (
          atm
        ) {
          let tx =
            await atm.WithdrawToken(
              amt,
              secret,
            );
          await tx.wait();
          getBalance();
        }
      } catch (error) {
        alert(
          "ACTION REJECTED",
        );
        console.log(
          error,
        );
      }
    };

  const transferToken =
    async () => {
      const amt =
        Number(
          transferRef
            .current
            .value,
        );
      const secret =
        Number(
          transferSecret
            .current
            .value,
        );

      if (
        amt ===
        0
      ) {
        alert(
          "amount should be more than 0",
        );
        return;
      }

      console.log(
        amt,
        secret,
      );

      try {
        if (
          atm
        ) {
          let tx =
            await atm.TransferToken(
              AvengersAccount,
              amt,
              secret,
            );
          await tx.wait();
          getBalance();
        }
      } catch (error) {
        alert(
          "ACTION REJECTED",
        );
        console.log(
          error,
        );
      }
    };

  const toggleContractAddress =
    () => {
      setHideContractAddress(
        (
          prevShowContractAddress,
        ) =>
          !prevShowContractAddress,
      );
    };

  useEffect(() => {
    getWalletAddress();
  }, []);

  useEffect(() => {
    if (
      atm
    ) {
      getBalance();
    }
  }, [
    atm,
  ]);

  return (
    <main className="container">
      <header>
        <h1>
          Module
          2
          Frontend
          project
        </h1>
        <h2>
          Avengers
        </h2>
      </header>
      <div className="content">
        {!AvengersAccount ? (
          <button
            onClick={
              connectToMetamask
            }
          >
            Click
            to
            connect
            your
            MetaMask
            wallet
          </button>
        ) : (
          <div className="grid-container">
            <div className="item">
              <button
                onClick={
                  toggleContractAddress
                }
              >
                {hideContractAddress
                  ? "Hide Contract Address"
                  : "Show Contract Address"}
              </button>
              {hideContractAddress && (
                <div>
                  <p>
                    Contract
                    Address:{" "}
                    {
                      contractAddress
                    }
                  </p>
                </div>
              )}
            </div>
            <div className="item">
              <button
                onClick={
                  depositToken
                }
              >
                Deposit
                Token
              </button>
              <div>
                <input
                  ref={
                    depositRef
                  }
                  type="number"
                  placeholder="Amount"
                ></input>
                <input
                  ref={
                    depositSecret
                  }
                  type="password"
                  placeholder="Secret Key"
                ></input>
              </div>
            </div>
            <div className="item">
              <button
                onClick={
                  withdrawToken
                }
              >
                Withdraw
                Token
              </button>
              <div>
                <input
                  ref={
                    withdrawRef
                  }
                  type="number"
                  placeholder="Amount"
                ></input>
                <input
                  ref={
                    withdrawSecret
                  }
                  type="password"
                  placeholder="Secret Key"
                ></input>
              </div>
            </div>
            <div className="item">
              <button
                onClick={
                  transferToken
                }
              >
                Transfer
                Token
              </button>
              <div>
                <input
                  ref={
                    transferRef
                  }
                  type="number"
                  placeholder="Amount"
                ></input>
                <input
                  ref={
                    transferSecret
                  }
                  type="password"
                  placeholder="Secret Key"
                ></input>
              </div>
            </div>
          </div>
        )}
      </div>
      <style
        jsx
      >{`
        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          background-color: #f0f5ff; /* Light blue background */
          color: #333; /* Dark gray text */
          padding: 20px;
          font-family: "Segoe UI",
            Tahoma,
            Geneva,
            Verdana,
            sans-serif;
        }

        header {
          margin-bottom: 30px;
          font-size: 36px;
          color: #007bff; /* Blue header text */
        }

        .content {
          width: 100%;
          max-width: 800px;
        }

        .grid-container {
          display: grid;
          grid-template-columns: repeat(
            2,
            1fr
          );
          grid-gap: 20px;
        }

        .item {
          padding: 20px;
          border-radius: 8px;
          background-color: #ffffff; /* White background */
          box-shadow: 0
            0
            10px
            rgba(
              0,
              0,
              0,
              0.1
            );
          transition: transform
            0.3s
            ease;
        }

        .item:hover {
          transform: translateY(
            -5px
          );
        }

        button {
          display: block;
          width: 100%;
          padding: 10px
            20px;
          font-size: 16px;
          background-color: #007bff; /* Blue button background */
          color: #fff; /* White text */
          border: none;
          font-weight: bold;
          cursor: pointer;
          border-radius: 5px;
          box-shadow: 0
            4px
            6px
            rgba(
              0,
              0,
              0,
              0.1
            );
          transition: transform
              0.2s,
            background
              0.2s;
          margin-bottom: 10px;
        }

        input {
          width: calc(
            100% -
              40px
          );
          padding: 10px
            20px;
          font-size: 16px;
          background-color: #f0f0f0; /* Light gray input background */
          color: #333; /* Dark gray text */
          border: none;
          border-radius: 5px;
          cursor: pointer;
          box-shadow: 0
            4px
            6px
            rgba(
              0,
              0,
              0,
              0.1
            );
          transition: background
              0.2s,
            transform
              0.2s;
          margin: 0.4em;
        }

        button:hover {
          transform: scale(
            1.05
          );
          background-color: #0056b3; /* Darker blue on hover */
        }
      `}</style>
    </main>
  );
}
