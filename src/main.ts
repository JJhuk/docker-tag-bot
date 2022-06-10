import { Octokit } from "@octokit/core";
import yargs from "yargs";
import { changeTag } from "./tagModifier";
import { PullRequest } from "./PullRequest";

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

if ((argv.labels as string[]) && (argv.commits as string)) {
  octokit
    .pullRequest(argv.labels as string[], argv.commits as string)
    .then(console.log);
} else {
  console.log("No labels provided");
}
// See https://octokit.github.io/rest.js/#octokit-routes-pulls-create
