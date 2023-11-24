<template>
    <div class="container mb-4">
		<div class="card-header text-center py-3">
			<h1 class="m-b-50 mt-2 mb-3 text-center">
				Giỏ hàng
			</h1>
		</div>
		<div class="card card-stepper text-black" style="border-radius: 16px;">
			<div class="card-body mt-2">
				<div v-if="cartItems.length > 0">
					<ProductsListItem
						v-for="product in cartItems"
						:key="product.productDetail._id"
						:product_pair="product"
					/>
					<h3  id="total-price" class="total">Thành tiền: {{ totalPrice }}</h3>

					<div class="d-flex justify-content-end mb-2">
						<router-link to="/checkout">
							<button class="btn btn-danger">Đặt hàng</button>
						</router-link>
					</div>
				</div>
				<p v-else>Bạn chưa có sản phẩm nào trong giỏ hàng!</p>
			</div>

		<router-link class="d-flex justify-content-center text-decoration-none" to="/products">
			<button class="btn btn-primary m-3">Tiếp tục xem sản phẩm</button>
        </router-link>
		</div>
    </div>
</template>

<script>

import {mapActions, mapGetters} from 'vuex';
import ProductsListItem from '@/components/ProductsListItem.vue';

export default {
    name: 'CartPage',
    components: {
        ProductsListItem,
    },
    computed: {
		...mapGetters(['user', 'cartItems', 'totalPrice'])
    },
    methods: {

    },
    async mounted() {
		this.$store.dispatch('getCartItems');
    }
};
</script>

<style scoped>
	.container {
		width: 75%;
	}
    h1 {
        margin: 0;
        margin-top: 16px;
        padding: 16px;
		font-size: 2em;
		font-weight: bold;
    }
    #total-price {
        padding: 16px;
        text-align: right;
    }

</style>