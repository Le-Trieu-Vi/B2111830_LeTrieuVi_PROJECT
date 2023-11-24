252525<template>
	<div>
		<div class="container py-4">
			<section class="mb-4">
				<div class="25rd">
					<div class="card-header text-center py-3">
						<h1 class="m-b-50 mt-2 mb-3 text-center">
							Danh sách đơn hàng
							<p class="d-flex justify-content-end align-items-center h6">
								<img src="https://cdn1.iconfinder.com/data/icons/maths/300/41134850Untitled-3-64.png"
									class="rounded-cỉrcle me-2" height="25" />
								Tổng số: {{ orders.length }}
							</p>
						</h1>
					</div>
					<div class="card-body">
						<div class="table-responsive">
							<table class="table table-hover text-nowrap">
								<thead>
									<tr>
										<th scope="col">
											STT
										</th>
										<th scope="col">
											Mã đơn hàng
										</th>
										<th scope="col">
											Ảnh
										</th>
										<th scope="col">
											Tên khách hàng
										</th>
										<th scope="col">
											Thời gian đặt hàng
										</th>
										<th scope="col">
											Trạng thái
										</th>
										<th scope="col">
											Tổng tiền
										</th>
										<th scope="col">
											Thao tác
										</th>
									</tr>
								</thead>
								<tbody>
									<tr v-for="(order, index) in orders" :key="order._id">
										<td>{{ index + 1 }}</td>
										<td>{{ order._id }}</td>
										<td>
											<div class="notification-list_img">
												<img :src="images[index]" class="img-fluid shadow-1-strong rounded-5"
													alt="" />
											</div>
										</td>
										<td>{{ usernames[index] }}</td>
										<td>{{ order.createAt }}</td>
										<td>
											<img :src="imageStatus[order.status]" class="me-1" height="25" />
											{{ order.status }}
										</td>
										<td>{{ totalPrice(order) }}</td>
										<td>
											<div>
												<!-- more info -->
												<a class="btn-floating rounded-circle me-1" role="button"
													@click="showOrderInfo(order._id)" title="Xem chi tiết">
													<img src="https://cdn3.iconfinder.com/data/icons/actions-1/30/action_025-info-detail-information-more-64.png"
														class="me-2" height="25" />
												</a>
												<!-- new -->
												<a class="btn-floating rounded-circle me-1" role="button"
													@click="updateOrder(order._id, '0')" title="Chưa xử lí">
													<img :src="imageStatus['Chưa xử lí']" class="me-2" height="25" />
												</a>
												<!-- processing -->
												<a class="btn-floating rounded-circle me-1" role="button"
													@click="updateOrder(order._id, '1')" title="Đang xử lí">
													<img :src="imageStatus['Đang xử lí']" class="me-2" height="25" />
												</a>
												<!-- finished -->
												<a class="btn-floating rounded-circle me-1" role="button"
													@click="updateOrder(order._id, '2')" title="Hoàn thành">
													<img :src="imageStatus['Hoàn thành']" class="me-2" height="25" />
												</a>
												<!-- delete -->
												<a class="btn-floating rounded-circle" role="button"
													@click="deleteOrder(order._id)" title="Xóa đơn hàng">
													<img src="https://cdn2.iconfinder.com/data/icons/e-business-helper/240/627249-delete3-64.png"
														class="rounded-cỉrcle" height="25" />
												</a>
											</div>
										</td>
									</tr>

								</tbody>
							</table>
						</div>
					</div>
				</div>
			</section>
		</div>

		<OrderInfoModal :showOrderInfoModal="showOrderInfoModal" :order="choosedOrder">
		</OrderInfoModal>
	</div>
</template>

<script>
import UserService from '@/services/user.service.js';
import OrderService from '@/services/order.service.js';
import OrderInfoModal from '@/components/OrderInfoModal.vue';

export default {
	name: "OrderManage",
	components: {
		OrderInfoModal,
	},
	data() {
		return {
			showOrderInfoModal: false,
			orders: [],
			usernames: [],
			images: [],
			imageStatus: [],
			choosedOrder: {}
		}
	},
	methods: {
		totalPrice(order) {
			let price = 0;
			const cartItems = order.cartItems;
			for (let index in cartItems) {
				let item = cartItems[index];
				price += Number(item.productDetail.price * item.productCount);
			}
			return this.formatPrice(price);
		},
		formatPrice(num) {
			var p = num.toString().split(".");
			return p[0].split("").reverse().reduce(function (acc, num, i, orig) {
				return num + (num != "-" && i && !(i % 3) ? "." : "") + acc;
			}, "") + ".000VND";
		},
		deleteOrder(id) {
			Swal.fire({
				title: 'Bạn có chắc chắn muốn hủy đơn hàng?',
				text: "Thao tác này không thể hoàn tác!",
				icon: 'warning',
				showCancelButton: true,
				confirmButtonColor: '#3085d6',
				cancelButtonColor: '#d33',
				confirmButtonText: 'Chắc chắn',
				cancelButtonText: 'Thoát'
			}).then(async (result) => {
				if (result.isConfirmed) {

					await OrderService.delete(id);
					this.orders = await OrderService.getAll();

					Swal.fire(
						'Đã xóa',
						'Hủy đơn hàng thành công!',
						'success'
					)
				}
			})
		},
		async updateOrder(id, option) {
			let data = await OrderService.getOne(id);
			const new_status = (option === '0') ? 'Chưa xử lí' : (option === '1') ? 'Đang xử lí' : 'Hoàn thành';
			if (data.status == new_status) return;
			data.status = new_status;
			await OrderService.update(id, data);
			this.orders = await OrderService.getAll();
			this.$store.dispatch('getNewOrderCount');
			Toast.fire({
				icon: 'success',
				title: 'Cập nhật trạng thái đơn hàng thành công!'
			})
		},
		async showOrderInfo(id) {
			this.showOrderInfoModal = true;
			this.choosedOrder = await OrderService.getOne(id);
		},
	},
	async created() {
		const orders = await OrderService.getAll();
		this.orders = orders;
		for (let index in orders) {
			const order = orders[index];
			const user = await UserService.findById(order.userId);
			this.usernames.push(user.name);
			this.images.push(user.image);
		}
		this.imageStatus = {
			'Chưa xử lí': 'https://cdn3.iconfinder.com/data/icons/social-messaging-ui-color-shapes-2/128/new-badge-red-2-64.png',
			'Đang xử lí': 'https://cdn4.iconfinder.com/data/icons/business-pack-7/64/cycle-project-organization-task-64.png',
			'Hoàn thành': 'https://cdn0.iconfinder.com/data/icons/social-messaging-ui-color-shapes/128/check-circle-green-64.png',
		}
	}
}
</script>

<style scoped>
body {
	background-color: #fbfbfb;
}

@media (min-width: 991.98px) {
	main {
		padding-left: 240px;
	}
}

.notification-list_img {
	height: 70px;
	width: 70px;
	border-radius: 50px;
	margin-right: 20px;
}

.table>tbody {
	vertical-align: middle;
}

th,
td {
	text-align: center;
}

.container {
	margin-bottom: 30px;
}
</style>