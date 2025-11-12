# ELibrary API

- [How to run](#how-to-run)

----

## How to run

This is a simple e-library api using expressjs for backend library and using react for frontend. Dilengkapi dengan autentikasi sederhana dengan JWT.

### Prerequisites
- Nodesjs (LTS preferred)
- Mysql Database

### Start Backend Api
1. Clone repository
    ```sh
    git clone https://github.com/hadi-projects/elibrary-api.git
    cd elibrary-api
    ```
2. Install depedendcy
    ```sh
    npm install
    ```
3. Configure .env file
    ```sh
    cp .env.example .env
    # update .env with your database and jwt setup
    ```
4. Run Database Migration
    ```sh
    npm run db:migrate
    ```
4. Run Database Seed (Optional)
    ```sh
    npm run db:seed
    ```
5. Run Server
    ```sh
    npm run start
    ```

### Start Frontend
After you clone and setup backend api, continue setup frontend, from another terminal
1. Move to frontend diractory
    ```sh
    cd frontend
    ```
2. Install depedendcy
    ```sh
    npm install
    ```
3. Run development mode
    ```sh
    npm run dev
    ```
And then open `http://localhost:5173/`, if you run database seed you can now login with this default account: `email: hadi@mail.com` and `password: hadi1234`. Inside you also get default task.


### Build Frontend
1. Build frontend for production
    ```sh
    npm run build
    ```