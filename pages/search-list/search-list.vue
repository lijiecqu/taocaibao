<template>
	<view>
		<!-- 搜索 -->
		<view v-if="showHeader" class="header" :style="{ position: headerPosition,top:headerTop,opacity: afterHeaderOpacity }">
			<!-- 搜索框 -->
			<view class="input-box">
				<input confirm-type="search" @confirm="toSearch" @input="onKeyInput" placeholder="请输入关键字搜索" placeholder-style="color:#c0c0c0;"  />
				<view class="icon search" @tap="toSearch"></view>
			</view>
		</view>
		<!-- 占位 -->
		<view class="place"></view>
		<!-- 商品列表 -->
		<view class="goods-list">
			<view class="product-list">
				<view class="product" v-for="(goods) in goodsList" :key="goods.id" @tap="toGoods(goods)">
					<image mode="widthFix" :src="goods.img"></image>
					<view class="infobox">
						<view class="name">{{goods.title}}</view>
						<view class="info">
							<view class="price">{{goods.price}}</view>
							<view class="slogan">{{goods.cate.catename}}</view>
						</view>
					</view>
				</view>
			</view>
			<view class="loading-text">{{loadingText}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				goodsList:'',
				inputValue: '',
				showHeader:true,
				afterHeaderOpacity: 1,//不透明度
				headerPosition: 'fixed',
				headerTop:"80upx",
				statusTop:null,
				nVueTitle:null,
				loadingText:"..."
			}
		},
		onLoad() {
			
		},
		methods: {
			//跳转
			toGoods(e) {
				// uni.showToast({ title: '商品' + e.id, icon: 'none' });
				console.log(e);
				uni.navigateTo({
					url:'../goods/goods?cid='+e.id+'&name='+e.title
				});
			},
			onKeyInput:function(e){
				this.inputValue=e.target.value;
			},
			toSearch:function(){
				var self=this;
				//查询数据
				uni.request({
				    url: self.$url+'v1.searchjob/search', //仅为示例，并非真实接口地址。
				    data: {
				        inputVal:self.inputValue
				    },
				    success: (res) => {
				        self.goodsList=res.data;
				    }
				});
			}
		}
	}
</script>

<style lang="scss">
.header {
	width: 92%;
	padding: 0 4%;
	height: 100upx;
	display: flex;
	align-items: center;
	position: fixed;
	top: 0;
	z-index: 10;
	background-color: #fff;

	/*  #ifdef  APP-PLUS  */
	top: var(--status-bar-height);
	/*  #endif  */

	.input-box {
		width: 100%;
		height: 60upx;
		background-color: #f5f5f5;
		border-radius: 30upx;
		position: relative;
		display: flex;
		align-items: center;
		.icon {
			display: flex;
			align-items: center;
			position: absolute;
			top: 0;
			right: 0;
			width: 60upx;
			height: 60upx;
			font-size: 34upx;
			color: #c0c0c0;
		}
		input {
			padding-left: 28upx;
			height: 28upx;
			font-size: 28upx;
		}
	}
	.icon-btn {
		width: 120upx;
		height: 60upx;
		flex-shrink: 0;
		display: flex;
		.icon {
			width: 60upx;
			height: 60upx;
			display: flex;
			justify-content: flex-end;
			align-items: center;
			font-size: 42upx;
		}
	}
}

.goods-list {
	// background-color: #f4f4f4;
	.title {
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 80upx;
		color: #f47825;
		font-size: 30upx;
		margin-top: 10upx;
		image {
			width: 30upx;
			height: 30upx;
		}
	}
	.loading-text {
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 60upx;
		color: #979797;
		font-size: 24upx;
	}
	.product-list {
		padding: 0 4% 3vw 4%;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		.product {
			display: inline-flex;
			justify-content: space-between;
			width: 99.8%;
			border-radius: 10upx;
			background-color: #fff;
			margin: 0 0 15upx 0;
			box-shadow: 0upx 5upx 25upx rgba(0, 0, 0, 0.1);
			image {
				width: 30%;
				height: 150upx;
				margin: 10upx;
				border-radius: 10upx 10upx 10upx 10upx;
			}
			.infobox{
				width: 70%;
			}
			.name {
				width: 100%;
				padding: 10upx;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 2;
				text-align: justify;
				overflow: hidden;
				font-size: 24upx;
			}
			.info {
				justify-content: space-between;
				align-items: flex-end;
				width: 100%;
				padding: 10upx 4% 10upx 2%;

				.price {
					color: #e65339;
					font-size: 30upx;
					font-weight: 600;
				}
				.slogan {
					color: #807c87;
					font-size: 18upx;
				}
			}
		}
	}
}

.place {
	background-color: #ffffff;
	height: 100upx;
	/*  #ifdef  APP-PLUS  */
	margin-top: var(--status-bar-height);
	/*  #endif  */
}
</style>
