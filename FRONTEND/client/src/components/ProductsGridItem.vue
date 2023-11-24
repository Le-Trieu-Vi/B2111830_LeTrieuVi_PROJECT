<template>
    <div class="product-item">
        <img v-bind:src="product.imageUrl" />
        <h3 class="product-name">{{ product.name }}</h3>
        <p class="product-price">{{ product.price }}VND</p>
        <RatingStar></RatingStar>
        <button @click="showProductDetail(product._id)" class="btn btn-outline-info">Xem chi tiết
            <fa icon="angles-right" />
        </button>
    </div>
</template>

<script>
import RatingStar from '@/components/RatingStar.vue';
import { mapGetters } from 'vuex';
export default {
    name: 'ProductsGridItem',
    props: ['product'],
    computed: {
        ...mapGetters(['user'])
    },
    methods: {
        showProductDetail(productId) {
            this.$router.push(`/products/${productId}`);
        }
    },
    components: { RatingStar }
}
</script>

<style scoped>
.product-item {
    align-items: center;
    box-shadow: 0px 2px 5px #888;
    display: flex;
    flex-direction: column;
    margin-bottom: 2%;
    padding: 20px;
    padding-bottom: 15px;
    position: relative;
    width: 23%;
    margin-left: 13px;
}

.product-price {
    font-weight: 400;
    margin: 0;
}

img {
    height: 200px;
    width: 200px;
    padding: 5px;
}

a {
    width: 100%;
}
</style>