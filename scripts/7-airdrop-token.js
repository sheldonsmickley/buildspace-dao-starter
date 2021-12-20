import { ethers } from "ethers";
import sdk from "./1-initialize-sdk.js";

const bundleDropModule = sdk.getBundleDropModule(
  "0x890949175789bd898b65E414dC83798f92AfBf02"
);

const tokenModule = sdk.getTokenModule(
  "0xcA760D220242eE620C8F3373B9fB17A076F71DcA"
);
(async () => {
  try {
    // Grab all the addresses of people who own our membership NFT, which has
    // a tokenId of 0.
    const walletAddresses = await bundleDropModule.getAllClaimerAddresses("0");

    if (walletAddresses.length === 0) {
      console.log("No NFTs have been claimed yet, get some friends ya loser!");
      process.exit(0);
    }

    // Loop through the array of addresses.
    const airdropTargets = walletAddresses.map(address => {
      // Pick a random # between 1000 and 10000.
      const randomAmount = Math.floor(
        Math.random() * (10000 - 1000 + 1) + 1000
      );
      console.log("✅ Going to airdrop", randomAmount, "tokens to", address);

      // Set up the target.
      const airdropTarget = {
        address,
        // Remember, we need 18 decimal placees!
        amount: ethers.utils.parseUnits(randomAmount.toString(), 18),
      };

      return airdropTarget;
    });

    // Call transferBatch on all our airdrop targets.
    console.log("🌈 Starting airdrop...");
    await tokenModule.transferBatch(airdropTargets);
    console.log(
      "✅ Successfully airdropped tokens to all the holders of the NFT!"
    );
  } catch (err) {
    console.error("Failed to airdrop tokens", err);
  }
})();
