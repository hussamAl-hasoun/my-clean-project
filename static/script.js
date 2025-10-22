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
        
        const ratingTexts = {
            1: 'ضعيف جداً',
            2: 'ضعيف', 
            3: 'متوسط',
            4: 'جيد',
            5: 'ممتاز'
        };
        
        return `<div class="review-stars">${stars}</div><div class="rating-text">${ratingTexts[rating] || ''}</div>`;
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
            // Update statistics after loading reviews
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
    style.innerHTML = `
        .review-stars .fa-star.checked { 
            color: #f59e0b; 
            text-shadow: 0 0 8px rgba(245, 158, 11, 0.6);
        }
    `;
    document.head.appendChild(style);
    
    // --- NEW: Update Statistics ---
    async function updateStatistics() {
        try {
            const response = await fetch('/api/reviews');
            const reviews = await response.json();
            
            // Update total reviews
            document.getElementById('total-reviews').textContent = reviews.length;
            
            // Calculate average rating
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

    // --- NEW: Animate numbers ---
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

    // --- Enhanced Star Rating with Text ---
    const starRating = document.querySelector('.star-rating');
    const ratingTexts = {
        1: 'ضعيف جداً',
        2: 'ضعيف',
        3: 'متوسط',
        4: 'جيد',
        5: 'ممتاز'
    };

    // Add event listeners to stars
    document.querySelectorAll('.star-rating input[type="radio"]').forEach(input => {
        input.addEventListener('change', function() {
            const rating = parseInt(this.value);
            starRating.setAttribute('data-rating-text', ratingTexts[rating]);
        });
    });

    // --- Initial Load ---
    fetchCourses(); // Fetch courses when the page loads
    fetchReviews();
    updateStatistics(); // Update statistics
});