/**
 * MERN Stack Project Configuration
 * 
 * This file serves as a central configuration reference for the entire project.
 * It documents the project structure, dependencies, and setup instructions.
 */

const config = {
  // Project Structure
  structure: {
    backend: {
      server: 'Express.js',
      database: 'MongoDB',
      authentication: 'JWT',
      fileStorage: 'Cloudinary',
      payment: 'Cashfree',
      aiIntegration: 'Google Gemini',
      audioProcessing: 'ElevenLabs',
      codeExecution: 'Judge0',
    },
    frontend: {
      framework: 'React with Vite',
      styling: 'Tailwind CSS',
      stateManagement: 'Context API',
      uiComponents: 'Radix UI',
      routing: 'React Router',
      apiClient: 'Axios',
    },
    flask: {
      purpose: 'Machine Learning / Data Processing',
      framework: 'Flask',
    }
  },
  
  // Environment Setup Instructions
  setup: {
    prerequisites: [
      'Node.js (v14+)',
      'npm or yarn',
      'MongoDB Atlas account',
      'Python 3.8+ (for Flask service)',
    ],
    installation: {
      backend: [
        '1. cd backend',
        '2. npm install',
        '3. cp .env.example .env (and fill in your environment variables)',
        '4. npm run dev',
      ],
      frontend: [
        '1. cd frontend',
        '2. npm install',
        '3. cp .env.example .env (and fill in your environment variables)',
        '4. npm run dev',
      ],
      flask: [
        '1. cd flask',
        '2. pip install -r requirements.txt',
        '3. python backend.py',
      ]
    }
  },
  
  // API Documentation Reference
  apiEndpoints: {
    auth: [
      { path: '/api/user/register', method: 'POST', description: 'Register new user' },
      { path: '/api/user/login', method: 'POST', description: 'User login' },
      { path: '/api/user/verify-otp', method: 'POST', description: 'Verify OTP' },
      { path: '/api/user/me', method: 'GET', description: 'Get current user' },
    ],
    courses: [
      { path: '/api/usercourse/getallcourses', method: 'GET', description: 'Get all courses' },
      { path: '/api/usercourse/getcourse/:id', method: 'GET', description: 'Get course by ID' },
      { path: '/api/usercourse/mycourses', method: 'GET', description: 'Get user courses' },
      { path: '/api/usercourse/publishcourse', method: 'POST', description: 'Publish a course' },
    ],
    resume: [
      { path: '/api/userresume/getalluserresume/:userId', method: 'GET', description: 'Get all user resumes' },
      { path: '/api/userresume/getuserresumebyid/:resumeId', method: 'GET', description: 'Get resume by ID' },
      { path: '/api/userresume/savemyresume', method: 'POST', description: 'Save resume' },
      { path: '/api/userresume/deleteuserresume/:resumeId', method: 'DELETE', description: 'Delete resume' },
    ],
    payment: [
      { path: '/api/payment/pay', method: 'POST', description: 'Create payment' },
      { path: '/api/payment/verify/:orderId', method: 'GET', description: 'Verify payment' },
    ],
    // Add more endpoint categories as needed
  },
};

module.exports = config;