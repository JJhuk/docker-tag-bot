import yaml from "js-yaml";
import fs from "fs";
import { labelToPath } from "./labels";
import { Deployment, Fleet } from "./yamlSchemes/scheme";

export function changeTag(tag: string, hash: string): YamlContent {
  const path = labelToPath[tag];
  if (path == undefined) {
    throw `cannot resolve label ${tag}`;
  }

  const loadedYaml = yaml.load(fs.readFileSync(path, "utf8"));
  let image: string;
  if (tag == "multi") {
    const fleetYaml = loadedYaml as Fleet;
    image = fleetYaml.spec.template.spec.template.spec.containers[0].image;
  } else {
    const deploymentYaml = loadedYaml as Deployment;
    image = deploymentYaml.spec.template.spec.containers[0].image;
  }

  //todo should extract to config
  const registryPath = "path";
  image = `${registryPath}/${tag}:main-${hash}`;

  return {
    content: yaml.dump(loadedYaml),
    path: path,
  };
}

export interface YamlContent {
  content: string;
  path: string;
}
