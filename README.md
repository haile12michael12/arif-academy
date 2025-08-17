# Arif Academy 🎓

A comprehensive AI-powered learning platform designed to help students build professional portfolios, gain career insights, and connect with industry experts.

## 🌟 Features

### 🎯 Core Services
- **AI Resume Builder** - Create professional resumes with AI assistance
- **AI Interview Practice** - Mock interviews with AI-powered feedback
- **Portfolio Builder** - Build stunning professional portfolios
- **AI Course Creator** - Generate personalized learning courses
- **Coding Practice** - Solve coding problems with real-time feedback
- **Career Insights** - Industry knowledge and career guidance

### 🚀 Advanced Features
- **Riverflow Q&A Platform** - Community-driven question and answer system
- **AI Podcast Creator** - Generate and manage educational podcasts
- **Job Finder** - AI-powered job recommendations
- **Industry Insights** - Real-time career market analysis
- **Online Assessments** - Comprehensive skill testing
- **Company Roadmap** - Career path planning tools
- **Learning Path Visualization** - Interactive visual learning journey
- **Community Forum** - Connect with peers and industry experts
- **AI Study Assistant** - 24/7 personalized learning support
- **Gamified Learning Experience** - Achievement badges, leaderboards, and rewards

## 🛠️ Tech Stack

### Frontend
- **React.js** - Modern UI framework
- **Vite** - Fast build tool
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **React Icons** - Icon library
- **Framer Motion** - Animation library

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Cloudinary** - Cloud image management
- **JWT** - Authentication
- **Multer** - File upload handling

### AI & ML
- **Google Gemini AI** - Advanced AI model integration
- **OpenAI API** - AI-powered features
- **Custom AI Models** - Specialized learning algorithms

### Additional Tools
- **Flask** - Python backend for ML features
- **Payment Integration** - Secure payment processing
- **Email Services** - Automated notifications
- **Scheduling System** - Automated task management

## 📁 Project Structure

```
arif-academy/
├── frontend/                 # React.js frontend application
│   ├── src/
│   │   ├── AIResume/        # Resume builder components
│   │   ├── AIInterview/     # Interview practice features
│   │   ├── AIPodcast/       # Podcast creation tools
│   │   ├── AIPortfolioBuilder/ # Portfolio building
│   │   ├── AICourse/        # Course creation system
│   │   ├── Coding/          # Coding practice platform
│   │   ├── Dashboard/       # User dashboard
│   │   ├── Riverflow/       # Q&A community platform
│   │   ├── home/            # Landing page components
│   │   └── services/        # API services
├── backend/                  # Node.js backend server
│   ├── Config/              # Database and cloudinary config
│   ├── Controller/          # API controllers
│   ├── Models/              # Database models
│   ├── Routes/              # API routes
│   ├── Middlewares/         # Authentication middleware
│   └── jobs/                # Background jobs
└── flask/                   # Python ML backend
    └── backend.py           # ML model integration
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB
- Python 3.8+
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/arif-academy.git
   cd arif-academy
   ```

2. **Install Frontend Dependencies**
   ```bash
   cd frontend
   npm install
   ```

3. **Install Backend Dependencies**
   ```bash
   cd ../backend
   npm install
   ```

4. **Install Python Dependencies**
   ```bash
   cd ../flask
   pip install -r requirements.txt
   ```

### Environment Setup

1. **Create environment files**
   ```bash
   # Backend (.env)
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   CLOUDINARY_CLOUD_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_cloudinary_key
   CLOUDINARY_API_SECRET=your_cloudinary_secret
   GEMINI_API_KEY=your_gemini_api_key
   ```

2. **Configure database**
   - Set up MongoDB database
   - Import initial data if needed

### Running the Application

1. **Start Backend Server**
   ```bash
   cd backend
   npm start
   ```

2. **Start Frontend Development Server**
   ```bash
   cd frontend
   npm run dev
   ```

3. **Start Python ML Server** (optional)
   ```bash
   cd flask
   python backend.py
   ```

## 🎯 Key Features Explained

### AI Resume Builder
- Professional template selection
- AI-powered content suggestions
- Real-time preview
- Multiple export formats
- Custom styling options

### AI Interview Practice
- Industry-specific questions
- Real-time speech analysis
- Comprehensive feedback
- Performance tracking
- Mock interview scenarios

### Portfolio Builder
- Drag-and-drop interface
- Custom domain support
- SEO optimization
- Analytics integration
- Mobile responsive design

### AI Course Creator
- Personalized learning paths
- Interactive quizzes
- Progress tracking
- Certificate generation
- Adaptive learning algorithms

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### Resume Builder
- `POST /api/resume/create` - Create new resume
- `GET /api/resume/:id` - Get resume details
- `PUT /api/resume/:id` - Update resume
- `DELETE /api/resume/:id` - Delete resume

### Interview Practice
- `POST /api/interview/start` - Start interview session
- `POST /api/interview/submit` - Submit interview response
- `GET /api/interview/feedback` - Get interview feedback

### Course Management
- `POST /api/courses/create` - Create new course
- `GET /api/courses` - Get all courses
- `PUT /api/courses/:id` - Update course
- `DELETE /api/courses/:id` - Delete course

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines
- Follow ESLint configuration
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- **Meet Dodiya** - Full Stack Developer & Project Lead
- **Hailemichael Assefa** - Backend Developer
- **Arif Academy Team** - AI/ML Specialists

## 📞 Contact

- **Email**: contact@arifacademy.com
- **Phone**: +251 123-4567
- **Location**: Addis Ababa, Ethiopia


## 🙏 Acknowledgments

- Google Gemini AI for advanced AI capabilities
- MongoDB for reliable database services
- Cloudinary for image management
- React community for excellent documentation
- All contributors and beta testers

## 📊 Project Status

- ✅ Core features implemented
- ✅ AI integration complete
- ✅ Payment system integrated
- ✅ User authentication working
- 🔄 Continuous improvements
- 🔄 New features in development

---

**Made with ❤️ by Arif Academy Team**

*Empowering students to build their future careers through AI-powered learning experiences.*