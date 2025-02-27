from pyexpat import model
from fastapi import FastAPI, File, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import io
from keras.api.models import load_model
import numpy as np
from PIL import Image


# Define the index_to_class dictionary
index_to_class = {
    0: "Recyclable",
    1: "Non-Recyclable"
}

app = FastAPI()

# Enable CORS for frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins (or specify ["http://localhost:5173"])
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

@app.get("/")
def home():
    return {"message": "Waste Classification API is running!"}

def preprocess_data(img):
    img=img.resize((224,224))
    img=np.array(img)
    scale_img=img/255.0
    expand_img=np.expand_dims(scale_img,axis=0)
    return expand_img


@app.post("/classify")
async def classify_waste(image: UploadFile = File(...)):
    if not image.filename.lower().endswith((".png",".jpg",".jpeg")):
        raise HTTPException(status_code=400, details="Please upload a valid image.")
    try:
      model=load_model('../models/model.h5')
      # Read the uploaded file bytes
      image_bytes = await image.read()
      # Convert bytes to an image using PIL
      image_pil = Image.open(io.BytesIO(image_bytes))

      label_dict={0:'Non Biodegradable',1:'Organic',2:'Recycle'}

      # Convert PIL image to NumPy array
      img=preprocess_data(image_pil)
      #   image_array = np.array(image_pil)
      label=np.argmax(model.predict(img),axis=1)[0]
      confidence=round(np.max(model.predict(img)) * 100, 2)
      return {'label':label_dict[label],'confidence': f"{confidence}%"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction failed: {e}")

    # Simulate ML classification (randomly choose recyclable or non-recyclable)
    # result = random.choice(["Recyclable", "Non-Recyclable"])
    
    # return {"classification": result}

    # uvicorn main:app --host 0.0.0.0 --port 3000 --reload
