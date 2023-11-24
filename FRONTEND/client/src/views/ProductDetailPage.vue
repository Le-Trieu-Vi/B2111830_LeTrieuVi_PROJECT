<template>
	<div class="container" v-if="product">
		<div class="row">
			<div class="col-12 col-lg-6">
				<div id="img-wrap">
					<img v-bind:src="product.imageUrl" />
				</div>
			</div>
			<div class="col-12 col-lg-6">
				<div id="product-details">
					<h1 class="product-name">{{ product.name }}</h1>
					<RatingStar></RatingStar>
					<p class="mt-3">Số lượng có sẵn: {{ product.quantity }}</p>
					<p id="price">Giá tiền: {{ product.price }}VND</p>
					<div v-if="itemIsInCart">
						Số lượng đã đặt: {{ count }}
					</div>
					<div class="my-star">
						<div v-for="index in parseInt(product.averageRating)" :key="index" class="me-2">
							<img src="https://cdn3.iconfinder.com/data/icons/cosmo-color-basic-2/40/star-64.png"
								style="width: 20px;" height="20" />
						</div>
						<div v-if="parseInt(product.averageRating) < product.averageRating" class="me-2">
							<img src="https://cdn0.iconfinder.com/data/icons/stars-rounded/250/Gold_Half_Star_5-64.png"
								style="width: 20px;" height="20" />
						</div>
					</div>
					<button class="btn btn-danger add-cart" type="submit" @click="addToCart">Thêm vào giỏ hàng</button>
					<hr>
					<h4>Mô tả</h4>
					<p>{{ product.description }}</p>
				</div>
			</div>

		</div>
	</div>
	<NotFoundPage v-else />
</template>

<script>
import RatingStar from '@/components/RatingStar.vue';
import { mapGetters } from 'vuex';
import NotFoundPage from '@/views/NotFoundPage.vue';
import ProductService from '@/services/product.service';

export default {
	name: 'ProductDetailPage',
	components: {
		NotFoundPage,
	},
	data() {
		return {
			product: {},
			notAdded: false,
			count: 0,
		};
	},
	computed: {
		...mapGetters(['user', 'cartItems']),
		itemIsInCart() {
			if (this.cartItems.length === 0) return false;
			for (let idx in this.cartItems) {
				const product = this.cartItems[idx];
				if (product.productDetail._id === this.product._id) {
					this.count = product.productCount;
					return 1;
				}
			}
			return 0;
		},
	},
	methods: {
		async addToCart() {
			if (this.product.quantity === '0') {
				Toast.fire({
					icon: 'error',
					title: 'Sản phẩm hiện không có!'
				})
				return;
			}
			this.$store.dispatch('addToCart', this.product);
			Toast.fire({
				icon: 'success',
				title: 'Thêm vào giỏ hàng thành công!'
			})
			setTimeout(() => {
				this.$router.push('/cart');
			}, 1500);
		},
		async getContent(id) {
			try {
				const product = await ProductService.getOne(id);
				this.product = product;
				if (!this.user._id) {
					this.cartItems = [];
					return;
				}
			} catch (error) {
				this.product = null;
			}
		}
	},
	created() {
		if (!this.user) {
			setTimeout(() => {
				this.$router.push('/login');
			}, 30);
		}
		this.getContent(this.$route.params.id);
	},
	beforeRouteUpdate(to, from, next) {
		this.getContent(to.params.id);
		next();
	}
};
</script>

<style scoped>
.container {
	margin-bottom: 30px;
}

img {
	width: 100%;
	object-fit: cover;
}

#product-details {
	position: relative;
}

#add-to-cart {
	width: 100%;
}

.add-cart {
	text-align: left;
}

.my-star {
	display: flex;
	justify-content: flex-start;
	margin-bottom: 10px;
}
</style>