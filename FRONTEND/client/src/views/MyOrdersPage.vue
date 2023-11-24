<template>
	<div class="container py-4">

		<div class="card">
			<div class="card-header text-center py-3">
				<h1 class="m-b-50 mt-2 mb-3 text-center">
					Lịch sử mua hàng
					<p class="d-flex justify-content-end align-items-center h6">
						<img src="https://cdn1.iconfinder.com/data/icons/maths/300/41134850Untitled-3-64.png" class="rounded-cỉrcle me-2" height="30" />
						Tổng số: {{ allOrders.length }}
					</p>
				</h1>
			</div>
			<div v-if="allOrders.length" class="card-body">
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
								Ngày đặt hàng
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
						<tr v-for="(order, index) in allOrders" :key="order._id">
							<td>{{ index+1 }}</td>
							<td>{{ order._id }}</td>
							<td>{{ order.createAt }}</td>
							<td>
								<img :src="imageStatus[order.status]" class="me-1" height="25" />
								{{ order.status }}
							</td>
							<td>{{ totalPrice(order) }}</td>
							<td>
								<div>
									<!-- more info -->
									<a
										class="btn-floating rounded-circle me-2"
										role="button"
										@click="showOrderInfo(order._id)"
										title="Xem chi tiết"
										>
										<img src="https://cdn3.iconfinder.com/data/icons/actions-1/30/action_025-info-detail-information-more-64.png" height="25" />
									</a>
									<!-- edit -->
									<a
										v-if="order.status === 'Chưa xử lí'"
										class="btn-floating rounded-circle me-1"
										role="button"
										@click="updateOrder(order._id)"
										title="Chỉnh sửa đơn hàng"
									>
										<img src="https://cdn1.iconfinder.com/data/icons/unicons-line-vol-3/24/edit-128.png" height="25" />
									</a>
									<!-- delete -->
									<a
										v-if="order.status === 'Chưa xử lí'"
										class="btn-floating rounded-circle"
										role="button"
										@click="deleteOrder(order._id)"
										title="Xóa đơn hàng"
									>
										<img src="https://cdn4.iconfinder.com/data/icons/social-messaging-ui-coloricon-1/21/52-128.png" height="25" />
									</a>
								</div>
							</td>
						</tr>

					</tbody>
					</table>
				</div>
			</div>
			<p v-else>Bạn chưa có đơn hàng nào!</p>
		</div>

		<OrderInfoModal
			:showOrderInfoModal="showOrderInfoModal"
			:order="choosedOrder"
		>
		</OrderInfoModal>

		<EditOrderModal
			:showEditOrderModal="showEditOrderModal"
			:order="choosedOrder"
		>
		</EditOrderModal>

	</div>
</template>

<script>
import {mapGetters} from 'vuex';
import OrderService from '@/services/order.service';
import OrderInfoModal from '@/components/OrderInfoModal.vue';
import EditOrderModal from '@/components/EditOrderModal.vue';

export default {
	name: 'MyOrdersPage',
	components: {
		OrderInfoModal,
		EditOrderModal,
	},
	data() {
		return {
			showOrderInfoModal: false,
			showEditOrderModal: false,
			// orders: [],
			imageStatus: [],
			choosedOrder: {}
		}
	},
	computed: {
		...mapGetters(['user', 'allOrders']),
	},
	methods: {
		totalPrice(order) {
			let price = 0;
			const cartItems = order.cartItems;
			for (let index in cartItems) {
				let item = cartItems[index];
				item.productDetail.price = item.productDetail.price.replace(',', '.');
				price += Number(item.productDetail.price*item.productCount);
			}
			return this.formatPrice(price);
        },
		formatPrice(num) {
			var p = num.toString().split(".");
			return p[0].split("").reverse().reduce(function(acc, num, i, orig) {
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
					this.$store.dispatch('getAllOrders');

					Swal.fire(
						'Đã xóa',
						'Hủy đơn hàng thành công!',
						'success'
					)
				}
			})
		},
		async updateOrder(id) {
			this.showEditOrderModal = true;
			this.choosedOrder = await OrderService.getOne(id);
			this.showOrderInfoModal = false;
		},
		async showOrderInfo(id) {
			this.showOrderInfoModal = true;
			this.choosedOrder = await OrderService.getOne(id);
			this.showEditOrderModal = false;
		},
	},
	async mounted() {
		this.$store.dispatch('getAllOrders');
		this.imageStatus = {
			'Chưa xử lí': 'https://cdn3.iconfinder.com/data/icons/social-messaging-ui-color-shapes-2/128/new-badge-red-2-64.png',
			'Đang xử lí': 'https://cdn4.iconfinder.com/data/icons/business-pack-7/64/cycle-project-organization-task-64.png',
			'Hoàn thành': 'https://cdn0.iconfinder.com/data/icons/social-messaging-ui-color-shapes/128/check-circle-green-64.png',
		}
	}
}
</script>

<style scoped>

	th, td {
		text-align: center;
	}

</style>