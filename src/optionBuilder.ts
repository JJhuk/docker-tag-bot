import {
  Changes,
  Options,
} from "octokit-plugin-create-pull-request/dist-types/types";
import { changeTag } from "./tagModifier";

export class OptionBuilder {
  private readonly labels: string[];
  private readonly commitHash: string;

  constructor(labels: string[], commitHash: string) {
    this.labels = labels;
    this.commitHash = commitHash;
  }

  public createChanges(): Changes[] {
    return this.labels.map((label: string) => {
      const yamlContent = changeTag(label, this.commitHash);

      let change: Changes = {
        files: {
          [yamlContent.path]: yamlContent.content,
        },
        commit: `change ${label} docker image tag`,
      };

      return change;
    });
  }

  build(): Options {
    const changes = this.createChanges();

    return {
      owner: "docker-tag-commit-bot",
      repo: "repo-name",
      title: "pull request title",
      body: "pull request description",
      base: "main" /* optional: defaults to default branch */,
      head: "pull-request-branch-name",
      forceFork:
        false /* optional: force creating fork even when user has write rights */,
      createWhenEmpty: false,
      changes: changes,
    };
  }
}
