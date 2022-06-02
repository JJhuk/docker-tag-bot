import { composeCreatePullRequest } from "octokit-plugin-create-pull-request";
import { Changes } from "octokit-plugin-create-pull-request/dist-types/types";
import { OptionBuilder } from "./optionBuilder";
import { Octokit } from "@octokit/core";


export function myPlugin(octokit : Octokit) {
  return {
    async myFunction(labels : string[]) {
      // custom code here
      octokit.request("")
      const optionBuilder = new OptionBuilder(labels);
      // more custom code here

      let build = optionBuilder.build();

      return await composeCreatePullRequest(octokit, build);
    },
  };
}
