# Beagle Backend TypeScript CLI
This is the CLI for [Beagle Backend TypeScript](https://github.com/ZupIT/beagle-backend-ts), where you can quickly create a new project and generate screens.

## Setting Up a Project
Install the Beagle Backend TypeScript CLI globally:
```
npm install -g @zup-it/beagle-backend-typescript-cli
```

Create a new project:
```
beagle-ts new [PROJECT NAME]
```

Run the application:
```
cd [PROJECT NAME]
npm run start
```

## Generating a Screen
Go to the project root and run:
```
beagle-ts generate-screen [SCREEN NAME]
```

The new screen will be generated inside the folder: `src/screens`, or inside the folder defined on the attribute `screensFolderPath` in the configuration file `./beagle-ts.json`.

For the full documentation of Beagle Backend TypeScript CLI, please go to the [Official Page](https://github.com/ZupIT/beagle-backend-ts/wiki/CLI).
