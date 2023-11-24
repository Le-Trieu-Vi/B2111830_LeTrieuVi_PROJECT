<template>
	<div class="container mb-4">
		<h1 class="m-b-50 mt-2 mb-3 text-center">
			Đặt hàng
		</h1>
		<div class="row d-flex justify-content-center h-100">
			<div class="col-4">
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
									<i class="fa-solid fa-id-card me-2" style="color: rgb(41, 41, 255); font-size: 30px;"></i>
									<h3 class="fw-bold">Họ tên người nhận</h3>
								</div>
							</div>
							<div class="row pt-1">
								<div class="d-flex flex-row align-items-center mb-3">
									<Field
										name="name"
										type="text"
										class="form-control"
										v-model="curUser.name"
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
									<i class="fa-solid fa-phone-volume me-2" style="color: rgb(30, 210, 7); font-size: 30px;"></i>
									<h3 class="fw-bold">Số điện thoại</h3>
								</div>
							</div>
							<div class="row pt-1">
								<div class="d-flex flex-row align-items-center mb-3">
									<Field
										name="phone"
										type="tel"
										class="form-control"
										v-model="curUser.phone"
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
									<i class="fa-solid fa-location-dot me-2" style="color: rgb(210, 7, 7); font-size: 30px;"></i>
									<h3 class="fw-bold">Địa chỉ nhận hàng</h3>
								</div>
							</div>
							<div class="row pt-1">
								<div class="d-flex flex-row align-items-center mb-3">
									<Field
										name="address"
										type="text"
										class="form-control"
										v-model="curUser.address"
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
									<i class="fa-regular fa-clipboard me-2" style="color: rgb(7, 176, 210); font-size: 30px;"></i>
									<h3 class="fw-bold">Ghi chú</h3>
								</div>
							</div>
							<div class="row pt-1">
								<div class="d-flex flex-row align-items-center mb-3">
									<textarea
										rows="4"
										v-model="notion"
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
			</div>
			<div class="col-8">
				<div class="card card-stepper text-black" style="border-radius: 16px;">
					<h2 class="text-center fw-bold mt-4">Chi tiết đơn hàng</h2>
					<div class="card-body mt-4">
						<div class="">
							<ul class="d-flex justify-content-between ms-4 me-5 mb-0">
								<li><h3>Đơn hàng bao gồm:</h3> &nbsp;</li>
							</ul>
							<div>
								<ProductsListItem
									v-for="product in cartItems"
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
		<div class="d-flex justify-content-center">
			<button @click="createOrder" class="btn btn-primary">Đặt hàng</button>
		</div>
		<CheckOutModal
			:showCheckOutModal="showCheckOutModal"
			:order="order"
		>
		</CheckOutModal>
	</div>
</template>

<script>
import {mapGetters} from 'vuex';
import * as yup from 'yup';
import UserService from '@/services/user.service';
import OrderService from '@/services/order.service';
import { Form, Field, ErrorMessage } from 'vee-validate';
import ProductsListItem from '@/components/ProductsListItem.vue';
import CheckOutModal from '@/components/CheckOutModal.vue';

export default {
    name: 'CheckOutPage',
    components: {
		Form,
		Field,
		ErrorMessage,
		ProductsListItem,
		CheckOutModal,
	},
	data() {
		const userFormSchema = yup.object().shape({
			name: yup
				.string()
				.required('Tên không được để trống')
				.min(2, 'Tên phải ít nhất 2 ký tự.')
				.max(50, 'Tên có nhiều nhất 50 ký tự.'),
			address: yup
				.string()
				.required('Địa chỉ không được để trống')
				.max(100, 'Địa chỉ tối đa 100 ký tự.'),
			phone: yup
				.string()
				.required('Số điện thoại không được để trống')
				.matches(
					/((09|03|07|08|05)+([0-9]{8})\b)/g,
					'Số điện thoại không hợp lệ.'
				),
		});
		return {
			userFormSchema,
			curUser: {},
			notion: "",
			order: {},
			showCheckOutModal: false,
        };
	},
	computed: {
		...mapGetters(['user', 'cartItems', 'totalPrice']),
    },
    methods: {
		async createOrder() {
			if (!this.curUser.name || !this.curUser.address || !this.curUser.phone){
				Swal.fire({
					icon: 'error',
					title: `Vui lòng nhập đầy đủ thông tin` 
				})
				return;
			}
			this.order = await OrderService.create(this.curUser, this.cartItems, this.notion);
			this.cartItems = await UserService.showCart(this.user._id);
			this.showCheckOutModal = true;
		}
    },
    async created() {
		this.curUser._id = this.user._id;
		this.curUser.name = this.user.name;
		this.curUser.phone = this.user.phone;
		this.curUser.address = this.user.address;
    }
};
</script>

<style scoped>
	h1 {
        margin: 0;
        margin-top: 16px;
        padding: 16px;
		font-size: 2em;
		font-weight: bold;
    }

	label {
		display: block;
		margin-top: 10px;
	}

	.form-group {
		margin-bottom: 10px;
	}

	.form-check {
		display: contents;
	}

	.form-check-label {
		margin-left: 10px;
	}

	.form-check-input:checked {
		background-color: var(--salmon);
		border: none;
		outline: none;
	}

	.error-feedback {
		color: red;
	}

	.register-btn {
		width: 100%;
	}

	.choosed-image-border {
		border: 2px solid rgb(15, 233, 15);
	}

</style>