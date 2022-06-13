import {
  Changes,
  Options,
} from "octokit-plugin-create-pull-request/dist-types/types";
import { changeTag } from "./tagModifier";
import config from "config";

export class OptionBuilder {
  private readonly labels: string[];
  private readonly commitHash: string;

  constructor(labels: string[], commitHash: string) {
    this.labels = labels;
    this.commitHash = commitHash;
  }

  private createChanges(): Changes[] {
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

  public build(): Options {
    const changes = this.createChanges();

    return {
      owner: config.get("pr.owner"),
      repo: config.get("pr.repo"),
      title: `change docker image tag-${this.commitHash}`,
      body: "pull request description",
      head: `docker-image-tag-${this.commitHash}`,
      forceFork: false,
      createWhenEmpty: false,
      changes: changes,
    };
  }
}
