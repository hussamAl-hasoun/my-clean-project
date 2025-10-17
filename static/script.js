// This function runs when the page loads
document.addEventListener('DOMContentLoaded', () => {
    const reviewsList = document.getElementById('reviews-list');
    const reviewForm = document.getElementById('review-form');

    // --- Function to fetch and display reviews ---
    async function fetchReviews() {
        reviewsList.innerHTML = '<p>جاري تحميل التقييمات...</p>';
        try {
            const response = await fetch('/api/reviews');
            const reviews = await response.json();

            reviewsList.innerHTML = ''; // Clear the loading message
            reviews.forEach(review => {
                const reviewElement = document.createElement('div');
                reviewElement.innerHTML = `
                    <h3><strong>المقرر:</strong> ${review.courseName}</h3>
                    <p><strong>التقييم:</strong> ${review.reviewText}</p>
                    <p><em>بواسطة: ${review.studentName}</em></p>
                    <hr>
                `;
                reviewsList.appendChild(reviewElement);
            });
        } catch (error) {
            reviewsList.innerHTML = '<p>حدث خطأ أثناء تحميل التقييمات.</p>';
        }
    }

    // --- Function to handle form submission ---
    reviewForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent the page from reloading

        const newReview = {
            studentName: document.getElementById('studentName').value,
            courseName: document.getElementById('courseName').value,
            reviewText: document.getElementById('reviewText').value
        };

        try {
            await fetch('/api/reviews', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newReview)
            });

            reviewForm.reset(); // Clear the form
            fetchReviews(); // Refresh the list of reviews
        } catch (error) {
            alert('حدث خطأ أثناء إرسال التقييم.');
        }
    });

    // --- Initial Load ---
    fetchReviews();
});