from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import pickle
from pydantic import BaseModel
import pandas as pd
app = FastAPI()
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
class Suggestion(BaseModel):
    Region:int
    City:int
    Neighborhood:int
    RSClass:int
    RStype:int
    RSNumber:int
    Size:float

with open('app/Saudi_RealState_Classifier.pkl','rb') as P:
    model=pickle.load(P)

@app.post('/')
def suggestions_endpoint(item:Suggestion):
    df = pd.DataFrame([item.dict().values()],columns=item.dict().keys())

    pred=model.predict(df)
    
    return{ 'pred': int(pred)}

@app.get('/')
async def HW():
    return 'Hello World!!!'