import {Octokit} from "@octokit/core";
import {myPlugin} from "./myPlugin";
import yargs from "yargs";
import {changeTag} from "./tagModifier";

changeTag("", "1");

const MyOctokit = Octokit.plugin(myPlugin);

const argv = yargs(process.argv.slice(2)).options({
  token: { type: 'string', default: false},
  labels: {type: 'array'},
}).parseSync();

const octokit = new MyOctokit({
  auth: argv.token,
});

if (argv.labels as string[]) {
  octokit
    .myFunction(argv.labels as string[])
    .then(console.log);
}
else {
  console.log("No labels provided");
}
// Returns a normal Octokit PR response
// See https://octokit.github.io/rest.js/#octokit-routes-pulls-create
