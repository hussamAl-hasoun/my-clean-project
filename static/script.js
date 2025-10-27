document.addEventListener('DOMContentLoaded', () => {
    const reviewsList = document.getElementById('reviews-list');
    const reviewForm = document.getElementById('review-form');
    const courseSelect = document.getElementById('courseName');

    async function fetchCourses() {
        try {
            const response = await fetch('/api/courses');
            const courses = await response.json();
            courseSelect.innerHTML = '<option value="">-- اختر مقررًا --</option>';
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
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;
        
        for (let i = 1; i <= 5; i++) {
            if (i <= fullStars) {
                stars += `<i class="fa fa-star checked"></i>`;
            } else if (i === fullStars + 1 && hasHalfStar) {
                stars += `<i class="fa fa-star-half-alt checked"></i>`;
            } else {
                stars += `<i class="fa fa-star"></i>`;
            }
        }
        
        const ratingTexts = {
            0.5: 'ضعيف جداً',
            1: 'ضعيف جداً',
            1.5: 'ضعيف',
            2: 'ضعيف', 
            2.5: 'مقبول',
            3: 'متوسط',
            3.5: 'جيد',
            4: 'جيد',
            4.5: 'جيد جداً',
            5: 'ممتاز'
        };
        
        return `<div class="review-stars">${stars}</div><div class="rating-text">${ratingTexts[rating] || rating + ' نجوم'}</div>`;
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
            updateStatistics();
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
            rating: parseFloat(ratingElement.value),
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
    style.innerHTML = `
        .review-stars .fa-star.checked,
        .review-stars .fa-star-half-alt.checked { 
            color: #f59e0b; 
            text-shadow: 0 0 8px rgba(245, 158, 11, 0.6);
        }
    `;
    document.head.appendChild(style);
    
    async function updateStatistics() {
        try {
            const response = await fetch('/api/reviews');
            const reviews = await response.json();
            
            document.getElementById('total-reviews').textContent = reviews.length;
            
            if (reviews.length > 0) {
                const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
                const avgRating = (totalRating / reviews.length).toFixed(1);
                document.getElementById('avg-rating').textContent = avgRating;
            } else {
                document.getElementById('avg-rating').textContent = '0.0';
            }
        } catch (error) {
            console.error('Error updating statistics:', error);
        }
    }

    function animateNumber(element, target, duration = 1000) {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current);
        }, 16);
    }

    const starRating = document.querySelector('.star-rating');
    const ratingTexts = {
        0.5: 'ضعيف جداً',
        1: 'ضعيف جداً',
        1.5: 'ضعيف',
        2: 'ضعيف',
        2.5: 'مقبول',
        3: 'متوسط',
        3.5: 'جيد',
        4: 'جيد',
        4.5: 'جيد جداً',
        5: 'ممتاز'
    };

    document.querySelectorAll('.star-rating input[type="radio"]').forEach(input => {
        input.addEventListener('change', function() {
            const rating = parseFloat(this.value);
            starRating.setAttribute('data-rating-text', ratingTexts[rating] || rating + ' نجوم');
        });
    });

    fetchCourses();
    fetchReviews();
    updateStatistics();
});