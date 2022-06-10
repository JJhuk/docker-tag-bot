import { Octokit } from "@octokit/core";
import { OptionBuilder } from "./optionBuilder";
import { composeCreatePullRequest } from "octokit-plugin-create-pull-request";

export function PullRequest(octokit: Octokit) {
  return {
    async pullRequest(labels: string[], commitHash: string) {
      const optionBuilder = new OptionBuilder(labels, commitHash);
      return await composeCreatePullRequest(octokit, optionBuilder.build());
    },
  };
}
