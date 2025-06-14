# GlazeVm extension scripts

This is my collection of scripts for GlazeVm

## Build

Files will build to dist folder. These can be moved

```
npm install
npm run build
```

## focusWorkspaceOnMonitor and moveToWorkspaceOnMonitor

Simulates isolated workspaces per monitor.
Configuration:

- prefix workspace name with monitor index
- add bindings for focus workspace
- add bindings for move to workspace

```
workspaces:
  # monitor 0
  - name: "01"
    display_name: "1"
    bind_to_monitor: 0
    keep_alive: true
  - name: "11"
    display_name: "2"
    bind_to_monitor: 1
    keep_alive: true

keybindings:
  - commands:
      [
        'shell-exec --hide-window node "PATH_TO_DIR\dist\focusWorkspaceOnMonitor.js" 1',
      ]
    bindings: ["lwin+1"]
  - commands:
      [
        'shell-exec --hide-window node "PATH_TO_DIR\dist\focusWorkspaceOnMonitor.js" 2',
      ]
    bindings: ["lwin+2"]

  - commands:
      [
        'shell-exec --hide-window node "PATH_TO_DIR\dist\moveToWorkspaceOnMonitor.js" 1',
      ]
    bindings: ["lwin+shift+1"]
  - commands:
      [
        'shell-exec --hide-window node "PATH_TO_DIR\dist\moveToWorkspaceOnMonitor.js" 2',
      ]
    bindings: ["lwin+shift+2"]
```

## moveAllToWorkspace

Moves all windows to a single screen. I use this when i have another computer connected to same monitors and i cant see all workspaces.

```
 - commands:
      [
        'shell-exec --hide-window node "PATH_TO_DIR\dist\moveAllToWorkspace.js" 21',
      ]
    bindings: ["lwin+shift+m"]
```
