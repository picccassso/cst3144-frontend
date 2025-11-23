const { createApp } = Vue;

createApp({
    data() {
        return {
            lessons: [],
            cart: [],
            sortBy: 'subject',
            sortOrder: 'asc',
            showCart: false,
            checkoutName: '',
            checkoutPhone: '',
            apiUrl: 'http://localhost:3000'
        };
    },
    mounted() {
        this.fetchLessons();
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
        },
        isValidName() {
            // Name must contain letters only (including spaces)
            const nameRegex = /^[A-Za-z\s]+$/;
            return nameRegex.test(this.checkoutName);
        },
        isValidPhone() {
            // Phone must contain numbers only
            const phoneRegex = /^[0-9]+$/;
            return phoneRegex.test(this.checkoutPhone);
        },
        canCheckout() {
            return this.isValidName && this.isValidPhone &&
                   this.checkoutName.trim() !== '' &&
                   this.checkoutPhone.trim() !== '';
        }
    },
    methods: {
        fetchLessons() {
            fetch(`${this.apiUrl}/lessons`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    // Add icon to each lesson based on subject
                    this.lessons = data.map(lesson => ({
                        ...lesson,
                        icon: this.getIcon(lesson.subject)
                    }));
                    console.log('✅ Lessons loaded from API:', this.lessons);
                })
                .catch(error => {
                    console.error('❌ Error fetching lessons:', error);
                    alert('Failed to load lessons. Please ensure the backend is running on http://localhost:3000');
                });
        },
        getIcon(subject) {
            const iconMap = {
                'Math': 'fas fa-calculator',
                'English': 'fas fa-book-open',
                'Music': 'fas fa-music',
                'Art': 'fas fa-palette',
                'Science': 'fas fa-flask',
                'History': 'fas fa-landmark',
                'Geography': 'fas fa-globe',
                'Sports': 'fas fa-running'
            };
            return iconMap[subject] || 'fas fa-star';
        },
        addToCart(lesson) {
            if (lesson.spaces > 0) {
                // Add to cart
                this.cart.push({
                    id: lesson.id,
                    subject: lesson.subject,
                    location: lesson.location,
                    price: lesson.price,
                    icon: lesson.icon
                });

                // Reduce available spaces
                lesson.spaces--;
            }
        },
        removeFromCart(index) {
            // Get the removed item
            const removedItem = this.cart[index];

            // Find the lesson in the lessons array and restore its space
            const lesson = this.lessons.find(l => l.id === removedItem.id);
            if (lesson) {
                lesson.spaces++;
            }

            // Remove from cart
            this.cart.splice(index, 1);
        },
        submitOrder() {
            if (this.canCheckout) {
                alert(`Order submitted successfully!\n\nName: ${this.checkoutName}\nPhone: ${this.checkoutPhone}\nTotal Items: ${this.cart.length}`);

                // Clear cart and form
                this.cart = [];
                this.checkoutName = '';
                this.checkoutPhone = '';
                this.showCart = false;
            }
        }
    }
}).mount('#app');
