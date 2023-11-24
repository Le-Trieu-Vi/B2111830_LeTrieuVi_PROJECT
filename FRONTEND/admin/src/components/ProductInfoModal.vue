<template>
	<!-- Modal Begin -->
	<div v-if="showProductInfoModal"
		:height = "auto"
		:scrollable = "true"
		:adaptive="true"
	>
		<transition name="modal">
		<div class="modal-mask modal">
			<div class="modal-wrapper" tabindex="-1" role="dialog" data-replace="true">
			<div class="modal-dialog " role="document">

				<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="exampleModalLongTitle">Thông tin sản phẩm</h5>
					<button type="button" @click="showProductInfoModal = false" class="close rounded-3" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div class="modal-body">


					<div id="img-wrap">
					<!-- <img :src="`@/assets/${product.imageUrl}`" /> -->
					<img v-bind:src="product.imageUrl" />
				</div>
				<div id="product-details">
					<h1 class="product-name">{{ product.name }}</h1>
					<h3 id="price"> {{ product.price }}VND </h3>
					<p>Đánh giá: {{ product.averageRating }}</p>
					<div class="my-star">
						<div v-for="index in parseInt(product.averageRating)" :key="index" class="me-2">
							<img src="https://cdn3.iconfinder.com/data/icons/cosmo-color-basic-2/40/star-64.png" style="width: 20px;" height="20" />
						</div>
						<div v-if="parseInt(product.averageRating) < product.averageRating" class="me-2">
							<img src="https://cdn0.iconfinder.com/data/icons/stars-rounded/250/Gold_Half_Star_5-64.png" style="width: 20px;" height="20" />
						</div>
					</div>

					<h4>Mô tả</h4>
					<p>{{ product.description }}</p>
				</div>

				</div>
				<div class="modal-footer">
					<button type="button" @click="showProductInfoModal = false" class="close-btn btn btn-secondary custom-btn-primary" data-dismiss="modal">Đóng</button>
				</div>
				</div>
			</div>
			</div>
		</div>
		</transition>

	</div>
	<!-- Modal End -->
</template>

<script>

export default {
    name: 'ProductInfoModal',
	props: ['showProductInfoModal', 'product'],
	components: {
	},
	data() {
		return {
		}
	},
	computed: {

    },
	methods: {
	}
}
</script>

<style scoped>
	.modal-mask {
		position: fixed;
		z-index: 9998;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, .5);
		display: table;
		transition: opacity .3s ease;
	}

	.modal-wrapper {
		display: table-cell;
		vertical-align: middle;
	}

	.modal-dialog {
		max-width: 60%;
	}

	.modal-footer {
		border: none;
		justify-content: center;
	}

	.modal-body {
		margin-top: 12px;
	}

	#img-wrap {
        text-align: center;
    }

    img {
        width: 250px;
    }

    #product-details {
        padding: 16px;
        position: relative;
    }

    #add-to-cart {
        width: 100%;
    }

    #price {
        position: absolute;
        top: 24px;
        right: 16px;
    }
    .grey-button {
        background-color: #888;
    }

	.my-star {
		display: flex;
		justify-content: flex-start;
		margin-bottom: 10px;
	}
</style>

