
<!-- list your team members, state that you choose the open project option, and pick a short, catchy name for your team. -->
# 💞 [Heartcoded](https://github.com/ajpieroni/316Heartcoded-Web-App) Milestone 3

### [Demo for Milestone 3](https://drive.google.com/file/d/1i6EpLoG3NOWbUDSI5yH01EBABEntnZTM/view?usp=sharing)

## Tech Stack:
- Docker Containers for each service, custom images
- **Frontend**: React
- **Backend**: Ruby on Rails
- **Database**: PostgreSQL
- **Database** Administration: Adminer
- Redis, caching and background jobs with Sidekiq
- Ports:
    - React: `localhost:3001`
    - Rails: `localhost:3000`
    - Adminer: `localhost:4000` 

### Team Members
- Anna Zhang - Built Profile component
- Alexander Pieroni - setup tech stack, setup user context, established id route, built Chat component
- Eileen Cai - fixed docker file, built Questions component
- Lily Neusaenger - built Matches component, met with Alex Chao for schema
- Linda Wang - built Password component
- Jacob Lee - built Feedback component, met with Alex Chao for schema

## How to Run Heartcoded
1. Clone the repository
2. Get `.env` files (one in `/ourapp`, one in `/reactapp`) from team members, should be in Code.zip
3. `cd ourapp`
4. `docker-compose build`
5. `docker-compose up`

### Known Runtime Errors
If you have an `ENOENT LIFECYCLE` error, it means that you need to `npm install` in the docker terminal, which you can do as follows within your terminal, in /ourapp:
1. `docker compose run frontend bash`
2. Check that the node_modules folder is empty:
    -   `cd node_modules`
    -   `ls`
    - The return should be empty, at which point you can:
    - `cd ..`
3. Install npm: `npm install`
4. Once installed, you can `docker-compose down` and `docker-compose up`.

### Error with FK Violation
This occurs due to an ongoing error that we're investigating of certain migrations running out of order. If there is an `exit code 1` on the backend container, you can comment out the three `rake` commands in the `docker-entrypoint-rails.sh`.



https://github.com/ajpieroni/316Heartcoded-Web-App 
