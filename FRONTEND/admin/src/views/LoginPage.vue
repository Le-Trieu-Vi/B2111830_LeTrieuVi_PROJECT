<template>
	<div class="unique-container">
		<div class="row d-flex align-items-center justify-content-center h-100">
			<div class="my-bg mt-5 mb-5 col-md-7 col-lg-5 col-xl-5 offset-xl-1 rounded">
				<h1 class="text-center fw-bold mt-5">Đăng nhập</h1>
				<Form
					@submit="submitUser"
					:validation-schema="userFormSchema"
					class="container py-5 h-100"
				>
					<!-- username begin -->
					<div class="d-flex flex-row align-items-center mb-4">
						<img src="https://cdn0.iconfinder.com/data/icons/seo-web-4-1/128/Vigor_User-Avatar-Profile-Photo-01-64.png" class="rounded-cỉrcle me-2" height="30" />
						<div class="form-outline flex-fill mb-0">
							<Field
								name="username"
								type="text"
								class="form-control"
								v-model="user.username"
								placeholder="Tên đăng nhập"
							/>
						</div>
					</div>
					<div class="d-flex flex-row align-items-center mb-4">
						<div class="form-outline flex-fill mb-0">
							<ErrorMessage name="username" class="error-feedback" />
						</div>
					</div>
					<!-- username end -->

					<!-- password begin -->
					<div class="d-flex flex-row align-items-center mb-4 position-relative">
						<img src="https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678115-lock-open-64.png" class="rounded-cỉrcle me-2" height="30" />
						<div class="form-outline flex-fill mb-0">
							<Field
								name="password"
								type="password"
								class="form-control"
								v-model="user.password"
								placeholder="Mật khẩu"
								id="password"
								/>
						</div>
						<img @click="toggleShowPassword" id="eye" src="https://cdn3.iconfinder.com/data/icons/mix-pack-6/44/Asset_25-64.png" class="rounded-cỉrcle me-2 position-absolute end-0" height="20" />
					</div>
					<div class="d-flex flex-row align-items-center mb-4">
						<div class="form-outline flex-fill mb-0">
							<ErrorMessage name="password" class="error-feedback" />
						</div>
					</div>
					<!-- password end -->

					<div class="d-flex justify-content-around align-items-center mt-3 mb-2">
						<button class="btn btn-danger" type="submit">Đăng nhập</button> 
						<!-- custom-btn-primary btn btn-primary btn-block -->
					</div>
				</Form>
			</div>
		</div>
	</div>
</template>

<script>
import { mapActions } from 'vuex';
import * as yup from 'yup';
import { Form, Field, ErrorMessage } from 'vee-validate';
import UserService from '@/services/user.service';

export default {
	name: 'LoginPage',
	components: {
		Form,
		Field,
		ErrorMessage,
	},
	data() {
		const userFormSchema = yup.object().shape({
			username: yup
				.string()
				.required('Không được để trống tên đăng nhập')
				.min(2, 'Tên đăng nhập phải ít nhất 2 ký tự.')
				.max(50, 'Tên đăng nhập có nhiều nhất 50 ký tự.'),
			password: yup
				.string()
				.required('Không được để trống mật khẩu.'),
		});
		return {
			user: {},
			userFormSchema,
		};
	},
	methods: {
		async submitUser() {
			try {
				await UserService.login(this.user);
				const user = await UserService.getOneAdmin();
				if (user.role === '1') {
					Toast.fire({
						icon: 'success',
						title: 'Đăng nhập thành công!'
					})
					this.$store.dispatch('user', user);
					setTimeout(() => {
						this.$router.push('/admin/dashboard');
					}, 1500);
				} else {
					Toast.fire({
						icon: 'error',
						title: 'Bạn không có đủ quyền truy cập!'
					})
				}
			} catch(error) {
				Toast.fire({
					icon: 'error',
					title: 'Sai tên đăng nhập hoặc mật khẩu!'
				})
			}
		},
		toggleShowPassword() {
			let x = document.getElementById("password");
			let y = document.getElementById("eye");
			if (x.type === "password") {
				x.type = "text";
				y.src = "https://cdn0.iconfinder.com/data/icons/font-awesome-solid-vol-2/576/eye-64.png";
			} else {
				x.type = "password";
				y.src = "https://cdn3.iconfinder.com/data/icons/mix-pack-6/44/Asset_25-64.png";
			}
		}
	},
};
</script>

<style scoped>
	.unique-container {
		width: 90%;
		margin-bottom: 30px;
	}
	.my-bg {
		background-color: #99EDED;
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

</style>