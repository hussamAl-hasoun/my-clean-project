document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('/api/reviews');
        const reviews = await response.json();
        
        if (reviews.length === 0) {
            document.getElementById('courseTableBody').innerHTML = 
                '<tr><td colspan="4" style="text-align: center; padding: 2rem;">لا توجد تقييمات متاحة حالياً</td></tr>';
            return;
        }

        // Calculate statistics
        const courseStats = {};
        reviews.forEach(review => {
            if (!courseStats[review.courseName]) {
                courseStats[review.courseName] = {
                    name: review.courseName,
                    ratings: [],
                    count: 0,
                    total: 0
                };
            }
            courseStats[review.courseName].ratings.push(review.rating);
            courseStats[review.courseName].count++;
            courseStats[review.courseName].total += review.rating;
        });

        // Calculate averages
        Object.keys(courseStats).forEach(key => {
            courseStats[key].average = (courseStats[key].total / courseStats[key].count).toFixed(2);
        });

        // Overall statistics
        const totalRatings = reviews.reduce((sum, r) => sum + r.rating, 0);
        const overallAvg = (totalRatings / reviews.length).toFixed(1);
        document.getElementById('overall-avg').textContent = overallAvg;
        document.getElementById('total-reviews-stat').textContent = reviews.length;
        document.getElementById('rated-courses').textContent = Object.keys(courseStats).length;

        // Find top course
        const sortedCourses = Object.values(courseStats).sort((a, b) => b.average - a.average);
        if (sortedCourses.length > 0) {
            const topCourse = sortedCourses[0].name.split(' - ')[0];
            document.getElementById('top-course').textContent = topCourse;
        }

        // Star distribution chart
        const starCounts = [0, 0, 0, 0, 0];
        reviews.forEach(r => starCounts[r.rating - 1]++);
        
        const ratingsCtx = document.getElementById('ratingsChart').getContext('2d');
        new Chart(ratingsCtx, {
            type: 'bar',
            data: {
                labels: ['⭐', '⭐⭐', '⭐⭐⭐', '⭐⭐⭐⭐', '⭐⭐⭐⭐⭐'],
                datasets: [{
                    label: 'عدد التقييمات',
                    data: starCounts,
                    backgroundColor: [
                        'rgba(239, 68, 68, 0.7)',
                        'rgba(251, 146, 60, 0.7)',
                        'rgba(251, 191, 36, 0.7)',
                        'rgba(132, 204, 22, 0.7)',
                        'rgba(34, 197, 94, 0.7)'
                    ],
                    borderColor: [
                        'rgb(239, 68, 68)',
                        'rgb(251, 146, 60)',
                        'rgb(251, 191, 36)',
                        'rgb(132, 204, 22)',
                        'rgb(34, 197, 94)'
                    ],
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: { display: false },
                    title: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: { 
                            color: '#cbd5e1',
                            stepSize: 1
                        },
                        grid: { color: 'rgba(203, 213, 225, 0.1)' }
                    },
                    x: {
                        ticks: { color: '#cbd5e1', font: { size: 16 } },
                        grid: { display: false }
                    }
                }
            }
        });

        // Top courses chart
        const top5Courses = sortedCourses.slice(0, 5);
        const topCoursesCtx = document.getElementById('topCoursesChart').getContext('2d');
        new Chart(topCoursesCtx, {
            type: 'horizontalBar',
            data: {
                labels: top5Courses.map(c => c.name.length > 30 ? c.name.substring(0, 30) + '...' : c.name),
                datasets: [{
                    label: 'متوسط التقييم',
                    data: top5Courses.map(c => parseFloat(c.average)),
                    backgroundColor: 'rgba(124, 58, 237, 0.7)',
                    borderColor: 'rgb(124, 58, 237)',
                    borderWidth: 2
                }]
            },
            options: {
                indexAxis: 'y',
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    x: {
                        beginAtZero: true,
                        max: 5,
                        ticks: { color: '#cbd5e1' },
                        grid: { color: 'rgba(203, 213, 225, 0.1)' }
                    },
                    y: {
                        ticks: { color: '#cbd5e1', font: { size: 11 } },
                        grid: { display: false }
                    }
                }
            }
        });

        // Populate table
        const tableBody = document.getElementById('courseTableBody');
        tableBody.innerHTML = '';
        sortedCourses.forEach(course => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><strong>${course.name}</strong></td>
                <td>${course.count}</td>
                <td><strong>${course.average}</strong></td>
                <td>${renderStars(parseFloat(course.average))}</td>
            `;
            tableBody.appendChild(row);
        });

    } catch (error) {
        console.error('Error loading statistics:', error);
        document.getElementById('courseTableBody').innerHTML = 
            '<tr><td colspan="4" style="text-align: center; color: #ef4444;">حدث خطأ أثناء تحميل الإحصائيات</td></tr>';
    }
});

function renderStars(rating) {
    let stars = '';
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star" style="color: #fbbf24;"></i> ';
    }
    if (hasHalf) {
        stars += '<i class="fas fa-star-half-alt" style="color: #fbbf24;"></i> ';
    }
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star" style="color: #475569;"></i> ';
    }
    return stars;
}
