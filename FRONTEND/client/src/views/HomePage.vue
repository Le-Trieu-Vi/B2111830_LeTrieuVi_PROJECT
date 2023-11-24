<template>
	<div id="page-wrap">
		<h1 class="m-b-50 mt-2 mb-3 text-center">
			Trang chủ
		</h1>
		<div id="carouselExampleAutoplaying" class="carousel slide" data-bs-ride="carousel">
			<div class="carousel-inner rounded-3">
				<div class="carousel-item active position-relative" data-interval="100">
					<img src="@/assets/banner1.jpg" class="d-block w-100" alt="...">
					<div class="d-none d-md-block banner1-text">
						Chào mừng bạn đến với<br>FrishDrink
					</div>
				</div>
				<div class="carousel-item" data-interval="100">
					<img src="@/assets/banner2.jpg" class="d-block w-100" alt="...">
				</div>
				<div class="carousel-item" data-interval="100">
					<img src="@/assets/banner3.jpg" class="d-block w-100" alt="...">
				</div>
				<div class="carousel-item position-relative" data-interval="100">
					<img src="@/assets/last.png" class="d-block w-100" alt="...">
					<div class="d-none d-md-block position-absolute top-50 start-50 translate-middle last-text">
						Sự hài lòng của bạn<br>Là niềm hạnh phúc của chúng tôi
					</div>
				</div>
				<button class="carousel-control-prev mt-4" type="button" data-bs-target="#carouselExampleAutoplaying"
					data-bs-slide="prev">
					<span class="carousel-control-prev-icon" aria-hidden="true"></span>
				</button>
				<button class="carousel-control-next mt-4" type="button" data-bs-target="#carouselExampleAutoplaying"
					data-bs-slide="next">
					<span class="carousel-control-next-icon" aria-hidden="true"></span>
				</button>
			</div>
		</div>
		<hr>
		<div>
			<h2 class="text-center">Về chúng tôi</h2>
			<div class="text-custom">
				<p class="text-center text-item w-50 p-2">Chào mừng bạn đến với FreshDrink, điểm đến lý tưởng của bạn để thưởng thức đồ
					uống sảng khoái và phục hồi sức lực. Sứ mệnh của chúng tôi là cung cấp đồ uống thơm ngon, chất lượng cao
					giúp bạn luôn đủ nước và tràn đầy năng lượng suốt cả ngày.</p>
				<p class="text-center text-item w-50 p-2">Tại FreshDrink, chúng tôi tự hào về việc tìm nguồn cung ứng những nguyên liệu tự
					nhiên tốt nhất để tạo ra nhiều loại đồ uống đáp ứng khẩu vị và sở thích đa dạng.</p>
			</div>
			<router-link to="/products">
				<button class="button float-end" style="vertical-align:middle"><span>Xem chi tiết</span></button>
			</router-link> 
			
		</div>
	</div>
</template>

<script>
export default {
	name: 'HomePage',
	props: ['products'],
	data() {
		return {
		};
	},
};
</script>
<style scoped>
#page-wrap {
	width: 900px;
	margin: auto;
	padding-bottom: 80px;
}

img {
	width: 100%;
	height: auto;
	padding-bottom: 50px;
}

.banner1-text {
	position: absolute;
	top: 0;
	right: 0;
	font-size: 32px;
	padding: 30px;
}

.last-text {
	font-size: 32px;
}

.text-item {
	margin: 0 auto;
}

/* button */
.button {
  display: inline-block;
  border-radius: 4px;
  background-color: #f4511e;
  border: none;
  color: #FFFFFF;
  text-align: center;
  font-size: 16px;
  padding: 12px;
  width: 150px;
  transition: all 0.5s;
  cursor: pointer;
  margin: 5px;
}

.button span {
  cursor: pointer;
  display: inline-block;
  position: relative;
  transition: 0.5s;
}

.button span:after {
  content: '\00bb';
  position: absolute;
  opacity: 0;
  top: 0;
  right: -20px;
  transition: 0.5s;
}

.button:hover span {
  padding-right: 25px;
}

.button:hover span:after {
  opacity: 1;
  right: 0;
}

</style>