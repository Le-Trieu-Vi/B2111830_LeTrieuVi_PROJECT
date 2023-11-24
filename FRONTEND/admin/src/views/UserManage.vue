<template>
		<div class="container py-4">
			<section class="mb-4">
				<div class="card">
					<div class="card-header text-center py-3">
						<h1 class="m-b-50 mt-2 mb-3 text-center">
							Tài khoản khách hàng
							<p class="d-flex justify-content-end align-items-center h6">
								<img src="https://cdn1.iconfinder.com/data/icons/maths/300/41134850Untitled-3-64.png"
									class="rounded-cỉrcle me-2" height="30" />
								Tổng số: {{ clientUsers.length }}
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
											Mã tài khoản
										</th>
										<th scope="col">
											Ảnh đại diện
										</th>
										<th scope="col">
											Tên khách hàng
										</th>
										<th scope="col">
											Tên đăng nhập
										</th>
										<th scope="col">
											Email
										</th>
										<th scope="col">
											Giới tính
										</th>
										<th scope="col">
											Thao tác
										</th>
									</tr>
								</thead>
								<tbody>
									<tr v-for="(user, index) in clientUsers" :key="user._id">
										<td>{{ index + 1 }}</td>
										<td>{{ user._id }}</td>
										<td>
											<div class="notification-list_img">
												<img :src="user.image" class="img-fluid shadow-1-strong rounded-5" alt="" />
											</div>
										</td>
										<td>{{ user.name }}</td>
										<td>{{ user.username }}</td>
										<td>{{ user.email }}</td>
										<td>{{ (user.gender === 'female') ? 'Nữ' : 'Nam' }}</td>
										<td>
											<div>
												<!-- more info -->
												<a class="btn-floating rounded-circle me-1" role="button"
													@click="showUserInfo(user._id)" title="Xem chi tiết">
													<img src="https://cdn3.iconfinder.com/data/icons/actions-1/30/action_025-info-detail-information-more-64.png" height="25" />
												</a>
												<!-- delete -->
												<a class="btn-floating rounded-circle" role="button"
													@click="deleteUser(user._id)" title="Xóa tài khoản">
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

		<UserInfoModal :showUserInfoModal="showUserInfoModal" :user="choosedUser">
		</UserInfoModal>
</template>

<script>
import UserService from '@/services/user.service.js';
import UserInfoModal from '@/components/UserInfoModal.vue';

export default {
	name: "UserManage",
	components: {
		UserInfoModal,
	},
	data() {
		return {
			showUserInfoModal: false,
			users: [],
			adminUsers: [],
			clientUsers: [],
			cartItems: [],
			choosedUser: {},
		}
	},
	methods: {
		deleteUser(id) {
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

					await UserService.delete(id);
					this.users = await UserService.getAll();
					let adminUsers = [];
					let clientUsers = [];
					for (let index in this.users) {
						const user = this.users[index];
						if (user.role === '1') {
							adminUsers.push(user);
						} else {
							clientUsers.push(user);
						}
					}
					this.adminUsers = adminUsers;
					this.clientUsers = clientUsers;

					Swal.fire(
						'Đã xóa',
						'Xóa người dùng thành công!',
						'success'
					)
				}
			})
		},
		async showUserInfo(id) {
			this.showUserInfoModal = true;
			this.choosedUser = await UserService.findById(id);
		},
	},
	async created() {
		this.users = await UserService.getAll();
		let adminUsers = [];
		let clientUsers = [];
		for (let index in this.users) {
			const user = this.users[index];
			if (user.role === '1') {
				adminUsers.push(user);
			} else {
				clientUsers.push(user);
			}
		}
		this.adminUsers = adminUsers;
		this.clientUsers = clientUsers;
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