# Interactive Quiz 🎯

An engaging web-based quiz application with gamification features, built using React and Express. Test your knowledge while having fun with real-time feedback, achievements, and performance tracking!


## ✨ Features

### Core Functionality
- **Dynamic Quiz Interface**: Beautifully designed, responsive UI with smooth transitions
- **Real-time Progress Tracking**: Monitor your progress as you advance through questions
- **Instant Feedback**: Get immediate feedback on your answers with visual and audio cues
- **Detailed Results Analysis**: Comprehensive breakdown of your performance with charts and statistics

### Gamification Elements
- **Achievement Badges**: Unlock special badges for outstanding performance
- **Streak System**: Build and maintain answer streaks for bonus points
- **Performance Metrics**: Track accuracy, speed, and overall mastery
- **Dynamic Scoring**: Earn points based on accuracy and response time
- **Skill Rating**: Get rated from Novice to Master based on your performance

## 🚀 Technology Stack

### Frontend
- React.js
- Tailwind CSS
- Recharts for data visualization
- Lucide React for icons
- Canvas Confetti for celebrations

### Backend
- Express.js
- Axios for API integration
- CORS for secure cross-origin requests

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager
- Modern web browser

## ⚙️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/interactive-quiz.git
   cd interactive-quiz
   ```

2. **Install dependencies**
   ```bash
   # Install backend dependencies
   cd backend
   npm install

   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

3. **Environment Setup**
   ```bash
   # Backend (.env)
   PORT=5000
   ALLOWED_ORIGINS=http://localhost:5173,https://interactive-quiz-1.onrender.com

   # Frontend (.env)
   VITE_API_URL=http://localhost:5000
   ```

4. **Start the application**
   ```bash
   # Start backend (from backend directory)
   npm run start

   # Start frontend (from frontend directory)
   npm run dev
   ```

5. **Access the application**
   - Frontend: http://localhost:5173
   - Backend: http://localhost:5000

## 🎮 Usage Flow

1. **Start Screen**
   - View quiz rules and instructions
   - See time limits and scoring system
   - Begin the quiz when ready

2. **Quiz Interface**
   - Answer questions within the time limit
   - Track your progress and current score
   - Monitor your achievement badges
   - View real-time feedback on answers

3. **Results Dashboard**
   - See detailed performance analysis
   - View earned badges and achievements
   - Check question-by-question breakdown
   - Track accuracy and time statistics

## 🎯 API Integration

The application integrates with a REST API endpoint that provides quiz data:
```javascript
GET https://api.jsonserve.com/Uw5CrX
```

## 📱 Responsive Design

The application is fully responsive and optimized for:
- Desktop computers
- Tablets
- Mobile devices

## 🏆 Gamification Features

### Achievement Badges
- 🔥 Hot Streak: 3 correct answers in a row
- ⚡ Speed Demon: Quick correct answers
- 🎯 Sharpshooter: High accuracy achievement
- 💫 Legendary: Perfect score achievement

### Performance Metrics
- Real-time accuracy tracking
- Speed-based scoring
- Streak multipliers
- Global leaderboard ranking

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


