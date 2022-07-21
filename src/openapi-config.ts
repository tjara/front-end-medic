import type { ConfigFile } from "@rtk-query/codegen-openapi";

const config: ConfigFile = {
  schemaFile: "../openapi.json",
  apiFile: "./Store/emptyApi.ts",
  apiImport: "emptySplitApi",
  outputFile: "./Store/medicApi.ts",
  exportName: "medicApi",
  hooks: true,
};

export default config;
