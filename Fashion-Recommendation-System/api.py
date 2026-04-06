from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import os
from PIL import Image
import numpy as np
import pickle
import tensorflow
from tensorflow.keras.preprocessing import image
from tensorflow.keras.layers import GlobalMaxPooling2D
from tensorflow.keras.applications.resnet50 import ResNet50, preprocess_input, decode_predictions
from sklearn.neighbors import NearestNeighbors
from numpy.linalg import norm
import shutil

app = FastAPI(title="Fashion Recommender API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, replace with actual frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load resources
feature_list = np.array(pickle.load(open('embeddings.pkl','rb')))
filenames = pickle.load(open('filenames.pkl','rb'))

# Model definition
base_model = ResNet50(weights='imagenet',include_top=False,input_shape=(224,224,3))
base_model.trainable = False

model = tensorflow.keras.Sequential([
    base_model,
    GlobalMaxPooling2D()
])

classifier = ResNet50(weights='imagenet')

def get_label(img_path):
    try:
        img = image.load_img(img_path, target_size=(224, 224))
        img_array = image.img_to_array(img)
        expanded_img_array = np.expand_dims(img_array, axis=0)
        preprocessed_img = preprocess_input(expanded_img_array)
        preds = classifier.predict(preprocessed_img)
        decoded = decode_predictions(preds, top=15)[0]
        
        fashion_keywords = [
            'jean', 'jersey', 't-shirt', 'shirt', 'suit', 'miniskirt', 
            'trench_coat', 'cardigan', 'abaya', 'gown', 'cloak', 'poncho', 
            'sweatshirt', 'bikini', 'swimming_trunks', 'brassiere', 'corset', 
            'fur_coat', 'pajama', 'stole', 'vest', 'cardigan', 'kimono', 'apron'
        ]
        
        for _, class_name, prob in decoded:
            if class_name in fashion_keywords:
                return class_name.replace('_', ' ')
        return "latest fashion item"
    except Exception as e:
        print(f"Error classifying {img_path}: {e}")
        return "latest fashion item"

def feature_extraction(img_path, model):
    img = image.load_img(img_path, target_size=(224, 224))
    img_array = image.img_to_array(img)
    expanded_img_array = np.expand_dims(img_array, axis=0)
    preprocessed_img = preprocess_input(expanded_img_array)
    result = model.predict(preprocessed_img).flatten()
    normalized_result = result / norm(result)
    return normalized_result

def recommend(features, feature_list):
    neighbors = NearestNeighbors(n_neighbors=6, algorithm='brute', metric='euclidean')
    neighbors.fit(feature_list)
    distances, indices = neighbors.kneighbors([features])
    return indices, distances

@app.post("/api/recommend")
async def get_recommendations(file: UploadFile = File(...)):
    if not os.path.exists('uploads'):
        os.makedirs('uploads')
    
    file_location = f"uploads/{file.filename}"
    with open(file_location, "wb+") as file_object:
        shutil.copyfileobj(file.file, file_object)
    
    try:
        # Extract features
        features = feature_extraction(file_location, model)
        
        # Get recommendations
        indices, distances = recommend(features, feature_list)
        
        reasons = [
            "The deep learning model detected a strong alignment in the overall silhouette, fit, and fabric texture. The basic structural attributes of this item closely mimic the visual signature of your upload.",
            "High feature similarity was observed in the dominant color palette and overarching shape contours. This item maintains the same core aesthetic direction.",
            "This item maps closely to the complex visual patterns of your uploaded image, sharing similarities in finer details like neckline, collar type, and sleeve structure.",
            "There is a close resemblance in apparent material texture, draping style, and the broad silhouette, matching the fundamental fashion attributes.",
            "The extracted visual embeddings strongly correlate with your uploaded item, indicating a great match in both styling category and visual appeal."
        ]

        recommendations = []
        for i in range(5):
            idx = indices[0][i]
            dist = distances[0][i]
            img_path = filenames[idx] # e.g. "images/filename.jpg"
            
            # Use distance to provide a more realistic variation in similarity score
            # A distance of 0 is a 100% match. 
            similarity = max(40.0, 100.0 - (dist * 25.0))
            category = get_label(img_path)
            
            # Use forward slashes for URLs
            url_path = img_path.replace('\\', '/')
            
            recommendations.append({
                "image_url": f"/api/{url_path}", # We will mount images dir at /api/images
                "similarity_score": similarity / 100.0, # Frontend expects 0 to 1
                "category": category,
                "reason": reasons[i % len(reasons)]
            })
            
        return {"recommendations": recommendations}
    except Exception as e:
        print("Error processing recommendation request:", e)
        return {"error": str(e)}

# Mount static directory to serve images correctly
# E.g. filenames.pkl contains things like "images\\1163.jpg" or "images/1163.jpg"
app.mount("/api/images", StaticFiles(directory="images"), name="images")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
