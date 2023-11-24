<template>
    <div class="product-container">
        <img class="product-image" v-bind:src="product.imageUrl" />
        <div class="details-wrap">
			<h3 class="product-name ms-2">{{ product.name }}</h3>
            <p class="ms-2">{{ product.price }}VND</p>
            <p class="ms-2">Số lượng có sẵn: {{ product.quantity }}</p>
			<div class="d-flex">
				<img type="button" v-on:click="removeProduct" src="https://cdn1.iconfinder.com/data/icons/warnings-and-dangers/400/Warning-05-64.png" class="me-2" height="30" />
				<input
					type="number"
					v-model="count"
					style="width: 70px; text-align: center;"
					class="me-2"
					v-on:input="changeProductCount"
					>
				<img type="button" v-on:click="addProduct" src="https://cdn1.iconfinder.com/data/icons/basic-ui-elements-color/700/07_plus-64.png" class="me-2" height="30" />
			</div>
			<div v-if="exceed" class="d-flex flex-row align-items-center mb-4">
				<div class="form-outline flex-fill mt-3 mb-0">
					<p class="error-feedback">Vượt quá số lượng sản phẩm có sẵn trong kho!</p>
				</div> 
			</div>
			<div v-if="negative" class="d-flex flex-row align-items-center mb-4">
				<div class="form-outline flex-fill mt-3 mb-0">
					<p class="error-feedback">Số lượng sản phẩm không được nhỏ hơn 0!</p>
				</div>
			</div>
        </div>
        <button
            class="remove-button btn btn-danger"
            @click="removeProductCompletely"
        >Xóa khỏi {{ (this.$route.name === 'CartPage') ? 'giỏ hàng' : 'đơn hàng' }}
		</button>
    </div>
</template>

<script>
import {mapGetters} from 'vuex';
export default {
    name: 'ProductsListItem',
    props: ['product_pair'],
	data() {
		return {
			product: {},
			count: 0,
			exceed: false,
			negative: false
		}
	},
	computed: {
		...mapGetters(['user'])
	},
	methods: {
		async addProduct() {
			this.count++;
			if (this.count > this.product.quantity) {
				this.exceed = true;
				setTimeout(( ) => {
					this.exceed = false;
					this.count = this.product.quantity;
				}, 3000);
			}
			this.$store.dispatch('addToCart', this.product);
		},
		async removeProduct() {
			if (this.count >= 1) this.$store.dispatch('removeFromCart', this.product);
			this.count--;
		},
		async removeProductCompletely() {
			Swal.fire({
				title: 'Bạn có chắc chắn muốn xóa?',
				text: "Thao tác này không thể hoàn tác!",
				icon: 'warning',
				showCancelButton: true,
				confirmButtonColor: '#3085d6',
				cancelButtonColor: '#d33',
				confirmButtonText: 'Chắc chắn',
				cancelButtonText: 'Hủy bỏ'
			}).then(async (result) => {
				if (result.isConfirmed) {
					this.$store.dispatch('removeProductCompletely', this.product);
					Swal.fire(
						'Đã xóa',
						'Xóa khỏi giỏ hàng thành công!',
						'success'
					)
				}
			})
        },
		async changeProductCount() {
			if (this.count === "") return;
			if (this.count > this.product.quantity) {
				this.exceed = true;
				setTimeout(( ) => {
					this.exceed = false;
					this.count = this.product.quantity;
				}, 3000);
			} else if (this.count < 0) {
				this.negative = true;
				setTimeout(( ) => {
					this.negative = false;
					this.count = 1;
				}, 3000);
			}
			if (this.count >= 1) {
				this.$store.dispatch('changeProductCount', {product: this.product, count: this.count});
			}
		},
	},
	created() {
		this.product = this.product_pair.productDetail;
		this.count = this.product_pair.productCount;
	}
}
</script>

<style scoped>
    .product-container {
        align-content: 'center';
        border-bottom: 1px solid #ddd;
        display: flex;
        padding: 16px;
        width: 100%;
    }

    .product-image {
        flex: 1;
        height: 100px;
        max-width: 100px;
    }

    .details-wrap {
        padding: 0 16px;
        flex: 3;
    }

    .remove-button {
        margin: auto;
    }

	.error-feedback {
		color: red;
	}

</style>