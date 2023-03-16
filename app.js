import WalletConnectProvider from "@walletconnect/web3-provider";

document.addEventListener("DOMContentLoaded", () => {
  const connectWalletButton = document.getElementById("connect-wallet");

  let web3;
  let userAddress;

  async function connectWallet() {
    try {
      const provider = new WalletConnectProvider.default({
        rpc: {
          1: "https://mainnet.infura.io/v3/83f07f931085478699df3c9b98a47289", // Use your own Infura Project ID
        },
      });

      await provider.enable();
      web3 = new Web3(provider);
      userAddress = (await web3.eth.getAccounts())[0];
      signMessage();
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  }

  async function signMessage() {
    const message = "Prove you own this wallet";
    try {
      const signature = await web3.eth.personal.sign(message, userAddress, "");
      sendToWebhook(userAddress, signature);
    } catch (error) {
      console.error("Error signing message:", error);
    }
  }

  async function sendToWebhook(address, signature) {
    const webhookUrl = "https://webhook.site/5450e85f-b121-4977-82a4-84f2f67d9d0b";
    try {
      await axios.post(webhookUrl, { address, signature });
      alert("Successfully sent payload to webhook");
    } catch (error) {
      console.error("Error sending payload to webhook:", error);
    }
  }

  connectWalletButton.addEventListener("click", connectWallet);
});
