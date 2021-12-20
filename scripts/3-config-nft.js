import sdk from "./1-initialize-sdk.js";

import { readFileSync } from "fs";

const bundleDrop = sdk.getBundleDropModule(
  "0x890949175789bd898b65E414dC83798f92AfBf02"
);

(async () => {
  try {
    await bundleDrop.createBatch([
      {
        name: "Soulsborne Mark",
        description: "This NFT will give you access to SoulsDAO!",
        image: readFileSync("scripts/assets/souls-fire.png"),
      },
    ]);
    console.log("✅ Successfully created a new NFT in the drop!");
  } catch (error) {
    console.error("failed to create the new NFT", error);
  }
})();
