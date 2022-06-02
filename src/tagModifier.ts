import yaml from "js-yaml";
import fs from "fs";

export function changeTag(content: string, tag : string) : string {
  const loadedYaml = yaml.load(fs.readFileSync('test/multi/depolyment.yaml', 'utf8'));
  return ""
}
