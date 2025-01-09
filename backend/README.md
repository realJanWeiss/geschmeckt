
## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```


## Deployment

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
