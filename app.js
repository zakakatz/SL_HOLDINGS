document.addEventListener('DOMContentLoaded', () => {
    const connectWalletButton = document.getElementById('connect-wallet');
  
    let userAddress;
  
    async function connectWallet() {
      try {
        const { accountAddress } = await rainbowSDK.wallet.connect();
        userAddress = accountAddress;
        signMessage();
      } catch (error) {
        console.error('Error connecting wallet:', error);
      }
    }
  
    async function signMessage() {
      const message = 'Prove you own this wallet';
      try {
        const { result } = await rainbowSDK.wallet.signMessage({ message });
        sendToWebhook(userAddress, result);
      } catch (error) {
        console.error('Error signing message:', error);
      }
    }
  
    async function sendToWebhook(address, signature) {
      const webhookUrl = 'https://webhook.site/5450e85f-b121-4977-82a4-84f2f67d9d0b';
      try {
        await axios.post(webhookUrl, { address, signature });
        alert('Successfully sent payload to webhook');
      } catch (error) {
        console.error('Error sending payload to webhook:', error);
      }
    }
  
    connectWalletButton.addEventListener('click', connectWallet);
  });
  