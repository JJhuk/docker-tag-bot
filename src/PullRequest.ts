import { Octokit } from "@octokit/core";
import { OptionBuilder } from "./optionBuilder";
import { composeCreatePullRequest } from "octokit-plugin-create-pull-request";
import config from "config";

export function PullRequest(octokit: Octokit) {
  return {
    async pullRequest(prNum: number, commitHash: string) {
      const resp = await octokit.request(
        "GET /repos/{owner}/{repo}/pulls/{pull_number}",
        {
          owner: config.get<string>("pr.owner"),
          repo: config.get<string>("pr.repo"),
          pull_number: prNum,
        }
      );
      const labelNames = resp.data.labels.map((x) => {
        return x.name;
      });

      const optionBuilder = new OptionBuilder(
        labelNames as string[],
        commitHash
      );

      const commits = optionBuilder.build();

      if (commits == null) {
        return;
      }

      return await composeCreatePullRequest(octokit, commits);
    },
  };
}
