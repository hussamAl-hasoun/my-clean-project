from flask import Flask, request, jsonify, render_template
import mysql.connector
import os

app = Flask(__name__, static_folder='static', template_folder='templates')

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

def get_db_connection():
    try:
        conn = mysql.connector.connect(
            host=DB_HOST,
            user=DB_USER,
            password=DB_PASSWORD
        )
        return conn
    except mysql.connector.Error as err:
        print(f"Error connecting to database: {err}")
        return None

def setup_database():
    conn = get_db_connection()
    if conn is None:
        print("Could not connect to MySQL to set up the database.")
        return
    try:
        cursor = conn.cursor()
        cursor.execute(f"CREATE DATABASE IF NOT EXISTS {DB_NAME} CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci")
        cursor.execute(f"USE {DB_NAME}")

        cursor.execute("""
            CREATE TABLE IF NOT EXISTS reviews (
                id INT AUTO_INCREMENT PRIMARY KEY,
                studentName VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
                courseName VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
                reviewText TEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        """)
        cursor.execute(f"""
            SELECT COUNT(*) FROM information_schema.COLUMNS
            WHERE TABLE_SCHEMA = '{DB_NAME}' AND TABLE_NAME = 'reviews' AND COLUMN_NAME = 'rating';
        """)
        column_exists = cursor.fetchone()[0]

        if not column_exists:
            print("Adding missing 'rating' column to 'reviews' table...")
            cursor.execute("ALTER TABLE reviews ADD COLUMN rating DECIMAL(2,1) NOT NULL AFTER courseName")
            print("'rating' column added successfully.")
        else:
            print("'rating' column already exists.")
            cursor.execute(f"""
                SELECT DATA_TYPE FROM information_schema.COLUMNS
                WHERE TABLE_SCHEMA = '{DB_NAME}' AND TABLE_NAME = 'reviews' AND COLUMN_NAME = 'rating';
            """)
            data_type = cursor.fetchone()[0]
            if data_type != 'decimal':
                print("Updating 'rating' column to DECIMAL for half-star support...")
                cursor.execute("ALTER TABLE reviews MODIFY COLUMN rating DECIMAL(2,1) NOT NULL")
                print("'rating' column updated to DECIMAL successfully.")

        conn.commit()
        print("Database and table setup/update complete.")

    except mysql.connector.Error as err:
        print(f"Error during database setup: {err}")
        if conn and conn.is_connected():
             conn.rollback()
    finally:
        if conn and conn.is_connected():
            cursor.close()
            conn.close()

@app.route('/api/courses', methods=['GET'])
def get_courses():
    return jsonify(COURSES)

@app.route('/api/reviews', methods=['GET'])
def get_reviews():
    conn = get_db_connection()
    if not conn or not conn.is_connected():
        return jsonify({"error": "Database connection failed"}), 500
    try:
        cursor = conn.cursor(dictionary=True)
        cursor.execute(f"USE {DB_NAME}")
        cursor.execute("SELECT * FROM reviews ORDER BY createdAt DESC")
        reviews_data = cursor.fetchall()
        return jsonify(reviews_data)
    except mysql.connector.Error as err:
        print(f"Error fetching reviews: {err}")
        if err.errno == mysql.connector.errorcode.ER_BAD_DB_ERROR:
             return jsonify({"error": f"Database '{DB_NAME}' not found. Setup might have failed."}), 500
        return jsonify({"error": "Could not fetch reviews"}), 500
    finally:
        if conn and conn.is_connected():
            cursor.close()
            conn.close()

@app.route('/api/reviews', methods=['POST'])
def add_review():
    new_review = request.get_json()
    if not all(k in new_review for k in ('studentName', 'courseName', 'rating', 'reviewText')):
        return jsonify({"error": "Missing data in request"}), 400

    conn = get_db_connection()
    if not conn or not conn.is_connected():
        return jsonify({"error": "Database connection failed"}), 500
    try:
        cursor = conn.cursor()
        cursor.execute(f"USE {DB_NAME}")
        query = "INSERT INTO reviews (studentName, courseName, rating, reviewText) VALUES (%s, %s, %s, %s)"
        cursor.execute(query, (new_review['studentName'], new_review['courseName'], float(new_review['rating']), new_review['reviewText']))
        conn.commit()
        return jsonify({"status": "success"})
    except mysql.connector.Error as err:
        print(f"Error adding review: {err}")
        if conn and conn.is_connected():
             conn.rollback()
        return jsonify({"error": "Could not add review"}), 500
    finally:
        if conn and conn.is_connected():
            cursor.close()
            conn.close()

@app.route('/')
def home():
    return render_template('about.html')

@app.route('/reviews')
def reviews():
    return render_template('reviews.html')

@app.route('/courses')
def courses():
    return render_template('courses.html')

@app.route('/stats')
def stats():
    return render_template('stats.html')

@app.route('/about')
def about():
    return render_template('about.html')

if __name__ == '__main__':
    print("Attempting to set up database on startup...")
    setup_database()
    print("Starting Flask application...")
    app.run(host='0.0.0.0', port=5000)