## Configuration and Setup

To run this project locally, fork and clone the repository ([ComMed](https://github.com/serikalisack/ComMed.git)) or download it as a zip file and extract it to your machine.

### Prerequisites
- Node.js installed
- MongoDB installed and running
- Preferred code editor (VS Code recommended)

### Steps
1. Open the project in your preferred code editor.
2. Open a terminal and split it into two sections: one for the client and another for the server.

### Client Setup

#### 1. Navigate to the Client Directory
```bash
$ cd client
```

#### 2. Create an Environment Configuration File
Create a `.env` file in the root of the `client` directory and add the following credentials:
```bash
REACT_APP_GOOGLE_CLIENT_ID=<Your Google Client ID>
REACT_APP_SERVER_URL='http://localhost:8000'
```

#### 3. Obtain Google Client ID
To get your Google Client ID for authentication, follow these steps:
- Visit the [Google Credentials Page](https://console.cloud.google.com/apis/credentials)
- If you are new, first [create a new project](https://console.cloud.google.com/projectcreate)
- Click **Create credentials** > **OAuth client ID**
- Select **Web application** as the application type
- Name your OAuth client and click **Create**
- Add the following URLs as authorized redirect URIs:
  - `http://localhost:3000`
  - `http://localhost:3000/login`
- Copy the generated **Client ID** and paste it into your `.env` file.

#### 4. Install Dependencies and Start the Client
```bash
$ npm install  # Install client dependencies
$ npm start    # Start the client
```

### Server Setup

#### 1. Navigate to the Server Directory
```bash
$ cd server
```

#### 2. Create an Environment Configuration File
Create a `.env` file in the root of the `server` directory and add the following credentials:
```bash
PORT=8000
URL=<Your Database URL>
SECRET=<Your Secret Key>
CLIENT_ID=<Your Google Client ID>
BASE_URL="http://localhost:3000"
```

#### 3. Install Dependencies and Start the Server
```bash
$ npm install  # Install server dependencies
$ npm start    # Start the server
```

## Contributing

Contributions are welcome! If you find a bug or want to add a feature, submit an issue or a pull request.

### Steps to Contribute
1. Fork the repository
2. Create a new branch: `git checkout -b my-new-feature`
3. Make changes and commit: `git commit -m 'Add some feature'`
4. Push to your forked repository: `git push origin my-new-feature`
5. Create a Pull Request

