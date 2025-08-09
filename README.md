# NanoCmds

A simple Minecraft Bedrock behavior pack with useful commands that require very few keystrokes. 🤩

![Showcase GIF](https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExMzM5bWNzOWlzdXExYnJpczEzcDh5cWRyaDB4dmY3aGt0ODA5eTdsbiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/TiXaxy3OtIfSStfGLP/giphy.gif)

## Available Commands

- `/nanocmds_help`: Display the in-game help menu.

Basic:

- `/e`: Clears all effects.
- `/c`: Clears items from your hotbar.
- `/x`: Kill all floating items in the world.
- `/f`: Moves forward 100 blocks. Stops when the ray hits a block.
- `/v`: Toggles the night vision effect.
- `/s`: Toggles the spectator game mode.

Related to user custom commands:

- `/q <index: number>`: Runs a user custom command.
- `/qs <index: number> [command: string]`: Sets a user custom command. You can remove one by leaving the parameter 'command' unspecified..
- `/ql [index: number]`: Logs a user custom command. You can list all entries by leaving the parameter 'index' unspecified.
- `/qxx`: Clears all user custom commands.

## For Developers :computer:

### Prerequisites

- Git
- Node.js (v22 or later)
- pnpm

### Installation

1. Clone the repository.

```bash
git clone https://github.com/lc-studios-mc/nanocmds.git
```

2. Navigate to the project directory.

```bash
cd nanocmds
```

3. Install dependencies.

```bash
pnpm install
```

4. Copy the pack folder into Minecraft (`com.mojang/development...`).

```bash
# File changes will be synced in real-time!
pnpm run dev
```

### How to create a distributable file (.mcpack)

Run the build script from command-line:

```bash
node scripts/build.js --version MAJOR.MINOR.PATCH # Replace with correct version, such as 1.0.0
```

To quickly remove the dist folder:

```bash
pnpm run clean
```
