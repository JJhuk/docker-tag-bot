import { Octokit } from "@octokit/core";
import { OptionBuilder } from "./optionBuilder";
import { composeCreatePullRequest } from "octokit-plugin-create-pull-request";

export function PullRequest(octokit: Octokit) {
  return {
    async pullRequest(labels: string[], commitHash: string) {
      // custom code here
      const optionBuilder = new OptionBuilder(labels, commitHash);
      // more custom code here
      let build = optionBuilder.build();
      return await composeCreatePullRequest(octokit, build);
    },
  };
}
