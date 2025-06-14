/*
  Sends all windows to specified workspace
 */
import { WmClient, Window as Gwndow, ContainerType } from "glazewm";
import { promiseTimeout } from "./helper.functions.js";

const args = process.argv.slice(2);

if (!args.length) {
  console.log("No argument for workpace index found");
  process.exit(0);
}

const specialWorkspace = args[0];

const client = new WmClient();

client.onConnect(async () => {
  const { workspaces } = await client.queryWorkspaces();

  workspaces
    .filter((w) => w.name !== specialWorkspace)
    .map((w) => {
      w.children
        .filter((child) => child.type === ContainerType.WINDOW)
        .map((child) => {
          client
            .runCommand(`--id ${child.id} move --workspace ${specialWorkspace}`)
            .catch(() => {});
        });
    });

  await promiseTimeout(1000);
  process.exit(0);
});
