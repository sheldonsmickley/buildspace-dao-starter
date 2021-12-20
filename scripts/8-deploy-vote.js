import sdk from "./1-initialize-sdk.js";

const appModule = sdk.getAppModule(
  "0xcBAb78C59B46Db399935F3fdAE22565f11234e19"
);

(async () => {
  try {
    const voteModule = await appModule.deployVoteModule({
      name: "SoulsDAO's Epic Proposals",
      votingTokenAddress: "0xcA760D220242eE620C8F3373B9fB17A076F71DcA",
      proposalStartWaitTimeInSeconds: 0,

      proposalVotingTimeInSeconds: 24 * 60 * 60,

      votingQuorumFraction: 0,
      minimumNumberOfTokensNeededToPropose: "1",
    });

    console.log(
      "✅ Successfully deployed vote module, address:",
      voteModule.address
    );
  } catch (err) {
    console.log("Failed to deploy vote module", err);
  }
})();
