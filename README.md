# NanoCmds

A simple Minecraft Bedrock behavior pack with useful commands that require very few keystrokes.

![Showcase GIF](https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExMzM5bWNzOWlzdXExYnJpczEzcDh5cWRyaDB4dmY3aGt0ODA5eTdsbiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/TiXaxy3OtIfSStfGLP/giphy.gif)

- **Run `/nanocmds_help` to display the help menu.**
- This pack requires Minecraft Bedrock 1.21.100 or later.
- This pack does NOT require experiments.

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

```bash
node scripts/build.js --version MAJOR.MINOR.PATCH # Replace with correct version, such as 1.0.0
```

To quickly remove the dist folder:

```bash
pnpm run clean
```
