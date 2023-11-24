<template>
	<div id="app">
		<NavBar @submitSearchTextFromChild="submitSearchText" @updateSearchTextFromChild="updateSearchText" />
		<!-- nhung trang khong co sidebars -->
		<div v-if="noSideBarPages.includes(this.$route.name)">
			<router-view v-if="searchText === ''" :products="products" />
			<router-view v-else-if="filteredProductsCount > 0" :products="filteredProducts" />
			<p v-else>Không tìm thấy kết quả nào.</p>
		</div>
		<div v-else class="mt-4">
			<div>
				<router-view v-if="searchText === ''" :products="products" />
				<router-view v-else-if="filteredProductsCount > 0" :products="filteredProducts" />
				<img v-else class="not-found" src="./assets/product_not_found.png" alt="">
			</div>
		</div>
		<FooterView />
		<button @click="scrollToTop" id="scrollToTopBtn" class="text-bg-secondary" title="Quay về đầu trang"><i class="fa-solid fa-arrow-up"></i></button>
	</div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import FooterView from '@/components/FooterView.vue';
import ProductService from '@/services/product.service'
import UserService from '@/services/user.service'

export default {
	name: 'App',
	components: {
		NavBar,
		FooterView,
	},
	data() {
		return {
			user: {},
			products: [],
			searchText: "",
			activeIndex: -1,
			filterPrice: {},
			noSideBarPages: [],
		};
	},
	watch: {
		// Giám sát các thay đổi của biến searchText.
		// Bỏ chọn phần tử đang được chọn trong danh sách.
		searchText() {
			this.activeIndex = -1;
		},
	},
	computed: {
		// Chuyển các đối tượng product thành chuỗi để tiện cho tìm kiếm.
		productStrings() {
			return this.products.map((product) => {
				const { name, price, description, averageRating } = product;
				return [name, price, description, averageRating].join("");
			});
		},
		// Trả về các product có chứa thông tin cần tìm kiếm.
		filteredProducts() {
			if (!this.searchText) return this.products;
			if (this.searchText === '<300') {
				return this.getProductsPrice({ low: '', high: '299.000' });
			}
			if (this.searchText === '300-500') {
				return this.getProductsPrice({ low: '300.000', high: '500.000' });
			}
			if (this.searchText === '>500') {
				return this.getProductsPrice({ low: '500.000', high: '' });
			}
			return this.products.filter((_product, index) =>
				this.productStrings[index].toLowerCase().includes(this.searchText)
			);
		},
		activeProduct() {
			if (this.activeIndex < 0) return null;
			return this.filteredProducts[this.activeIndex];
		},
		filteredProductsCount() {
			return this.filteredProducts.length;
		},
	},
	methods: {
		submitSearchText(inputValue) {
			this.searchText = inputValue;
			return this.products;
		},
		updateSearchText(inputValue) {
			this.searchText = inputValue;
			return this.products;
		},
		getProductsPrice(filter) {
			const allProducts = this.products;
			const filterProducts = [];
			for (let index in allProducts) {
				const product = allProducts[index];
				if (filter.low === '' && product.price <= filter.high) {
					filterProducts.push(product);
				} else if (filter.high === '' && product.price >= filter.low) {
					filterProducts.push(product);
				} else if (product.price >= filter.low && product.price <= filter.high) {
					filterProducts.push(product);
				}
			}
			return filterProducts;
		},
		scrollToTop() {
			window.scrollTo({
				top: 0,
				behavior: 'smooth'
			});
		},
	},
	async created() {
		this.searchText = '';
		this.products = await ProductService.getAll();
		this.noSideBarPages = ["LoginPage", "RegisterPage", "CartPage", "CartPage", "BlogPage", "BlogPost",
			"UpdatePage", "CheckOutPage", "MyOrdersPage", "NotificationPage"];
		const response = await UserService.getOne();
		this.$store.dispatch('user', response);
		this.$store.dispatch('getAllOrders');
		this.$store.dispatch('getProcessingOrderCount');
		this.$store.dispatch('getCompletedOrderCount');
	}
}
</script>

<!-- do not use scoped here -->
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Lora:ital@1&family=Roboto+Serif:opsz,wght@8..144,500&display=swap');

* {
	box-sizing: border-box;
	font-family: 'Lora', serif;
}

#page-wrap {
	max-width: 100vw;
	min-height: 100vh;
}

.not-found {
	display: block;
	margin: 100px auto;
	width: 400px;
}


#scrollToTopBtn {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
  font-size: 16px;
  border: none;
  outline: none;
  cursor: pointer;
  padding: 12px;
  border-radius: 8px;
}

#scrollToTopBtn:hover {
  opacity: 0.8;
}
</style>
