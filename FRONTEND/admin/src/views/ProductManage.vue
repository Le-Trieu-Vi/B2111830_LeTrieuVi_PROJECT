<template>
	<div>
		<div class="container py-4">
			<section class="mb-4">
				<div class="card">
					<div class="card-header text-center py-3">
						<div class="d-flex justify-content-end">
							<button @click="showProductAddModal = true" class="btn btn-outline-primary">
								<fa icon="add" />
								Thêm sản phẩm
							</button>
						</div>
						<h1 class="m-b-50 mt-2 mb-3 text-center">
							Danh sách sản phẩm
							<p class="d-flex justify-content-end align-items-center h6">
								<img src="https://cdn1.iconfinder.com/data/icons/maths/300/41134850Untitled-3-64.png"
									class="rounded-cỉrcle me-2" height="30" />
								Tổng số: {{ products.length }}
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
											Mã sản phẩm
										</th>
										<th scope="col">
											Ảnh
										</th>
										<th scope="col">
											Tên sản phẩm
										</th>
										<th scope="col">
											Giá sản phẩm
										</th>
										<th scope="col">
											Đánh giá
										</th>
										<th scope="col">
											Số lượng
										</th>
										<th>
											Thao tác
										</th>
									</tr>
								</thead>
								<tbody>
									<tr v-for="(product, index) in  products " :key="product._id">
										<td>{{ index + 1 }}</td>
										<td>{{ product._id }}</td>
										<td>
											<div class="notification-list_img">
												<img :src="product.imageUrl" class="img-fluid shadow-1-strong rounded-5"
													alt="" />
											</div>
										</td>
										<td>{{ product.name }}</td>
										<td>{{ product.price }}</td>
										<td>{{ product.averageRating }}</td>
										<td>{{ product.quantity }}</td>
										<td>
											<div>
												<!-- more info -->
												<a class="btn-floating rounded-circle me-2" role="button"
													@click="showProductInfo(product._id)" title="Xem chi tiết">
													<img src="https://cdn3.iconfinder.com/data/icons/actions-1/30/action_025-info-detail-information-more-64.png" height="25" />
												</a>
												<!-- edit -->
												<a class="btn-floating rounded-circle me-1" role="button"
													@click="showProductEdit(product._id);" title="Chỉnh sửa">
													<img src="https://cdn1.iconfinder.com/data/icons/unicons-line-vol-3/24/edit-128.png" height="25" />
												</a>
												<!-- delete -->
												<a class="btn-floating rounded-circle me-2" role="button"
													@click=" deleteProduct(product._id) " title="Xóa sản phẩm">
													<img src="https://cdn4.iconfinder.com/data/icons/social-messaging-ui-coloricon-1/21/52-128.png" height="25" />
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

		<ProductInfoModal :showProductInfoModal=" showProductInfoModal " :product=" choosedProduct ">
		</ProductInfoModal>
		<ProductEditModal :showProductEditModal=" showProductEditModal " :product=" choosedProduct "
			@reloadProducts=" reloadProducts ">
		</ProductEditModal>
		<ProductAddModal :showProductAddModal=" showProductAddModal " @reloadProducts=" reloadProducts " @hideProductAddModal="showProductAddModal=false">
		</ProductAddModal>
	</div>
</template>

<script>
import ProductService from '@/services/product.service.js'
import ProductInfoModal from '@/components/ProductInfoModal.vue';
import ProductEditModal from '@/components/ProductEditModal.vue';
import ProductAddModal from '@/components/ProductAddModal.vue';

export default {
	name: "ProductManage",
	components: {
		ProductInfoModal,
		ProductEditModal,
		ProductAddModal,
	},
	data() {
		return {
			showProductEditModal: false,
			showProductInfoModal: false,
			showProductAddModal: false,
			products: [],
			choosedProduct: {},
		}
	},
	methods: {
		deleteProduct(id) {
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
					await ProductService.delete(id);
					this.products = await ProductService.getAll();

					Swal.fire(
						'Đã xóa',
						'Xóa sản phẩm thành công!',
						'success'
					)
				}
			})
		},
		async showProductEdit(id) {
			this.choosedProduct = await ProductService.getOne(id);
			this.showProductEditModal = true;
			this.showProductInfoModal = false;
		},
		async showProductInfo(id) {
			this.choosedProduct = await ProductService.getOne(id);
			this.showProductInfoModal = true;
			this.showProductEditModal = false;
		},
		async reloadProducts() {
			this.products = await ProductService.getAll();
		}
	},
	async created() {
		this.products = await ProductService.getAll();
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

.notification-list_img img {
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