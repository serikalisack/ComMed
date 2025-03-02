# Real-Time Chat Website with MERN Stack, Socket.io, Redux Toolkit, and Tailwind CSS

This is a real-time chat website that allows users to connect with each other and chat in real-time. It was built using the MERN stack (MongoDB, Express.js, React.js, and Node.js), Socket.io, Redux Toolkit, and Tailwind CSS.

- If you liked it, give this repository a Star⭐

## Inspiration

This project was inspired by the work of [Shakir Farhan](https://www.youtube.com/watch?v=11oZj2jBhOE), whose video tutorial guided the idea and structure of this chat application.

## Technologies Used

- MERN stack (MongoDB, Express.js, React.js, and Node.js)
- Socket.io
- Redux Toolkit
- Tailwind CSS

## Features

- **Real-time chat**: Users can send and receive messages in real-time.
- **User authentication**: Users can sign up, log in, and log out using JWT and Google Auth.
- **Group creation**: Users can create chat rooms and invite others to join.
- **Notifications**: Users receive notifications for new messages.
- **Emojis**: Users can send and receive emojis in messages.
- **Profile page**: Users can update their avatar and display name.
- **Chat rooms**: Users can create private or public rooms to communicate with others.
- **Search functionality**: Users can search for messages, contacts, or groups.
- **Responsive design**: The website is optimized for different screen sizes and devices.

## Configuration and Setup

To run this project locally, fork and clone the repository ([ComMed Repository](https://github.com/serikalisack/ComMed.git)) or download it as a ZIP file and extract it.

### Prerequisites

Ensure you have the following installed:
- Node.js
- MongoDB
- Git

### Installation Steps

#### 1. Setting up the Client

```sh
cd client
cp .env.example .env
```

Fill in the `.env` file with:
```
REACT_APP_GOOGLE_CLIENT_ID=<your_google_client_id>
REACT_APP_SERVER_URL='http://localhost:8000'
```

```sh
npm install  # Install dependencies
npm start    # Start the client
```

#### 2. Setting up the Server

```sh
cd server
cp .env.example .env
```

Fill in the `.env` file with:
```
PORT=8000
URL=<your_database_url>
SECRET=<your_secret_key>
CLIENT_ID=<your_google_client_id>
BASE_URL="http://localhost:3000"
```

```sh
npm install  # Install dependencies
npm start    # Start the server
```

## Contributing

Contributions to this project are welcome! If you find a bug or want to add a feature, please submit an issue or a pull request. To contribute, follow these steps:

1. Fork the repository.
2. Create a new branch for your feature:
   ```sh
   git checkout -b my-new-feature
   ```
3. Make changes and commit them:
   ```sh
   git commit -m 'Add some feature'
   ```
4. Push your branch to your forked repository:
   ```sh
   git push origin my-new-feature
   ```
5. Create a Pull Request.

## License

This project is open-source and available under the MIT License.

