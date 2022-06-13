import fs from "fs";
import YAML from "yaml";
import config from "config";

export function changeTag(label: string, hash: string): YamlContent {
  const path: string = config.get(`yaml-path.${label}`);
  if (path == undefined) {
    throw `cannot resolve label ${label}`;
  }

  const registryPath = config.get("image-registry");
  const readFileSync = fs.readFileSync(path, "utf8");
  const parsed = YAML.parseDocument(readFileSync);

  YAML.visit(parsed, {
    Pair(_, pair) {
      // @ts-ignore
      if (pair.key && pair.key.value === "image") {
        pair.value = `${registryPath}/${label}:main-${hash}`;
      }
    },
  });

  return {
    content: String(parsed),
    path: path,
  };
}

export interface YamlContent {
  content: string;
  path: string;
}
