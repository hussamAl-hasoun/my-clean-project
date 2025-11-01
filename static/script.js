document.addEventListener('DOMContentLoaded', () => {
    const reviewsList = document.getElementById('reviews-list');
    const reviewForm = document.getElementById('review-form');
    const courseSelect = document.getElementById('courseName');
    const ratingDisplay = document.getElementById('rating-display');

    // Rating texts mapping - simplified for 5 stars only
    const ratingTexts = {
        1: 'ضعيف',
        2: 'مقبول', 
        3: 'متوسط',
        4: 'جيد',
        5: 'ممتاز'
    };

    // Star rating interaction - simplified system
    const starRating = document.getElementById('star-rating');
    const stars = starRating.querySelectorAll('.star');
    
    stars.forEach(star => {
        star.addEventListener('mouseenter', function() {
            const rating = parseFloat(this.dataset.rating);
            updateStarDisplay(rating);
            highlightStars(rating);
        });
        
        star.addEventListener('click', function() {
            const rating = parseFloat(this.dataset.rating);
            updateStarDisplay(rating);
            highlightStars(rating);
            // Trigger the radio button
            const radio = document.getElementById(`star-${rating}`);
            radio.checked = true;
        });
    });
    
    starRating.addEventListener('mouseleave', function() {
        const checkedRadio = starRating.querySelector('input[type="radio"]:checked');
        if (checkedRadio) {
            const rating = parseFloat(checkedRadio.value);
            updateStarDisplay(rating);
            highlightStars(rating);
        } else {
            ratingDisplay.textContent = 'اختر تقييمك';
            resetStars();
        }
    });
    
    function highlightStars(rating) {
        stars.forEach(star => {
            const starRating = parseFloat(star.dataset.rating);
            if (starRating <= rating) {
                star.style.color = '#FBBF24';
                star.style.textShadow = '0 0 20px rgba(251, 191, 36, 0.9), 0 0 40px rgba(251, 191, 36, 0.6)';
                star.style.transform = 'scale(1.1)';
            } else {
                star.style.color = '#475569';
                star.style.textShadow = '0 0 10px rgba(0, 0, 0, 0.3)';
                star.style.transform = 'scale(1)';
            }
        });
    }
    
    function resetStars() {
        stars.forEach(star => {
            star.style.color = '#475569';
            star.style.textShadow = '0 0 10px rgba(0, 0, 0, 0.3)';
            star.style.transform = 'scale(1)';
        });
    }
    
    function updateStarDisplay(rating) {
        ratingDisplay.textContent = `${rating} نجوم - ${ratingTexts[rating]}`;
        ratingDisplay.style.color = '#FBBF24';
        ratingDisplay.style.textShadow = '0 0 15px rgba(251, 191, 36, 0.8)';
    }

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
        
        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                stars += `<i class="fa fa-star checked"></i>`;
            } else {
                stars += `<i class="fa fa-star"></i>`;
            }
        }
        
        return `<div class="review-stars">${stars}</div><div class="rating-text">${ratingTexts[rating] || rating + ' نجوم'}</div>`;
    }

    async function fetchReviews() {
        reviewsList.innerHTML = '<div class="spinner"></div>';
        try {
            const response = await fetch('/api/reviews');
            const reviews = await response.json();
            reviewsList.innerHTML = '';
            if (reviews.length === 0) {
                reviewsList.innerHTML = '<div style="text-align: center; padding: 3rem; color: #cbd5e1;"><i class="fas fa-inbox" style="font-size: 4rem; margin-bottom: 1rem; color: #FBBF24; opacity: 0.5;"></i><p style="font-size: 1.2rem;">لا توجد تقييمات حاليًا.<br>كن أول من يضيف تقييمًا!</p></div>';
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
            reviewsList.innerHTML = '<div style="text-align: center; padding: 3rem; color: #ef4444;"><i class="fas fa-exclamation-triangle" style="font-size: 4rem; margin-bottom: 1rem;"></i><p style="font-size: 1.2rem;">حدث خطأ أثناء تحميل التقييمات.<br>الرجاء تحديث الصفحة والمحاولة مرة أخرى.</p><button onclick="location.reload()" style="margin-top: 1rem; padding: 0.8rem 2rem; background: #FBBF24; color: #1e293b; border: none; border-radius: 8px; font-weight: 600; cursor: pointer;">تحديث الصفحة</button></div>';
            console.error('Error fetching reviews:', error);
        }
    }

    reviewForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const ratingElement = document.querySelector('input[name="rating"]:checked');
        if (!ratingElement) {
            showError('الرجاء اختيار تقييم بالنجوم.');
            return;
        }
        
        const newReview = {
            studentName: document.getElementById('studentName').value.trim(),
            courseName: document.getElementById('courseName').value.trim(),
            rating: parseFloat(ratingElement.value),
            reviewText: document.getElementById('reviewText').value.trim()
        };

        // Client-side validation
        if (!newReview.studentName || newReview.studentName.length < 2) {
            showError('اسم الطالب يجب أن يكون على الأقل حرفين');
            return;
        }
        
        if (!newReview.courseName) {
            showError('الرجاء اختيار مقرر دراسي');
            return;
        }
        
        if (!newReview.reviewText || newReview.reviewText.length < 10) {
            showError('نص التقييم يجب أن يكون على الأقل 10 أحرف');
            return;
        }

        const submitButton = reviewForm.querySelector('button');
        submitButton.disabled = true;
        submitButton.textContent = 'جاري الإرسال...';
        submitButton.style.opacity = '0.7';

        try {
            const response = await fetch('/api/reviews', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newReview)
            });
            
            const result = await response.json();
            
            if (!response.ok) {
                throw new Error(result.error || 'حدث خطأ أثناء إرسال التقييم');
            }
            
            reviewForm.reset();
            ratingDisplay.textContent = 'اختر تقييمك';
            ratingDisplay.style.color = '#FBBF24';
            ratingDisplay.style.textShadow = '0 0 10px rgba(251, 191, 36, 0.6)';
            
            // Reset stars
            resetStars();
            const checkedRadio = starRating.querySelector('input[type="radio"]:checked');
            if (checkedRadio) checkedRadio.checked = false;
            
            fetchReviews();

            const successMsg = document.getElementById('success-message');
            successMsg.style.display = 'block';
            successMsg.style.animation = 'fadeInUp 0.5s ease';
            setTimeout(() => {
                successMsg.style.animation = 'fadeOut 0.5s ease';
                setTimeout(() => {
                    successMsg.style.display = 'none';
                }, 500);
            }, 3000);

        } catch (error) {
            showError(error.message || 'حدث خطأ أثناء إرسال التقييم. الرجاء المحاولة مرة أخرى.');
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = 'إرسال التقييم';
            submitButton.style.opacity = '1';
        }
    });
    
    function showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-popup';
        errorDiv.textContent = message;
        errorDiv.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            background-color: #ef4444;
            color: white;
            padding: 1rem 2rem;
            border-radius: 8px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.3);
            font-weight: bold;
            z-index: 200;
            animation: fadeInUp 0.5s ease;
        `;
        document.body.appendChild(errorDiv);
        setTimeout(() => {
            errorDiv.style.animation = 'fadeOut 0.5s ease';
            setTimeout(() => {
                errorDiv.remove();
            }, 500);
        }, 4000);
    }

    const style = document.createElement('style');
    style.innerHTML = `
        .review-stars .fa-star.checked,
        .review-stars .fa-star-half-alt.checked { 
            color: #FBBF24; 
            text-shadow: 0 0 15px rgba(251, 191, 36, 0.8);
        }
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateX(-50%) translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateX(-50%) translateY(0);
            }
        }
        @keyframes fadeOut {
            from {
                opacity: 1;
                transform: translateX(-50%) translateY(0);
            }
            to {
                opacity: 0;
                transform: translateX(-50%) translateY(-20px);
            }
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

    fetchCourses();
    fetchReviews();
    updateStatistics();
});