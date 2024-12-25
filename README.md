# Simple MongoDB Project

This is a simple project demonstrating how to use MongoDB with Express.js to manage user data. The project includes functionality to add users, view all users, and view aggregated user data.

## Prerequisites

- Node.js
- MongoDB

## Setup

1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/simple-mongodb-project
    ```
2. Navigate to the project directory:  
    ```sh
    cd simple-mongodb-project
    ```

3. Install dependencies:
    ```sh
    npm install
    ```

4. Start MongoDB server:
    ```sh
    mongod
    ```

5. Start the application:
    ```sh
    node index.js
    ```

6. Open your browser and navigate to `http://localhost:3000`.

## Endpoints

- `GET /` - Serves the main page with a form to add users.
- `POST /addUser` - Adds a new user to the database.
- `GET /aggrigate` - Returns aggregated user data (average age by city).

### Adding a User

1. Open the main page at `http://localhost:3000`.
2. Fill out the form with the user's name, age, and city.
3. Click "Add User" to submit the form.

### Output Example:
1. Adding user using form

![add user](/img/Slide127.png)

2. Added into database (MongoDB)

![mongodb](/img/Slide115.png)

3. Showing aggrigate users

![on /aggrigate](/img/Slide117.png)

```bash
User inserted successfully
Average age of users in different cities: 
City: Patna, Average Age: 21.6
City: Grater Noida, Average Age: 20.6
City: Bhopal, Average Age: 20.5
City: Begaluru, Average Age: 20
City: Darbhanga, Average Age: 19
```