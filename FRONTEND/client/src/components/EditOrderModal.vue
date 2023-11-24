
<template>
	<!-- Modal Begin -->
	<div v-if="showEditOrderModal"
		:height = "auto"
		:scrollable = "true"
		:adaptive="true"
	>
		<transition name="modal">
		<div class="modal-mask modal">
			<div class="modal-wrapper" tabindex="-1" role="dialog" data-replace="true">
			<div class="modal-dialog " role="document">

				<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="exampleModalLongTitle">Chỉnh sửa đơn hàng</h5>
					<button type="button" @click="showEditOrderModal = false" class="close rounded-3" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div class="modal-body" id="editOrderModal">

					<div class="row d-flex justify-content-center h-100" style="margin: inherit;">
							<div class="card card-stepper text-black" style="border-radius: 16px;">
								<h2 class="text-center fw-bold mt-4">Thông tin nhận hàng</h2>
								<div class="card-body mt-4">
									<Form
										:validation-schema="userFormSchema"
										class="container h-100"
									>
										<!-- name begin -->
										<div class="row">
											<div class="d-flex flex-row align-items-center mb-3">
												<img src="https://cdn1.iconfinder.com/data/icons/okku-office/32/Okku_Office_Expand-07-512.png" class="rounded-cỉrcle me-2" height="30" />
												<h3 class="fw-bold">Họ tên người nhận</h3>
											</div>
										</div>
										<div class="row pt-1">
											<div class="d-flex flex-row align-items-center mb-3">
												<Field
													name="name"
													type="text"
													class="form-control"
													v-model="order.name"
												/>
											</div>
											<div class="d-flex flex-row align-items-center mb-4">
											<div class="form-outline flex-fill mb-0">
												<ErrorMessage name="name" class="error-feedback" />
											</div>
										</div>
										</div>
										<!-- name end -->

										<!-- phone begin -->
										<hr class="mt-0 mb-3">
										<div class="row">
											<div class="d-flex flex-row align-items-center mb-3">
												<img src="https://cdn1.iconfinder.com/data/icons/contact-us-flat-1/58/033_-_Telephone-64.png" class="rounded-cỉrcle me-2" height="30" />
												<h3 class="fw-bold">Số điện thoại</h3>
											</div>
										</div>
										<div class="row pt-1">
											<div class="d-flex flex-row align-items-center mb-3">
												<Field
													name="phone"
													type="tel"
													class="form-control"
													v-model="order.phone"
												/>
											</div>
											<div class="d-flex flex-row align-items-center mb-4">
											<div class="form-outline flex-fill mb-0">
												<ErrorMessage name="phone" class="error-feedback" />
											</div>
										</div>
										</div>
										<!-- phone end -->

										<!-- address begin -->
										<hr class="mt-0 mb-3">
										<div class="row">
											<div class="d-flex flex-row align-items-center mb-3">
												<img src="https://cdn3.iconfinder.com/data/icons/illustricon-tech/512/map.position.address-64.png" class="rounded-cỉrcle me-2" height="30" />
												<h3 class="fw-bold">Địa chỉ nhận hàng</h3>
											</div>
										</div>
										<div class="row pt-1">
											<div class="d-flex flex-row align-items-center mb-3">
												<Field
													name="address"
													type="text"
													class="form-control"
													v-model="order.address"
												/>
											</div>
											<div class="d-flex flex-row align-items-center mb-4">
											<div class="form-outline flex-fill mb-0">
												<ErrorMessage name="address" class="error-feedback" />
											</div>
										</div>
										</div>
										<!-- address end -->

										<!-- notion begin -->
										<hr class="mt-0 mb-3">
										<div class="row">
											<div class="d-flex flex-row align-items-center mb-3">
												<img src="https://cdn4.iconfinder.com/data/icons/color-valentine-love-set/100/16-01-64.png" class="rounded-cỉrcle me-2" height="30" />
												<h3 class="fw-bold">Ghi chú</h3>
											</div>
										</div>
										<div class="row pt-1">
											<div class="d-flex flex-row align-items-center mb-3">
												<textarea
													rows="4"
													v-model="order.notion"
													style="width: 100%"
												>
												Nhập mô tả...
												</textarea>
											</div>
										</div>
										<!-- notion end -->

									</Form>
								</div>
							</div>
							<div class="card card-stepper text-black" style="border-radius: 16px;">
								<h2 class="text-center fw-bold mt-4">Chi tiết đơn hàng</h2>
								<div class="card-body mt-4">
									<div class="">
										<ul class="d-flex justify-content-between ms-4 me-5 mb-0">
											<li><h3>Đơn hàng bao gồm:</h3> &nbsp;</li>
										</ul>
										<div>
											<ProductsListItemEdit
												v-for="product in order.cartItems"
												@remove-from-cart="removeFromCart($event)"
												@add-to-cart="addToCart($event)"
												@change-product-count="changeProductCountFromChild($event)"
												@remove-product-completely="removeProductCompletely($event)"
												:key="product.productDetail._id"
												:product_pair="product"
											/>
										</div>

										<div class="d-flex justify-content-between mt-3">
											<ul class="d-flex justify-content-between ms-4 mb-0">
												<li><h3>Phí giao hàng:</h3> &nbsp;</li>
											</ul>
											<h3>Miễn phí</h3>
										</div>
										<div class="d-flex justify-content-between mt-2">
											<ul class="d-flex justify-content-between ms-4 mb-0">
												<li><h3>Tổng cộng:</h3> &nbsp;</li>
											</ul>
											<h3 class="total">{{ totalPrice }}</h3>
										</div>
									</div>
								</div>
							</div>
						</div>
				</div>
				<div class="modal-footer">
					<button type="button" @click="updateOrder(); showEditOrderModal = false" class="close-btn btn btn-secondary custom-btn-primary">Cập nhật</button>
					<button type="button" @click="showEditOrderModal = false" class="close-btn btn btn-secondary custom-btn-primary" data-dismiss="modal">Đóng</button>
				</div>
				</div>
			</div>
			</div>
		</div>
		</transition>

	</div>
	<!-- Modal End -->
</template>

<script>
import {mapGetters} from 'vuex';
import * as yup from 'yup';
import OrderService from '@/services/order.service';
import { Form, Field, ErrorMessage } from 'vee-validate';
import ProductsListItemEdit from '@/components/ProductsListItemEdit.vue';
import CheckOutModal from '@/components/CheckOutModal.vue';

export default {
	name: 'EditOrderModal',
	props: ['showEditOrderModal', 'order'],
    components: {
		Form,
		Field,
		ErrorMessage,
		ProductsListItemEdit,
		CheckOutModal,
	},
	data() {
		const userFormSchema = yup.object().shape({
			name: yup
				.string()
				.required('Không được để trống tên')
				.min(2, 'Tên phải ít nhất 2 ký tự.')
				.max(50, 'Tên có nhiều nhất 50 ký tự.'),
			address: yup
				.string()
				.max(100, 'Địa chỉ tối đa 100 ký tự.'),
			phone: yup
				.string()
				.matches(
					/((09|03|07|08|05)+([0-9]{8})\b)/g,
					'Số điện thoại không hợp lệ.'
				),
		});
		return {
			userFormSchema,
			showCheckOutModal: false,
        };
	},
	computed: {
		...mapGetters(['user']),
        totalPrice() {
			let price = 0;
			const cartItems = this.order.cartItems;
			for (let index in cartItems) {
				let item = cartItems[index];
				price += Number(item.productDetail.price*item.productCount);
			}
			return this.formatPrice(price);
        },
    },
    methods: {
		async removeProductCompletely(productId) {
			Swal.fire({
				target: document.getElementById('editOrderModal'),
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
					const cartItems = await OrderService.changeProductCount(this.order._id, productId, 0);
					this.order.cartItems = cartItems;
					this.$store.dispatch('getAllOrders');
					Swal.fire({
						target: document.getElementById('editOrderModal'),
						title: 'Xóa khỏi giỏ hàng thành công!',
						icon: 'success'
					})
				}
			})
        },
		formatPrice(num) {
			var p = num.toString().split(".");
			return p[0].split("").reverse().reduce(function(acc, num, i, orig) {
				return num + (num != "-" && i && !(i % 3) ? "." : "") + acc;
			}, "") + ".000VND";
		},
		async changeProductCountFromChild(data) {
			const cartItems = await OrderService.changeProductCount(this.order._id, data.productId, data.count);
			this.order.cartItems = cartItems;
			this.$store.dispatch('getAllOrders');
		},
        async removeFromCart(productId) {
			const cartItems = await OrderService.deleteCart(this.order._id, productId);
			this.order.cartItems = cartItems;
			this.$store.dispatch('getAllOrders');
        },
		async addToCart(product) {
			const cartItems = await OrderService.insertCart(this.order._id, product);
			this.order.cartItems = cartItems;
			this.$store.dispatch('getAllOrders');
        },
		async updateOrder() {
			await OrderService.update(this.order._id, this.order);
			this.$store.dispatch('getAllOrders');
			Swal.fire(
				'Đã lưu',
				'Cập nhật đơn hàng thành công!',
				'success'
			)
		}
    },
    async created() {
    }
};
</script>

<style scoped>
	.modal-mask {
		position: fixed;
		z-index: 9998;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, .5);
		display: table;
		transition: opacity .3s ease;
	}

	.modal-wrapper {
		display: table-cell;
		vertical-align: middle;
	}

	.modal-dialog {
		max-width: 60%;
	}

	.modal-footer {
		border: none;
		justify-content: center;
	}

	.modal-body {
		margin-top: 12px;
	}

	#img-wrap {
        text-align: center;
    }

</style>
