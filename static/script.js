document.addEventListener('DOMContentLoaded', () => {
    const reviewsList = document.getElementById('reviews-list');
    const reviewForm = document.getElementById('review-form');
    const courseSelect = document.getElementById('courseName');

    // --- NEW: Function to fetch courses and populate the dropdown ---
    async function fetchCourses() {
        try {
            const response = await fetch('/api/courses');
            const courses = await response.json();
            courseSelect.innerHTML = '<option value="">-- اختر مقررًا --</option>'; // Clear loading message
            courses.forEach(course => {
                const option = document.createElement('option');
                option.value = course;
                option.textContent = course;
                courseSelect.appendChild(option);
            });
        } catch (error) {
            courseSelect.innerHTML = '<option value="">-- فشل تحميل المقررات --</option>';
        }
    }

    function renderStars(rating) {
        let stars = '';
        for (let i = 1; i <= 5; i++) {
            stars += `<i class="fa fa-star ${i <= rating ? 'checked' : ''}"></i>`;
        }
        return `<div class="review-stars">${stars}</div>`;
    }

    async function fetchReviews() {
        reviewsList.innerHTML = '<div class="spinner"></div>';
        try {
            const response = await fetch('/api/reviews');
            const reviews = await response.json();
            reviewsList.innerHTML = '';
            if (reviews.length === 0) {
                reviewsList.innerHTML = '<p>لا توجد تقييمات حاليًا. كن أول من يضيف تقييمًا!</p>';
                return;
            }
            reviews.forEach(review => {
                const reviewElement = document.createElement('div');
                reviewElement.className = 'review-card';
                reviewElement.innerHTML = `
                    <h3><strong>المقرر:</strong> ${review.courseName}</h3>
                    ${renderStars(review.rating)}
                    <p><strong>التقييم:</strong> ${review.reviewText}</p>
                    <p><em>بواسطة: ${review.studentName}</em></p>
                `;
                reviewsList.appendChild(reviewElement);
            });
        } catch (error) {
            reviewsList.innerHTML = '<p>حدث خطأ أثناء تحميل التقييمات. الرجاء المحاولة مرة أخرى.</p>';
        }
    }

    reviewForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const ratingElement = document.querySelector('input[name="rating"]:checked');
        if (!ratingElement) {
            alert('الرجاء اختيار تقييم بالنجوم.');
            return;
        }
        
        const newReview = {
            studentName: document.getElementById('studentName').value,
            courseName: document.getElementById('courseName').value,
            rating: parseInt(ratingElement.value),
            reviewText: document.getElementById('reviewText').value
        };

        const submitButton = reviewForm.querySelector('button');
        submitButton.disabled = true;
        submitButton.textContent = 'جاري الإرسال...';

        try {
            await fetch('/api/reviews', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newReview)
            });
            reviewForm.reset();
            fetchReviews();

            const successMsg = document.getElementById('success-message');
            successMsg.style.display = 'block';
            setTimeout(() => {
                successMsg.style.display = 'none';
            }, 3000);

        } catch (error) {
            alert('حدث خطأ أثناء إرسال التقييم.');
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = 'إرسال التقييم';
        }
    });

    const style = document.createElement('style');
    style.innerHTML = `.review-stars .fa-star.checked { color: #facc15; }`;
    document.head.appendChild(style);
    
    // --- Initial Load ---
    fetchCourses(); // Fetch courses when the page loads
    fetchReviews();
});