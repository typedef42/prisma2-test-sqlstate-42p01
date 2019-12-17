# prisma2 SqlState("42P01") error when running tests

## how to init & prepare docker pgsql

```shell
yarn
docker network create infra
yarn run db:up
```


## how to run in dev (witch works)

```shell
yarn run db:generate
yarn run start:dev
```
then launch playground on http://localhost:3000/graphql


## how to reproduce test problems

```shell
yarn run test
```
