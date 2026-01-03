# Sync - Collaborative Music Listening App

## Overview

Sync is a real-time music synchronization application that enables users to create and join virtual rooms for collaborative music listening experiences. Built with modern web technologies, it features seamless integration with Spotify and YouTube, allowing friends to listen to music together in perfect sync.
<img width="1289" height="647" alt="image" src="https://github.com/user-attachments/assets/d0faecdb-9727-4f1e-8349-25349d1a46e1" />

## Features

- **Real-time Room Synchronization** - Listen to music together with friends in perfect sync
- **Multi-platform Support** - Integrates with both Spotify and YouTube
- **Room Discovery** - Browse and join featured rooms or create your own
- **Collaborative Queue** - Add songs to shared playlists in real-time
- **Firebase Authentication** - Secure user login and management
- **Redis Caching** - Fast performance with intelligent caching
- **Playlist Geneartor

## Tech Stack

### Frontend
- **Next.js** - React framework with server-side rendering
- **TypeScript** - Type-safe development
- **Firebase Auth** - User authentication
- **Tailwind CSS** - Modern styling
- **Socket.IO Client** - Real-time communication

### Backend
- **Express.js** - Node.js web framework
- **Socket.IO** - Real-time bidirectional communication
- **MongoDB** (Mongoose) - Database for rooms, queues, and users
- **Redis** - Caching layer for improved performance
- **Firebase Admin** - Server-side authentication

### APIs
- Spotify API - Music data and playback
- YouTube API - Video and music streaming
- OpenAI and Geminie

## Project Structure
```
sync/
├── client/                      # Next.js frontend application
│   ├── app/                     # App router pages
│   │   ├── page.tsx            # Home page
│   │   ├── browse/             # Browse rooms
│   │   ├── Discover/           # Discovery features
│   │   └── api/                # API routes
│   ├── components/             # Reusable UI components
│   │   ├── Player.tsx          # Music player component
│   │   ├── Sidebar.tsx         # Navigation sidebar
│   │   └── ...
│   ├── hooks/                  # Custom React hooks
│   ├── store/                  # Context providers (Player, User)
│   ├── lib/                    # Utility functions
│   └── firebase.ts             # Firebase configuration
│
├── server/                     # Express.js backend
│   ├── src/
│   │   ├── index.ts           # Server entry point
│   │   ├── router.ts          # API routes
│   │   ├── functions/         # Route handlers
│   │   ├── middleware/        # Auth & other middleware
│   │   ├── models/            # MongoDB models
│   │   │   ├── Queue.ts
│   │   │   ├── Room.ts
│   │   │   └── User.ts
│   │   └── lib/               # Spotify, YouTube libraries
│   └── cache/redis.ts         # Redis configuration
│
└── README.md
```

## Installation and Setup

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- MongoDB (local or cloud instance)
- Redis server
- Firebase project with authentication enabled
- YouTube Data API key

### Client Setup

1. Navigate to the client directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file with the following variables:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_firebase_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_SOCKET_URL=http://localhost:5000
```

4. Start the development server:
```bash
npm run dev
```

The client runs on `http://localhost:3000`.

### Server Setup

1. Navigate to the server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file with the following variables:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
REDIS_URL=your_redis_url
FIREBASE_SERVICE_ACCOUNT=path_to_firebase_service_account.json
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
YOUTUBE_API_KEY=your_youtube_api_key
JWT_SECRET=your_jwt_secret
CORS_ORIGIN=http://localhost:3000
```

4. Start the server:
```bash
npm start
```

The server runs on `http://localhost:5000`.

## API Endpoints

### Public Endpoints (No Authentication Required)

| Method | Endpoint | Description | Handler |
|--------|----------|-------------|---------|

| GET | `/search` | Search for songs | `search` |
| POST | `/login` | User login | `login` |

### Authenticated Endpoints (Requires Auth Token)

| Method | Endpoint | Description | Handler |
|--------|----------|-------------|---------|
| GET | `/queue/:roomId` | Get queue for a specific room | `getQueue` |
| POST | `/addToQueue` | Add a song to room queue | `addToQueue` |
| GET | `/roomsuser` | Get user's rooms | `getRoom` |
| GET | `/roomsfeatured` | Get featured/public rooms | `featuredRooms` |
| POST | `/createroom` | Create a new room | `createRoom` |

## Application Flow

### 1. User Authentication
Users authenticate via Firebase on the client side. The `/login` endpoint handles server-side validation and returns user data.

### 2. Room Creation
Authenticated users can create rooms through the `/createroom` endpoint. Room data is stored in MongoDB using the `roomModel`.

### 3. Room Discovery & Joining
Users browse available rooms in the Discover section and join rooms they're interested in. Real-time room updates are managed through Socket.IO.

### 4. Music Queue Management
Songs are added to room queues via `/addToQueue`. Queue data is managed with `queueModel` and cached in Redis for optimal performance.

### 5. Synchronized Playback
The `Player` component uses Socket.IO events to synchronize playback across all room members, ensuring everyone hears the same music at the same time.

### 6. Music Data Integration
Music metadata and playback information is fetched from Spotify and YouTube APIs through dedicated library functions.


