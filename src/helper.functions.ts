// Taken from https://gist.github.com/sam-lex/f6b433c7b5c713bac8aae5c444376a9c

import { ContainerType, Window, WmClient } from "glazewm";

export function promiseTimeout(ms: number): Promise<void> {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}

export async function getWindow(
  client: WmClient,
  windowId: string
): Promise<Window | undefined> {
  const { windows } = await client.queryWindows();
  return windows.find((w) => w.id === windowId);
}

export async function attemptFocus(
  client: WmClient,
  windowId: string,
  maxAttempts = 20
) {
  const stickyWindow = await getWindow(client, windowId);
  if (!stickyWindow) {
    console.warn(`Window with ID ${windowId} not found.`);
    return;
  }
  let attemptsLeft = maxAttempts;
  let { focused } = await client.queryFocused();
  /* Focused should always be a Window Type,
     Even if it were to focus an empty workspace, the previous move
     call would make it focus the sticky window
   */
  if (focused.type !== ContainerType.WINDOW) return;

  while (focused.id !== windowId && attemptsLeft > 0) {
    // Match the state first (Tiling / floating / fullscreen)
    if (focused.state.type !== stickyWindow.state.type) {
      console.log(`fs:${focused.state.type} || sw:${stickyWindow.state.type}`);

      await client.runCommand("wm-cycle-focus");
    } else {
      // Attempt Focus
      if (focused.x > stickyWindow.x)
        await client.runCommand("focus --direction left");
      else if (focused.x < stickyWindow.x)
        await client.runCommand("focus --direction right");
      else if (focused.y > stickyWindow.y)
        await client.runCommand("focus --direction up");
      else if (focused.y < stickyWindow.y)
        await client.runCommand("focus --direction down");
      attemptsLeft -= 1;
    }

    focused = (await client.queryFocused()).focused as Window;
  }
}
