import {Changes, Options} from "octokit-plugin-create-pull-request/dist-types/types";
import {labelToPath} from "./labels";

export class OptionBuilder {
  private readonly labels: string[];

  constructor(labels: string[]) {
    this.labels = labels
  }

  private convertToPath()
  {
    for (let i = 0; i < this.labels.length; i++) {
      const label = this.labels[i];
      label
    }
  }

  public createChanges(label: string) : Changes {
    const path = label
    return {
      files : {
        "Deploy/eks/" : "content1",
      },
      commit : "commit message",
    }
  }

  build() : Options {
    return {
      owner: "docker-tag-commit-bot",
      repo: "repo-name",
      title: "pull request title",
      body: "pull request description",
      base: "main" /* optional: defaults to default branch */,
      head: "pull-request-branch-name",
      forceFork: false /* optional: force creating fork even when user has write rights */,
      createWhenEmpty: false,
      changes: [
        {
          /* optional: if `files` is not passed, an empty commit is created instead */
          files: {},
          commit: "creating file1.txt, file2.png, deleting file3.txt, updating file4.txt (if it exists), file5.sh",
          emptyCommit: false,
        },
      ],
    }
  }
}
