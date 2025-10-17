from flask import Flask, request, jsonify, render_template

# Initialize the Flask application
app = Flask(__name__, static_folder='static', template_folder='templates')

# --- In-memory "Database" ---
# For now, we'll store reviews in a simple list. We'll replace this with a real database later.
reviews = [
    {
        "studentName": "Hussam Al-hasoun",
        "courseName": "Cloud Computing",
        "reviewText": "Excellent course, highly recommended!"
    }
]

# --- API Endpoints ---

# Route to get all reviews
@app.route('/api/reviews', methods=['GET'])
def get_reviews():
    return jsonify(reviews)

# Route to add a new review
@app.route('/api/reviews', methods=['POST'])
def add_review():
    new_review = request.get_json()
    reviews.append(new_review)
    return jsonify({"status": "success", "review": new_review})

# --- Frontend Route ---

# The main route that serves our website's interface
@app.route('/')
def home():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)