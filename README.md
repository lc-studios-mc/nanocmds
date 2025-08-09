# NanoCmds

A simple Minecraft Bedrock behavior pack with useful commands that require very few keystrokes.

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
# Changes will be synced automatically!
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
