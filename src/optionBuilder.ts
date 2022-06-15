import { Changes, Options } from "octokit-plugin-create-pull-request/dist-types/types";
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
    let yaml: { [key: string]: string } = config.get("yaml-path");
    return this.labels
      .filter((x) => x in yaml)
      .map((label: string) => {
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

  public build(): Options | null {
    const changes = this.createChanges();

    if (changes.length == 0) {
      return null;
    }

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
