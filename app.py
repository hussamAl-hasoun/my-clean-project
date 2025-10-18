from flask import Flask, request, jsonify, render_template
import mysql.connector

# Initialize the Flask application
app = Flask(__name__, static_folder='static', template_folder='templates')

# --- Database & Course Details ---
DB_HOST = "172.31.92.137"
DB_USER = "admin"
DB_PASSWORD = "Aa001916"
DB_NAME = "coursereviews"
COURSES = [
    "ITCP101 - أساسيات تقنية المعلومات", "AHEC101 - اللغة الإنجليزية لعلوم الحاسب (1)",
    "ITCL101 - البنية التحتية وخدمات الحوسبة السحابية", "ITBS106 - شبكات الحاسب", "ITBS104 - نظم التشغيل",
    "ITBS103 - أساسيات البرمجة", "AHEE103 - مهارات التواصل باللغة الإنجليزية", "AHEC102 - اللغة الإنجليزية لعلوم الحاسب 2",
    "ITSD210 - إدارة نظم قواعد البيانات", "ITCL204 - مشروع تطبيقي", "ITCL203 - شبكة توصيل المحتوى للسحابة",
    "ITCL202 - إدارة الأنظمة الافتراضية", "ITCL201 - تحليل المتطلبات للسحابة", "ITBS207 - إدارة نظام تشغيل لينكس",
    "ITBS107 - البرمجة المتقدمة",
    "ITCL210 - مشروع تخرج", "ITCL209 - أمن الحوسبة السحابية", "ITCL208 - تحليل البيانات الكبيرة السحابية",
    "ITCL207 - قواعد البيانات السحابية", "ITCL206 - ديف أوبس للسحابة", "ITCL205 - تحليل التكلفة للسحابة"
]

# --- Database Functions ---
def get_db_connection():
    try:
        conn = mysql.connector.connect(host=DB_HOST, user=DB_USER, password=DB_PASSWORD)
        return conn
    except mysql.connector.Error:
        return None

def setup_database():
    conn = get_db_connection()
    if conn is None: return
    try:
        cursor = conn.cursor()
        cursor.execute(f"CREATE DATABASE IF NOT EXISTS {DB_NAME}")
        cursor.execute(f"USE {DB_NAME}")
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS reviews (
                id INT AUTO_INCREMENT PRIMARY KEY, studentName VARCHAR(255) NOT NULL,
                courseName VARCHAR(255) NOT NULL, rating INT NOT NULL,
                reviewText TEXT NOT NULL, createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)
    finally:
        if conn.is_connected(): conn.close()

# --- API Endpoints ---
@app.route('/api/courses', methods=['GET'])
def get_courses():
    return jsonify(COURSES)

@app.route('/api/reviews', methods=['GET'])
def get_reviews():
    conn = get_db_connection()
    if not conn or not conn.is_connected(): return jsonify({"error": "DB fail"}), 500
    try:
        cursor = conn.cursor(dictionary=True)
        cursor.execute(f"USE {DB_NAME}")
        cursor.execute("SELECT * FROM reviews ORDER BY createdAt DESC")
        reviews = cursor.fetchall()
        return jsonify(reviews)
    finally:
        if conn.is_connected(): conn.close()

@app.route('/api/reviews', methods=['POST'])
def add_review():
    new_review = request.get_json()
    conn = get_db_connection()
    if not conn or not conn.is_connected(): return jsonify({"error": "DB fail"}), 500
    try:
        cursor = conn.cursor()
        cursor.execute(f"USE {DB_NAME}")
        query = "INSERT INTO reviews (studentName, courseName, rating, reviewText) VALUES (%s, %s, %s, %s)"
        cursor.execute(query, (new_review['studentName'], new_review['courseName'], new_review['rating'], new_review['reviewText']))
        conn.commit()
        return jsonify({"status": "success"})
    finally:
        if conn.is_connected(): conn.close()

# --- NEW: Frontend Page Routes ---

@app.route('/')
def home():
    # This now serves the reviews page as the main page
    return render_template('reviews.html')

@app.route('/about')
def about():
    # This new route serves the about page
    return render_template('about.html')


if __name__ == '__main__':
    setup_database()
    app.run(host='0.0.0.0', port=5000)