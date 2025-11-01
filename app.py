from flask import Flask, request, jsonify, render_template
import mysql.connector
import os
from dotenv import load_dotenv
import re

# Load environment variables
load_dotenv()

app = Flask(__name__, static_folder='static', template_folder='templates')

# Database configuration from environment variables
DB_HOST = os.getenv('DB_HOST', '172.31.92.137')
DB_USER = os.getenv('DB_USER', 'admin')
DB_PASSWORD = os.getenv('DB_PASSWORD', 'Aa001916')
DB_NAME = os.getenv('DB_NAME', 'coursereviews')

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
        return jsonify({"error": "فشل الاتصال بقاعدة البيانات"}), 500
    try:
        cursor = conn.cursor(dictionary=True)
        cursor.execute(f"USE {DB_NAME}")
        # Limit and sanitize query
        cursor.execute("SELECT id, studentName, courseName, rating, reviewText, createdAt FROM reviews ORDER BY createdAt DESC LIMIT 1000")
        reviews_data = cursor.fetchall()
        # Convert datetime objects to strings for JSON serialization
        for review in reviews_data:
            if review.get('createdAt'):
                review['createdAt'] = review['createdAt'].isoformat() if hasattr(review['createdAt'], 'isoformat') else str(review['createdAt'])
        return jsonify(reviews_data)
    except mysql.connector.Error as err:
        print(f"Error fetching reviews: {err}")
        if err.errno == mysql.connector.errorcode.ER_BAD_DB_ERROR:
             return jsonify({"error": f"قاعدة البيانات '{DB_NAME}' غير موجودة"}), 500
        return jsonify({"error": "حدث خطأ أثناء جلب التقييمات"}), 500
    except Exception as e:
        print(f"Unexpected error: {e}")
        return jsonify({"error": "حدث خطأ غير متوقع"}), 500
    finally:
        if conn and conn.is_connected():
            cursor.close()
            conn.close()

def validate_input(student_name, course_name, rating, review_text):
    """Validate user input to prevent malicious data"""
    errors = []
    
    # Validate student name
    if not student_name or len(student_name.strip()) < 2:
        errors.append("اسم الطالب يجب أن يكون على الأقل حرفين")
    elif len(student_name) > 255:
        errors.append("اسم الطالب طويل جداً")
    elif not re.match(r'^[\u0600-\u06FF\s]+$', student_name.strip()):
        errors.append("اسم الطالب يجب أن يحتوي على أحرف عربية فقط")
    
    # Validate course name
    if not course_name or course_name.strip() not in COURSES:
        errors.append("المقرر المحدد غير صحيح")
    
    # Validate rating
    try:
        rating_float = float(rating)
        if rating_float < 0.5 or rating_float > 5.0:
            errors.append("التقييم يجب أن يكون بين 0.5 و 5.0")
        if rating_float not in [0.5, 1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 4.5, 5.0]:
            errors.append("التقييم يجب أن يكون في خطوات 0.5")
    except (ValueError, TypeError):
        errors.append("التقييم غير صحيح")
    
    # Validate review text
    if not review_text or len(review_text.strip()) < 10:
        errors.append("نص التقييم يجب أن يكون على الأقل 10 أحرف")
    elif len(review_text) > 2000:
        errors.append("نص التقييم طويل جداً (الحد الأقصى 2000 حرف)")
    
    return errors

@app.route('/api/reviews', methods=['POST'])
def add_review():
    new_review = request.get_json()
    if not new_review:
        return jsonify({"error": "لا توجد بيانات في الطلب"}), 400
    
    if not all(k in new_review for k in ('studentName', 'courseName', 'rating', 'reviewText')):
        return jsonify({"error": "بيانات ناقصة في الطلب"}), 400

    # Validate input
    validation_errors = validate_input(
        new_review.get('studentName', ''),
        new_review.get('courseName', ''),
        new_review.get('rating', ''),
        new_review.get('reviewText', '')
    )
    
    if validation_errors:
        return jsonify({"error": "; ".join(validation_errors)}), 400

    conn = get_db_connection()
    if not conn or not conn.is_connected():
        return jsonify({"error": "فشل الاتصال بقاعدة البيانات"}), 500
    try:
        cursor = conn.cursor()
        cursor.execute(f"USE {DB_NAME}")
        # Use parameterized query to prevent SQL injection
        query = "INSERT INTO reviews (studentName, courseName, rating, reviewText) VALUES (%s, %s, %s, %s)"
        cursor.execute(query, (
            new_review['studentName'].strip(),
            new_review['courseName'].strip(),
            float(new_review['rating']),
            new_review['reviewText'].strip()
        ))
        conn.commit()
        return jsonify({"status": "success", "message": "تم إضافة التقييم بنجاح"})
    except mysql.connector.Error as err:
        print(f"Error adding review: {err}")
        if conn and conn.is_connected():
             conn.rollback()
        return jsonify({"error": "حدث خطأ أثناء إضافة التقييم"}), 500
    except Exception as e:
        print(f"Unexpected error: {e}")
        return jsonify({"error": "حدث خطأ غير متوقع"}), 500
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