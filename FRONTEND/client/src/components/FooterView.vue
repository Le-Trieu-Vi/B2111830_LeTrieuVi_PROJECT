
<template>
	<footer class="my-footer text-center">
		<!-- Grid container -->
		<div class="container p-4 pb-0">
			<!-- Section: Social media begin -->
			<!-- <section class="mb-4">
				
			</section> -->
			<!-- Section: Social media end -->

			<!-- Section: Links begin -->
			<section class="">
				<div class="container text-center text-md-start mt-5">
					<!-- Grid row -->
					<div class="row mt-3">
						<div class="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
							<h6 class="text-uppercase fw-bold mb-4">
								<img src="https://cdn2.iconfinder.com/data/icons/flat-pack-1/64/Diamond-64.png" class="rounded-cỉrcle me-2" height="30" />
								FreshDrink
							</h6>
							<p>
								Giải nhiệt ngày nóng
							</p>
						</div>

						<div class="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
							<div class="ms-2 mb-3 fw-bold d-none d-lg-block">
					<span>Lên hệ với chúng tôi qua</span>
				</div>
				<SocialMediaIcon />
						</div>

						<div class="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
							<h6 class="text-uppercase fw-bold mb-4">
								Sản phẩm
							</h6>
							<p>
								<a href="#!" class="text-decoration-none text-reset">
									Cà phê
								</a>
							</p>
							<p>
								<a href="#!" class="text-decoration-none  text-reset">
									Nước trái cây
								</a>
							</p>
							<p>
								<a href="#!" class="text-decoration-none text-reset">
									Trà giải nhiệt
								</a>
							</p>
						</div>
						<!-- <div class="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
							<h6 class="text-uppercase fw-bold mb-4">Liên hệ</h6>
							<p>
								<img src="https://cdn2.iconfinder.com/data/icons/valentine-day-16/512/683_home_love_heart_wedding_valentine_valentines_day_love-64.png" class="rounded-cỉrcle me-2" height="30" />
								Đường Mậu Thân, Xuân Khánh, Ninh Kiều, Cần Thơ, Việt Nam
							</p>
							<p>
								<img src="https://cdn1.iconfinder.com/data/icons/aami-flat-emails/64/email-41-64.png" class="rounded-cỉrcle me-2" height="30" />
								vib2111830@student.ctu.edu.vn
							</p>
							<p>
								<img src="https://cdn2.iconfinder.com/data/icons/buno-ui-interface/32/__phone_call-64.png" class="rounded-cỉrcle me-2" height="30" />
								+84848790791
							</p>
						</div> -->
					</div>
					<!-- Grid row -->
				</div>
			</section>
			<!-- Section: Links end -->
		</div>
		<!-- Grid container end -->

		<!-- Copyright begin-->
		<div class="text-center p-3" style="background-color: rgba(0, 0, 0, 0.1);">
			&copy; Bản quyền thuộc về FreshDrink
		</div>
		<!-- Copyright end -->
	</footer>
</template>

<script>
import SocialMediaIcon from '@/components/SocialMediaIcon.vue';
export default {
    name: 'Footer',
	components: {
		SocialMediaIcon,
	}
}
</script>

<style scoped>
	.my-footer {
		background: var(--bg-color);
		color: black;
		padding: 0.15rem;

	}

</style>

