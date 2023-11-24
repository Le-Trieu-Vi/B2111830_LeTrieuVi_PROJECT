<template>
    <div id="page-wrap">
        <h1 class="m-b-50 mt-2 mb-3 text-center">
            Sản phẩm
        </h1>
        <ProductsGrid :products="products" />
    </div>
</template>

<script>
import ProductsGrid from '@/components/ProductsGrid.vue';

export default {
    name: 'ProductsPage',
    components: {
        ProductsGrid,
    },
    props: ['products'],
    data() {
        return {
        };
    },
    async created() {
    }
};
</script>

<style scoped>
#page-wrap {
    margin: auto;
    width: 1000px;
    min-height: 100vh;
}

* {
    box-sizing: border-box;
}
</style>