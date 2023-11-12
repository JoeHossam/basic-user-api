# saqaya-task-user-api
Simple API to create and get users with access tokens

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Technolgies Used](#technolgies-used)

## Getting Started
1. Navigate to desired location on your device
1. open terminal/command line and run  `git clone https://github.com/JoeHossam/saqaya-task-user-api`

### Prerequisites
1. Nodejs
1. Postgres database (local or remote)

### Installation
1. run `npm i` to install all dependencies
2. populate the `.env` file with reference to the `.env.example` file
3. run `npm run dev` to start development server on your machine

## Usage
open your preferred API calling platform
>Note: the port in the url is set to the port you provide in the .env
### Endpoints
- GET `http://localhost:3000/api/v1/user/{id}`
    - requires access token provided in `Authorization` header as `Bearer {token}`
    - returns user data
- POST `http://localhost:3000/api/v1/user`
    - does not require token
    - requires the following object in request body as json data
    ``` JSON
    {
        "firstName": "Michael",
        "lastName": "Knight",
        "email": "info@saqaya.com",
        "marketingConsent": false
    }
    ```
    
## Technolgies Used
- TypeScript
- Node
- Express
- zod
- jsonwebtoken
- dotenv
- pg