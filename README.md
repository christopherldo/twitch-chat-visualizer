# Twitch Chat Visualizer

![GitHub repo size](https://img.shields.io/github/repo-size/christopherldo/twitch-chat-visualizer?style=for-the-badge)
![GitHub language count](https://img.shields.io/github/languages/count/christopherldo/twitch-chat-visualizer?style=for-the-badge)
![GitHub forks](https://img.shields.io/github/forks/christopherldo/twitch-chat-visualizer?style=for-the-badge)

> A professional, real-time Twitch chat overlay application designed for streamers and content creators. Built with Node.js and Socket.IO for seamless integration with OBS Studio and other broadcasting software.

## 🌟 Features

### Core Functionality
- **Real-time Chat Display**: Live Twitch chat messages with zero delay
- **Transparent Overlay Mode**: Perfect for OBS browser sources with customizable transparency
- **Full Emote Support**: Native Twitch emotes, BetterTTV (BTTV), and FrankerFaceZ (FFZ) integration
- **Moderation Events**: Real-time display of message deletions and moderation actions
- **Custom Styling**: Comprehensive customization options for colors, fonts, and layout

### Technical Features
- **WebSocket Communication**: Real-time bidirectional communication using Socket.IO
- **Twitch API Integration**: Official Twitch API support via TMI.js
- **Responsive Design**: Works across different screen sizes and resolutions
- **Docker Support**: Containerized deployment for easy hosting
- **Environment Configuration**: Secure credential management with environment variables

## 🛠️ Technology Stack

- **Backend**: Node.js, Express.js
- **Real-time Communication**: Socket.IO
- **Twitch Integration**: TMI.js (Twitch Messaging Interface)
- **Template Engine**: Mustache.js
- **Frontend**: Vanilla JavaScript, HTML5, CSS3
- **Containerization**: Docker & Docker Compose
- **Package Management**: Yarn

## 📋 Prerequisites

- Node.js 18+ (Alpine Linux compatible)
- Yarn package manager
- Twitch Developer Application (for API credentials)
- Docker (optional, for containerized deployment)

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/christopherldo/twitch-chat-visualizer.git
cd twitch-chat-visualizer
```

### 2. Install Dependencies
```bash
yarn install
```

### 3. Environment Setup
```bash
cp .env.example .env
```

Edit the `.env` file with your Twitch application credentials:
```env
PORT=3000
CLIENT_ID=your_twitch_client_id
CLIENT_SECRET=your_twitch_client_secret
```

**Getting Twitch Credentials:**
1. Visit the [Twitch Developer Console](https://dev.twitch.tv/console)
2. Create a new application
3. Set OAuth Redirect URL to `http://localhost:3000`
4. Copy the Client ID and Client Secret to your `.env` file

### 4. Start the Application
```bash
yarn start
```

The application will be available at `http://localhost:3000`

## 🐳 Docker Deployment

### Using Docker Compose (Recommended)
```bash
docker-compose up -d
```

### Using Docker Directly
```bash
docker build -t twitch-chat-visualizer .
docker run -p 3000:3000 --env-file .env twitch-chat-visualizer
```

## 📺 Usage Guide

### For Streamers

1. **Access the Application**: Navigate to your hosted instance or `http://localhost:3000`
2. **Enter Channel Name**: Input your Twitch channel name and click "OK"
3. **Customize Appearance**: Use the settings gear (⚙️) to configure:
   - Username colors and backgrounds
   - Message colors and backgrounds
   - Font sizes
   - Transparency settings
4. **Generate Overlay URL**: Enable "Transparent" mode to get the overlay URL
5. **Add to OBS**: 
   - Create a new "Browser Source" in OBS Studio
   - Paste the transparent overlay URL
   - Set width to 400px (recommended)
   - Adjust height as needed

### For Developers

#### Project Structure
```
src/
├── app/
│   ├── controllers/          # Application controllers
│   │   ├── ChatController.js     # Chat rendering logic
│   │   ├── MessageController.js  # Message processing
│   │   ├── SocketController.js   # WebSocket handling
│   │   └── RequestsController.js # API requests
│   └── middlewares/          # Express middlewares
├── helpers/                  # Utility functions
├── views/                    # Mustache templates
│   ├── chat.mustache           # Main chat view
│   ├── transparent.mustache    # Transparent overlay
│   └── partials/               # Reusable components
├── server.js                 # Application entry point
├── routes.js                 # Route definitions
├── sockets.js                # Socket.IO configuration
└── viewEngine.js             # Template engine setup
```

#### Key Components

- **ChatController**: Handles chat visualization and routing
- **SocketController**: Manages WebSocket connections and real-time communication
- **MessageController**: Processes and formats chat messages with emote support
- **RequestsController**: Handles Twitch API requests for badges and emotes

#### API Endpoints

- `GET /` - Main application interface
- `POST /` - Channel selection handler
- `GET /:channel` - Chat visualization page
- `GET /:channel/transparent` - Transparent overlay mode

#### WebSocket Events

- `username` - Channel connection initialization
- `transparent` - Transparent link generation
- `disconnect` - Connection cleanup

## 🎨 Customization Options

- **Username Styling**: Background colors, text colors
- **Message Styling**: Background colors, text colors, font sizes
- **Transparency**: Full transparency support for overlay usage
- **Emote Integration**: Automatic emote replacement and sizing
- **Badge Display**: Subscriber and moderator badges

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `PORT` | Server port (default: 3000) | No |
| `CLIENT_ID` | Twitch application client ID | Yes |
| `CLIENT_SECRET` | Twitch application client secret | Yes |

### Dependencies

| Package | Purpose |
|---------|----------|
| `express` | Web framework |
| `socket.io` | Real-time communication |
| `tmi.js` | Twitch chat integration |
| `mustache-express` | Template rendering |
| `axios` | HTTP requests |
| `dotenv` | Environment configuration |
| `cors` | Cross-origin resource sharing |
| `moment` | Date/time formatting |
| `uuid` | Unique identifier generation |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Support

If you find this project helpful, please consider:

- ⭐ Starring this repository
- 🐛 Reporting bugs and issues
- 💡 Suggesting new features
- 💸 [Supporting via PayPal](https://streamelements.com/christopherldo/tip)

## 📞 Contact

- GitHub: [@christopherldo](https://github.com/christopherldo)
- Project Link: [https://github.com/christopherldo/twitch-chat-visualizer](https://github.com/christopherldo/twitch-chat-visualizer)

---

**Made with ❤️ for the streaming community**
