# Next.Js Next E-Shop

To run Locally, we need the database.

```
docker-compose up -d
```

- The -d, means **detached**

## Set environment variables

Rename the file **.env.template** to **.env**

- MongoDB URL Local:

```
MONGODB_URI=mongodb://localhost:27017/eshopdb
```

- Rebuild node modules and run Next

```
yarn install
yarn dev
```
