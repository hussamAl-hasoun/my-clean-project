import os
import requests # سنحتاج لإضافة هذه المكتبة
import sys
import time

print("Starting integration tests...")

try:
    # سيتم تمرير هذا المتغير من Jenkinsfile
    port = os.environ.get("TARGET_PORT")
    if not port:
        print("Error: TARGET_PORT environment variable not set.")
        sys.exit(1)

    base_url = f"http://127.0.0.1:{port}"
    print(f"Testing new container at: {base_url}")

    # الانتظار قليلاً للتأكد أن التطبيق بدأ بالكامل
    time.sleep(10) 

    # --- الاختبار الأول: التأكد من أن الصفحة الرئيسية تعمل ---
    home_response = requests.get(base_url + "/")
    home_response.raise_for_status() # سيفشل الاختبار إذا كان الـ status ليس 2xx
    print(f"[SUCCESS] Home page (/) check: PASSED (Status {home_response.status_code})")

    # --- الاختبار الثاني: التأكد من الاتصال بقاعدة البيانات (عبر API) ---
    # بناءً على ملفك [cite: 121]، لديك نقطة نهاية /api/courses
    api_response = requests.get(base_url + "/api/courses")
    api_response.raise_for_status() # الفشل إذا لم يرجع 2xx

    data = api_response.json()
    if isinstance(data, list):
        print(f"[SUCCESS] API (/api/courses) check: PASSED (Got {len(data)} items from DB)")
    else:
        print(f"[FAILED] API (/api/courses) check: Response was not a valid list")
        sys.exit(1)

    print("\nAll integration tests PASSED.")
    sys.exit(0)

except requests.exceptions.ConnectionError as e:
    print(f"\n[FATAL] ConnectionError: Failed to connect to {base_url}.")
    print("Is the container running? Did it fail to start?")
    print(e)
    sys.exit(1)
except Exception as e:
    print(f"\n[FATAL] Integration test FAILED: {e}")
    sys.exit(1)
