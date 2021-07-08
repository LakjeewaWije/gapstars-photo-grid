# Author Lakjeewa


## To Run front end and back end in dev environment

To run backend - From the image-grid-backend directory, you can run:

### `yarn`
### `yarn start`

Open [http://localhost:8042](http://localhost:8042) to view it in the browser.

To run frontend - From the image-grid-frontend directory, you can run:

### `yarn`
### `yarn start`

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.


## To Run in a docker container
### 1. build with docker - run from the project root
docker build -t image-grid-app:latest .

### 2. Run with docker - run from the project root
docker run --rm -p 80:8042/tcp image-grid-app

Issue : Cannot call the api using react app with in docker container but docker Image builds and runs well.

Open [http://localhost:80](http://localhost:80) to view it in the browser.

## Test cases

Created a single test case to check whether app component renders the intial page.


## Validations in front end

Missing Restrict user only for 9 favourite images.