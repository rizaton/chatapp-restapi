## API Endpoints

The API endpoint is already in the swagger documentation, in the /api-docs route.

### Authentication Routes

| Method | Endpoint                  | Description          |
| ------ | ------------------------- | -------------------- |
| POST   | `/api/auth/register`      | Register a new user  |
| POST   | `/api/auth/login`         | User login           |
| POST   | `/api/auth/refresh-token` | Refresh access token |
| POST   | `/api/auth/logout`        | Logout user          |

### User Routes

| Method | Endpoint                    | Description         |
| ------ | --------------------------- | ------------------- |
| GET    | `/api/users/`               | Get all users       |
| GET    | `/api/users/:_id`           | Get user by ID      |
| GET    | `/api/users/chatrooms/:_id` | Get user chat rooms |
| POST   | `/api/users/create`         | Create a new user   |
| PUT    | `/api/users/edit/:_id`      | Update user details |
| DELETE | `/api/users/delete/:_id`    | Delete a user       |

### Chat Room Routes

| Method | Endpoint                      | Description            |
| ------ | ----------------------------- | ---------------------- |
| GET    | `/api/chatrooms/`             | Get all chat rooms     |
| POST   | `/api/chatrooms/create`       | Create a new chat room |
| GET    | `/api/chatrooms/info/:_id`    | Get chat room info     |
| PUT    | `/api/chatrooms/edit/:_id`    | Update chat room       |
| GET    | `/api/chatrooms/members/:_id` | Get chat room members  |
| DELETE | `/api/chatrooms/delete/:_id`  | Delete a chat room     |

### Message Routes

| Method | Endpoint                      | Description                 |
| ------ | ----------------------------- | --------------------------- |
| GET    | `/api/messages/`              | Get all messages            |
| GET    | `/api/messages/user/:_id`     | Get messages by user        |
| GET    | `/api/messages/chatroom/:_id` | Get messages in a chat room |
| POST   | `/api/messages/:chatRoom`     | Create a new message        |
| PUT    | `/api/messages/edit/:_id`     | Edit a message              |
| DELETE | `/api/messages/delete/:_id`   | Delete a message            |

### Call Log Routes

| Method | Endpoint                  | Description              |
| ------ | ------------------------- | ------------------------ |
| GET    | `/api/calllogs/`          | Get all call logs        |
| GET    | `/api/calllogs/user/:_id` | Get call logs for a user |
| POST   | `/api/calllogs/call`      | Start a call             |
| PUT    | `/api/calllogs/call/:_id` | Update call status       |
| PUT    | `/api/calllogs/end/:_id`  | End a call               |

### Notification Routes

| Method | Endpoint                       | Description            |
| ------ | ------------------------------ | ---------------------- |
| GET    | `/api/notifications/`          | Get all notifications  |
| GET    | `/api/notifications/:_id`      | Get user notifications |
| PUT    | `/api/notifications/edit/:_id` | Update notification    |

## Middleware

The `protect` middleware is used to secure certain routes, ensuring that only authenticated users can access them.
