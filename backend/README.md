
## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# for regular development
$ npm run start:dev

# for regular development if you want to first run necessary migrations
$ npm run start:prod
```

### Building database migrations

If you want to make TypeORM automatically check if migrations need to be done.

```bash
npm run typeorm:generate-migration --name=provideNameWhichDescribesChange
```

If you want to create an empty migration file which you can populate with your changes.

```bash
npm run typeorm:create-migration --name=provideNameWhichDescribesChange
```

> ⚠️ Both commands generate a file in your `src/migrations` folder. You need to import and add them to the `migrations` list in the `typeorm.config.ts`.

To run migrations. (it will figure out which ones are missing by checking against the database's migration table)

```bash
npm run typeorm:run-migrations
```

## Deployment to FH Cloud

Configure a Node environment on the FH Cloud. The command to run the application:

```
NODE_ENV=production node dist/src/main.js
```

Deploying on FH Cloud without automation 😢

1. Build the image
2. Start the container
```bash
docker create --name temp-container geschmeckt
```
3. extract the content of the container
```bash
docker cp temp-container:/usr/src/app ./output
```
4. upload the content of the `output` folder via FTP to the FH Cloud
5. make sure to provide the credentials for the database
