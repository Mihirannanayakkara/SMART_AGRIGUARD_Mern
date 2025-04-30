# 🌿 Plant Disease Identification and Treatment Recommendation System

A web-based AI-powered platform that helps **farmers, home gardeners, and agriculture officers** identify plant diseases and receive treatment recommendations. Users can upload plant images, consult AI for solutions, contact regional managers, read articles, and even purchase fertilizers — all in one platform.

---

## 🛠️ Technologies Used

- **Frontend**: React.js (Vite), Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (MERN Stack)
- **AI Integration**:
  - Custom trained **Plant Disease Classification Model**
  - **Gemini API** (via Google AI Studio and Google Cloud) for treatment recommendations
- **Geo API**: For bubble map visualization of plant disease locations
- **Authentication & Authorization**

---

## ⚙️ Key Features

### 🌱 Plant Disease Identification
- Users upload a plant image.
- The system uses a trained ML model to predict the plant disease.

### 🤖 AI Treatment Recommendations
- Gemini API provides actionable treatment suggestions based on disease input.

### 🧑‍💼 Regional Manager Assistance
- If users are unsatisfied with AI recommendations, they can submit a form to a **regional manager**.
- Managers view inquiries and locations on a **Geo API bubble map**.
- Managers can respond via the dashboard.

### 🧪 Fertilizer Store
- Users can browse and purchase fertilizers.

### 📚 Articles and Resources
- Read informative articles about plant diseases and prevention techniques.

### 🔐 Admin Dashboard
- Admins manage users, content, and view system insights.

## 🚀 Getting Started

### Prerequisites
- Node.js
- MongoDB

### Installation

```bash
# Clone the repository
git clone https://github.com/Mihirannanayakkara/SMART_AGRIGUARD_Mern.git

# Install dependencies
npm install

# Start the development server
npm run dev
