from github import Github
import argparse
import subprocess
import os


def get_repo(token):
    g = Github(token)
    return g.get_repo("JJhuk/docker-tag-bot")


def get_labels(repo):
    target_label = ['gdos', 'match', 'multi']
    pr = repo.get_pull(30)
    label_list = [x.name for x in pr.labels]
    return list(filter(lambda x: x in target_label, label_list))


def create_branch(branch_name):
    print(f'created branch {branch_name}')
    subprocess.run(["git", "branch", branch_name])
    subprocess.run(["git", "checkout", branch_name])


# https://kubectl.docs.kubernetes.io/references/kustomize/kustomization/images/#setting-a-tag-from-the-latest-commit-sha
def commit(label, repository, short_sha):
    os.chdir(label)
    image = f'{repository}/nk-backend/{label}:main-{short_sha}'
    subprocess.run(["kustomize", "edit", image], capture_output=True, check=True, text=True)
    subprocess.run(["git", "add", "-A"])
    subprocess.run(["git", "commit", "-m", f'edit-image-tag-{label}'])
    os.chdir('../')


def create_pull_request(labels, repository, short_sha, repo):
    branch_name = f'edit-image-tag-{short_sha}'
    create_branch(branch_name)
    for label in labels:
        commit(label, repository, short_sha)

    subprocess.run(["git", "push", "-u", "origin", branch_name])
    pr = repo.create_pull(
        title="docker-image-update",
        head=branch_name,
        base="main",
    )
    print(f'created pull request {pr.number}')


def main():
    print(os.getcwd())
    os.chdir("test")
    parser = argparse.ArgumentParser()
    parser.add_argument("token")
    parser.add_argument("repository")
    parser.add_argument("short_sha")
    parser.add_argument("pr_num")
    args = parser.parse_args()

    repo = get_repo(args.token)
    labels = get_labels(repo)
    create_pull_request(labels, "677979501910.dkr.ecr.ap-northeast-2.amazonaws.com", args.short_sha, repo)


if __name__ == "__main__":
    main()
