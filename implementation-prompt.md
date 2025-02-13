# Implementation Prompt: Telegram-Clone Chat Software for Chinese Users

## Project Overview
Develop a chat software that mimics Telegram's interface and functionality, tailored for Chinese users. The software should be adaptive to both mobile and desktop screens, support multi-language switching (primarily Simplified Chinese), and integrate Telegram's API for authentication and chat synchronization. The software must not rely on Google-related APIs or restricted third-party services.

## Key Features and Requirements

### Core Chat Features
1. Messaging:
   - Send text, voice messages, pictures, files, and videos
   - Support for emoticons and stickers
   - Message read/unread reminders

2. Voice and Video Calls:
   - Implement high-quality voice and video call functionality

3. Group Chat:
   - Create and manage group chats with multiple users

4. Device Adaptability:
   - Ensure fully responsive design for mobile phones, tablets, and computers

5. Multi-Language Support:
   - Default language: Simplified Chinese
   - Option to switch between multiple languages

6. User Registration:
   - Allow users to register without providing a phone number or email address

7. One-Click Login via Telegram:
   - Integrate Telegram's API for seamless one-click login
   - Users can log in using their Telegram account

### Advanced Features
1. Telegram Group Synchronization:
   - Integrate an NPC (bot) to synchronize chat content from a Telegram group to the website
   - Synchronize user avatars and usernames to make the website appear as if real people are chatting

2. Blockchain Integration:
   - Explore blockchain integration for enhanced security or additional features (e.g., tokenized rewards)

3. Communication Encryption:
   - Use Shadowsocks or similar tools to ensure secure and encrypted communication

## Technical Requirements

### Frontend
- Use Telegram's open-source frontend code (available on GitHub) as a base
- Modify the UI to match Telegram's interface exactly
- Ensure the interface is adaptive to different screen sizes

### Backend
- Develop a robust backend to handle messaging, file transfers, and synchronization
- Implement WebSockets for real-time communication between the frontend and backend

### Telegram Integration
- Integrate Telegram's API for authentication and one-click login
- Develop a Telegram bot to synchronize chat content from Telegram groups to the website

### Blockchain Integration
- Research and implement blockchain technology for added functionality (e.g., secure transactions, user rewards)

### No Third-Party APIs
- Avoid reliance on Google or other restricted third-party APIs

## Implementation Steps

1. Project Setup:
   - Set up development environment
   - Clone and analyze Telegram's open-source frontend code

2. Frontend Development:
   - Adapt Telegram's UI for both mobile and desktop views
   - Implement multi-language support with Simplified Chinese as default

3. Backend Development:
   - Set up server and database
   - Implement core messaging functionality
   - Develop WebSocket integration for real-time communication

4. Telegram Integration:
   - Implement Telegram API for one-click login
   - Develop Telegram bot for group chat synchronization

5. Advanced Features:
   - Implement voice and video call functionality
   - Integrate blockchain features (if applicable)
   - Implement Shadowsocks for communication encryption

6. Testing and Optimization:
   - Conduct thorough testing on various devices and network conditions
   - Optimize performance for Chinese users

7. Deployment:
   - Set up hosting infrastructure suitable for Chinese users
   - Deploy and monitor the application

## Additional Notes
- Refer to Telegram's official website and GitHub repository for open-source code and documentation
- A demonstration of the one-click login process via Telegram will be provided for reference
- Prioritize user-friendliness, security, and full functionality for Chinese users
- Maintain regular communication with the client (@pythonjavaphp on Telegram) for updates and clarifications

## Contact Information
Telegram: @pythonjavaphp (available online at all times for queries and updates)

