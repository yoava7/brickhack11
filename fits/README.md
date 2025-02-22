# Fits

## Overview
Fits is a web application that recommends personalized outfits based on events, weather, and user preferences. The project uses AI to analyze clothing items, interpret styles, and generate outfit suggestions.

## Features
- AI-powered outfit recommendations
- Weather-based clothing suggestions
- Event-specific styling advice
- User-friendly carousel to browse outfit options

## Tech Stack
- **Frontend:** Next.js (React), Tailwind CSS
- **Backend:** Next.js
- **Database:** MongoDB
- **AI Integration:** ViT-Base AI

## Installation & Setup
### Prerequisites
- Node.js & npm
- MongoDB

### Steps
1. **Clone the Repository**
   ```sh
   git clone https://github.com/yourusername/outfit-generator.git
   cd outfit-generator
   ```
2. **Install Frontend Dependencies**
   ```sh
   cd frontend
   npm install
   ```
3. **Run the Frontend**
   ```sh
   npm run dev
   ```
4. **Setup Backend**
   - If using Flask:
     ```sh
     cd backend
     pip install -r requirements.txt
     python app.py
     ```
   - If using Spring Boot:
     ```sh
     cd backend
     ./mvnw spring-boot:run
     ```
5. **Run MongoDB** (if not using a cloud database)
   ```sh
   mongod --dbpath ./data
   ```

## Folder Structure
```
├── src
│   ├── app
│   │   ├── components
│   │   │   ├── ui
│   │   │   │   ├── button.js
│   │   │   │   ├── card.js
│   │   ├── changing-room
│   │   │   ├── carousel-section.js
│   ├── pages
│   ├── styles
├── backend
│   ├── app.py (Flask backend)
│   ├── server.js (Node.js backend alternative)
│   ├── src (Spring Boot alternative)
├── public
│   ├── assets
├── README.md
```

## Contributing
1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature-name`)
3. **Commit your changes** (`git commit -m 'Add feature'`)
4. **Push to the branch** (`git push origin feature-name`)
5. **Create a Pull Request**

## License
This project is licensed under the MIT License.

## Contact
For questions or contributions, reach out via [your email or GitHub].

