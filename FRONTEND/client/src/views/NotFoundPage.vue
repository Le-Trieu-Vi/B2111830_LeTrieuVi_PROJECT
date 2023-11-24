<template>
	<div class="page-wrap">
		<router-link class="parent" to="/home">
			<h5 class="child">Quay trở lại trang chủ!</h5>
			<img src="https://sitechecker.pro/wp-content/uploads/2023/06/404-status-code.png" class="w-100" alt="">
        </router-link>
	</div>
</template>

<script>
export default {
    name: 'NotFoundPage',
};
</script>

<style scoped>
    h5 {
        text-align: center;
		color: #000;
		text-decoration: none;
    }
	.parent {
		position: relative;
	}

	.child {
		position: absolute;
		left: 40%;
    	margin-top: 20px;
	}

	img {
		margin-top: -30px;
	}
</style>