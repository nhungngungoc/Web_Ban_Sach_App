<template>
    <v-carousel hide-delimiters v-model="currentIndex">
        <v-carousel-item v-for="(item, i) in items" :key="i" :src="item.src" cover></v-carousel-item>
    </v-carousel>
</template>

<script>
export default {
    data() {
        return {
            items: [
                {
                    src: 'https://pibook.vn/upload/banner/MinhLongBook.png',
                },
                {
                    src: 'https://pibook.vn/upload/banner/truy%E1%BB%87n%20tranh%20tu%E1%BA%A7n.png',
                },
                {
                    src: 'https://pibook.vn/upload/banner/h%C3%A8%202024.png',
                },
            ],
            currentIndex: 0,
            intervalId: null,
            intervalTime: 2000,
        };
    },
    mounted() {
        this.startCarousel();
    },
    methods: {
        startCarousel() {
            this.intervalId = setInterval(() => {
                this.currentIndex = (this.currentIndex + 1) % this.items.length;
            }, this.intervalTime);
        },
    },
    beforeDestroy() {
        clearInterval(this.intervalId);
    },
};
</script>
