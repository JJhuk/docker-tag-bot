import { Octokit } from "@octokit/core";
import { PullRequest } from "./PullRequest";

const MyOctokit = Octokit.plugin(PullRequest);

const token = process.argv[2];
const prNum = +process.argv[3];
const commitHash = process.argv[4];

const octokit = new MyOctokit({
  auth: token,
});

console.log(`pr ${prNum}, commits ${commitHash}`);

octokit.pullRequest(prNum, commitHash).then(console.log);
