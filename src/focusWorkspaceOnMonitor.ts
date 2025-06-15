/*
    Focus workspace on same monitor
    simulates isolated workspaces
    inspiration from https://gist.github.com/sam-lex/2f854cacff3efe94abbc232e84d3ce10
*/
import { WmClient } from "glazewm";
import { promiseTimeout } from "./helper.functions.js";

const args: string[] = process.argv.slice(2);

if (!args.length) {
  console.log("No argument for workpace index found");
  process.exit(0);
}
const workspaceIndex: string = args[0];

const client = new WmClient();
client.onConnect(async () => {
  const { monitors } = await client.queryMonitors();
  const monitorIndex = monitors.findIndex((m) => m.hasFocus);
  await client.runCommand(`focus --workspace ${monitorIndex}${workspaceIndex}`);

  await promiseTimeout(1000);
  process.exit(0);
});
