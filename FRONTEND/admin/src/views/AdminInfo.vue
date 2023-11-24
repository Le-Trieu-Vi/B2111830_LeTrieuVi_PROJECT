<template>
	<div class="container">
		<h2 class="py-3 text-center">Thông tin cá nhân</h2>
		<div class="row d-flex justify-content-center align-items-center">
			<div class="col mb-4 mb-lg-0">
				<div class="card mb-3" style="border-radius: .5rem;">
					<div class="row g-0">
						<div class="col-md-4 gradient-custom text-center text-white"
							style="border-top-left-radius: .5rem; border-bottom-left-radius: .5rem;">
							<img v-if="!user._id" src="https://cdn4.iconfinder.com/data/icons/glyphs/24/icons_user-256.png"
								class="img-fluid w-50 mt-4" />
							<img v-else :src="user.image" class="img-fluid w-75 mt-4 ms-2 me-2" />
							<p class="text-dark text-center p-3">Admin</p>
						</div>
						<div class="col-md-8">
							<div class="card-body p-4">
								<h6>Quản lý thông tin hồ sơ để bảo mật tài khoản</h6>
								<hr class="mt-0 mb-4">
								<div class="row pt-1">
									<div class="col-6 mb-3">
										<img src="https://cdn0.iconfinder.com/data/icons/seo-web-4-1/128/Vigor_User-Avatar-Profile-Photo-01-64.png"
											class="rounded-cỉrcle mb-2" height="30" />
										<h6>Tên đăng nhập</h6>
										<p class="text-muted">{{ user.username }}</p>
									</div>
									<div class="col-6 mb-3">
										<img src="https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678115-lock-open-64.png"
											class="rounded-cỉrcle mb-2" height="30" />
										<h6>Mật khẩu</h6>
										<p class="text-muted" style="font-size: 50px; margin-top: -40px;">{{ hiddenPassword
										}}</p>
									</div>
								</div>

								<hr class="mt-0 mb-4">
								<div class="row pt-1">
									<div class="col-6 mb-3">
										<img v-if="user.gender === 'female'"
											src="https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/female_woman_avatar_portrait_1-64.png"
											class="rounded-cỉrcle mb-2" height="30" />
										<img v-else
											src="https://cdn1.iconfinder.com/data/icons/user-pictures/101/malecostume-64.png"
											class="rounded-cỉrcle mb-2" height="30" />
										<h6>Giới tính</h6>
										<p v-if="user._id" class="text-muted">{{ (user.gender === 'female') ? 'Nữ' : 'Nam'
										}}</p>
									</div>
									<div class="col-6 mb-3">
										<img src="https://cdn1.iconfinder.com/data/icons/contact-us-flat-1/58/008_-_Email-64.png"
											class="rounded-cỉrcle mb-2" height="30" />
										<h6>Email</h6>
										<p class="text-muted">{{ user.email }}</p>
									</div>
								</div>

								<hr class="mt-0 mb-4">
								<div class="row">
									<div class="col-6 mb-3">
										<img src="https://cdn1.iconfinder.com/data/icons/christmas-2251/64/cake-birthday-candle-party-dessert-64.png"
											class="rounded-cỉrcle mb-2" height="35" />
										<h6>Ngày sinh</h6>
										<p class="text-muted">{{ user.birthDate }}</p>
									</div>
									<div class="col-6 mb-3">
										<img src="https://cdn0.iconfinder.com/data/icons/expenses-vs-income/30/__donation_social_care_calendar_heart-64.png"
											class="rounded-cỉrcle mb-2" height="35" />
										<h6>Ngày đăng kí</h6>
										<p class="text-muted">{{ user.registerDate }}</p>
									</div>
								</div>

								<hr class="mt-0 mb-4">
								<div class="row">
									<div class="col-6 mb-3">
										<img src="https://cdn3.iconfinder.com/data/icons/illustricon-tech/512/map.position.address-64.png"
											class="rounded-cỉrcle mb-2" height="30" />
										<h6>Địa chỉ</h6>
										<p class="text-muted">{{ user.address }}</p>
									</div>
									<div class="col-6 mb-3">
										<img src="https://cdn1.iconfinder.com/data/icons/contact-us-flat-1/58/033_-_Telephone-64.png"
											class="rounded-cỉrcle mb-2" height="30" />
										<h6>Số điện thoại</h6>
										<p class="text-muted">{{ user.phone }}</p>
									</div>
								</div>

								<router-link to="/admin/info/update" class="mt-5 mb-4">
									<button type="button" class="btn btn-outline-warning">
										Cập nhật lại thông tin tài khoản
									</button>
								</router-link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
	name: 'AdminInfo',
	data() {
		return {
			hiddenPassword: "",
		}
	},
	computed: {
		...mapGetters(['user'])
	},
	components: {
	},
	async created() {
		let hiddenPassword = "";
		for (let i = 0; i < this.user.passwordLength; i++) {
			hiddenPassword += ".";
		}
		this.hiddenPassword = hiddenPassword;
	}
}
</script>

<style>
.container {
	padding-bottom: 70px;
}
</style>