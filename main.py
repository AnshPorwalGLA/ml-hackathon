from fastapi import FastAPI
from pydantic import BaseModel
from typing import List
import numpy as np
import nltk
from nltk.sentiment import SentimentIntensityAnalyzer


nltk.download("vader_lexicon")

app = FastAPI(title="MoodLens ML Service")


class Post(BaseModel):
    text: str
    timestamp: str


class AnalyzeRequest(BaseModel):
    userId: str
    posts: List[Post]


@app.get("/ml/health")
def health():
    return {"status": "ok", "service": "ml_service"}


sia = SentimentIntensityAnalyzer()



@app.post("/ml/analyze")
def analyze(req: AnalyzeRequest):
    posts = req.posts

    if len(posts) == 0:
        return {"error": "No posts provided"}

    sentiment_scores = [
        sia.polarity_scores(p.text)["compound"]
        for p in posts
    ]

    avg_sentiment = float(np.mean(sentiment_scores))

    if avg_sentiment < -0.4:
        risk_level = "high"
    elif avg_sentiment < 0.1:
        risk_level = "medium"
    else:
        risk_level = "low"

    depression_score = round((1 - avg_sentiment) / 2, 2)
    anxiety_score = round(depression_score * 0.8, 2)

    time_series = [
        {
            "timestamp": p.timestamp,
            "text_preview": p.text[:150],
            "sentiment_score": float(score),
            "risk_score": round((1 - score) / 2, 2),
        }
        for p, score in zip(posts, sentiment_scores)
    ]

    explanation = (
        "Your recent posts indicate significantly negative emotional patterns."
        if risk_level == "high"
        else "Your posts show mixed emotional patterns with some negative signals."
        if risk_level == "medium"
        else "Your posts appear positive and emotionally stable."
    )

    return {
        "userId": req.userId,
        "overall_risk_level": risk_level,
        "depression_risk_score": depression_score,
        "anxiety_risk_score": anxiety_score,
        "time_series": time_series,
        "explanation": explanation,
    }
