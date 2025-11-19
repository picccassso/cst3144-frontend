const { createApp } = Vue;

createApp({
    data() {
        return {
            lessons: [
                {
                    id: 1,
                    subject: 'Math',
                    location: 'London',
                    price: 100,
                    spaces: 5,
                    icon: 'fas fa-calculator'
                },
                {
                    id: 2,
                    subject: 'English',
                    location: 'London',
                    price: 100,
                    spaces: 5,
                    icon: 'fas fa-book-open'
                },
                {
                    id: 3,
                    subject: 'Math',
                    location: 'Oxford',
                    price: 100,
                    spaces: 5,
                    icon: 'fas fa-calculator'
                },
                {
                    id: 4,
                    subject: 'English',
                    location: 'York',
                    price: 80,
                    spaces: 5,
                    icon: 'fas fa-book-open'
                },
                {
                    id: 5,
                    subject: 'Music',
                    location: 'Bristol',
                    price: 90,
                    spaces: 5,
                    icon: 'fas fa-music'
                },
                {
                    id: 6,
                    subject: 'Art',
                    location: 'London',
                    price: 110,
                    spaces: 5,
                    icon: 'fas fa-palette'
                },
                {
                    id: 7,
                    subject: 'Science',
                    location: 'Manchester',
                    price: 95,
                    spaces: 5,
                    icon: 'fas fa-flask'
                },
                {
                    id: 8,
                    subject: 'History',
                    location: 'Cambridge',
                    price: 85,
                    spaces: 5,
                    icon: 'fas fa-landmark'
                },
                {
                    id: 9,
                    subject: 'Geography',
                    location: 'Edinburgh',
                    price: 90,
                    spaces: 5,
                    icon: 'fas fa-globe'
                },
                {
                    id: 10,
                    subject: 'Sports',
                    location: 'Birmingham',
                    price: 75,
                    spaces: 5,
                    icon: 'fas fa-running'
                }
            ],
            cart: [],
            sortBy: 'subject',
            sortOrder: 'asc'
        };
    },
    computed: {
        uniqueLocations() {
            const locations = this.lessons.map(lesson => lesson.location);
            return new Set(locations).size;
        },
        totalSpaces() {
            return this.lessons.reduce((total, lesson) => total + lesson.spaces, 0);
        },
        sortedLessons() {
            let sorted = [...this.lessons];

            sorted.sort((a, b) => {
                let aVal = a[this.sortBy];
                let bVal = b[this.sortBy];

                // Convert to lowercase for string comparison
                if (typeof aVal === 'string') {
                    aVal = aVal.toLowerCase();
                    bVal = bVal.toLowerCase();
                }

                if (this.sortOrder === 'asc') {
                    return aVal > bVal ? 1 : aVal < bVal ? -1 : 0;
                } else {
                    return aVal < bVal ? 1 : aVal > bVal ? -1 : 0;
                }
            });

            return sorted;
        }
    },
    methods: {
        addToCart(lesson) {
            if (lesson.spaces > 0) {
                // Add to cart
                this.cart.push({
                    id: lesson.id,
                    subject: lesson.subject,
                    location: lesson.location,
                    price: lesson.price
                });

                // Reduce available spaces
                lesson.spaces--;
            }
        }
    }
}).mount('#app');
