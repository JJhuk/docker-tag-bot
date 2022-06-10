import { Octokit } from "@octokit/core";
import { PullRequest } from "./PullRequest";
import yargs from "yargs";

const MyOctokit = Octokit.plugin(PullRequest);

const argv = yargs(process.argv.slice(2))
  .options({
    token: { type: "string" },
    labels: { type: "array" },
    commits: { type: "string" },
  })
  .parseSync();

const octokit = new MyOctokit({
  auth: argv.token,
});

console.log(`label ${argv.labels}, commits ${argv.commits}`);

octokit
  .pullRequest(argv.labels as string[], argv.commits as string)
  .then(console.log);
