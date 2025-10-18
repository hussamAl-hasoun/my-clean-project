document.addEventListener('DOMContentLoaded', () => {
    const reviewsList = document.getElementById('reviews-list');
    const reviewForm = document.getElementById('review-form');

    // --- Function to generate stars from a rating number ---
    function renderStars(rating) {
        let stars = '';
        for (let i = 1; i <= 5; i++) {
            stars += `<i class="fa fa-star ${i <= rating ? 'checked' : ''}"></i>`;
        }
        return `<div class="review-stars">${stars}</div>`;
    }

    // --- Function to fetch and display reviews ---
    async function fetchReviews() {
        reviewsList.innerHTML = '<p>جاري تحميل التقييمات...</p>';
        try {
            const response = await fetch('/api/reviews');
            const reviews = await response.json();

            reviewsList.innerHTML = ''; // Clear the loading message
            reviews.forEach(review => {
                const reviewElement = document.createElement('div');
                reviewElement.className = 'review-card'; // Use the card style
                reviewElement.innerHTML = `
                    <h3><strong>المقرر:</strong> ${review.courseName}</h3>
                    ${renderStars(review.rating)}
                    <p><strong>التقييم:</strong> ${review.reviewText}</p>
                    <p><em>بواسطة: ${review.studentName}</em></p>
                `;
                reviewsList.appendChild(reviewElement);
            });
        } catch (error) {
            reviewsList.innerHTML = '<p>حدث خطأ أثناء تحميل التقييمات.</p>';
        }
    }

    // --- Function to handle form submission ---
    reviewForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        // Get the selected star rating
        const rating = document.querySelector('input[name="rating"]:checked').value;

        const newReview = {
            studentName: document.getElementById('studentName').value,
            courseName: document.getElementById('courseName').value,
            rating: parseInt(rating), // Convert rating to a number
            reviewText: document.getElementById('reviewText').value
        };

        try {
            await fetch('/api/reviews', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newReview)
            });

            reviewForm.reset();
            fetchReviews();
        } catch (error) {
            alert('حدث خطأ أثناء إرسال التقييم.');
        }
    });

    // --- Initial Load ---
    fetchReviews();

    // Add a specific style for the checked stars in the review list
    const style = document.createElement('style');
    style.innerHTML = `.review-stars .fa-star.checked { color: #f6e05e; }`;
    document.head.appendChild(style);
});