# 👗 Fashion Recommendation System

Enhancing the fashion discovery experience using **Transfer Learning**, **Deep Learning (CNN)**, and **Similarity Search**.

---

## 🚀 Introduction

This project is a high-performance fashion recommendation system that leverages the power of **ResNet-50 architecture** for feature extraction and **Annoy** (an optimized K-Nearest Neighbors algorithm) to deliver personalized fashion suggestions based on user-uploaded images. 

By performing feature extraction on a dataset of over **45,000 images**, the system can effectively analyze visual data and identify the top 5 closest matches to a user's input. This showcases the versatility of **Convolutional Neural Networks (CNNs)** and providing a foundation for scalable recommendation engines.

---

## 💻 Methodology

The system uses a two-stage approach:
1.  **Feature Extraction**: A **Convolutional Neural Network (CNN)** (ResNet-50) pre-trained on ImageNet is used to extract high-level visual features from fashion images. We fine-tuned the model by adding global max-pooling layers and replacing the final layers for better feature representation.
2.  **Similarity Search**: An optimized **Nearest Neighbor** algorithm is used to find the most relevant products by calculating the **Cosine Similarity** between extracted feature embeddings.

### 📊 Application Architecture

![Architecture](https://user-images.githubusercontent.com/89743011/170476738-cdfcd048-8bfd-450c-ad58-20ec025d5b7c.png)

### 📈 Application Flow

![Flow Chart](https://user-images.githubusercontent.com/89743011/170476148-5c472690-675b-4907-91c4-9b9804668f6f.png)

---

## 🛠️ Tech Stack & Implementation

The project is split into a robust Python backend and a modern React frontend for the ultimate user experience.

### 🐍 Backend: Fashion-Recommendation-System
- **Core Technology**: Python 3.10+, TensorFlow/Keras
- **Model**: ResNet-50 (Transfer Learning)
- **API Framework**: **FastAPI** (High-performance asynchronous web framework)
- **Similarity Engine**: Scikit-learn (Nearest Neighbors), Annoy
- **Others**: OpenCV, Pandas, NumPy, Pillow, Tqdm

### 🎨 Frontend: Style-Scout-AI (Vercel Deployed)
- **Framework**: **React + Vite** (Fast and modern frontend)
- **Styling**: **Tailwind CSS** & **Shadcn UI** (Premium, beautiful design)
- **State Management**: React Query (TanStack)
- **Icons**: Lucide-React
- **Animations**: Tailwind-Animate, Framer Motion (for smooth transitions)

> [!TIP]
> Instead of a basic Streamlit UI, the latest version of the frontend is a fully responsive React application optimized for performance and aesthetics, **deployed seamlessly on Vercel**.

---

## 📸 Screenshots

### Modern Premium UI
![Main Dashboard](https://user-images.githubusercontent.com/89743011/170464439-56930532-6d7b-4649-b009-09eebfa5a75b.png)

### Personalized Recommendations
![Recommendations](https://user-images.githubusercontent.com/89743011/170464638-15a88b15-fd4c-4ac6-9be5-13a72b0b31a1.png)

---

## 📦 Installation & Setup

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd Fashion-Recommendation-System
   ```
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Run the FastAPI development server:
   ```bash
   python api.py
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd style-scout-ai
   ```
2. Install dependencies (using Bun or NPM):
   ```bash
   bun install # or npm install
   ```
3. Start the development server:
   ```bash
   bun dev # or npm run dev
   ```

---

## 📚 Resources & Dataset

- **Dataset**: [Kaggle Fashion Product Images (Full - 15GB)](https://www.kaggle.com/datasets/paramaggarwal/fashion-product-images-dataset) | [Kaggle Fashion Product Images (Small - 572MB)](https://www.kaggle.com/datasets/paramaggarwal/fashion-product-images-small)
- **Core Technology**: [CNN: Convolutional Neural Network](https://www.analyticsvidhya.com/blog/2022/01/convolutional-neural-network-an-overview/)
- **Programming**: [Python](https://www.python.org/)

---

## ✨ Conclusion

This research-driven framework provides an effective way to explore fashion using visual imagery. By extracting deep visual features and performing similarity searches, we can accurately match user tastes with available inventory, creating a seamless discovery process for consumers.

---
*Developed during the Microsoft Engage Program.*
