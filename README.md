# Author Lakjeewa


## To Run front end and back end in dev environment

To run backend - In the image-grid-backend directory, you can run:

### `yarn`
### `yarn start`

To run frontend - In the image-grid-frontend directory, you can run:

### `yarn`
### `yarn start`

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.


## To Run in a docker container
### 1. build with docker - run from the project root
docker build -t image-grid-app:latest .

### 2. Run with docker - run from the project root
docker run --rm -p 80:8042/tcp image-grid-app