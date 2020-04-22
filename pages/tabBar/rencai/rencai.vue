<template>
	<view>
		<!-- 状态栏 -->
		<view v-if="showHeader" class="status" :style="{ position: headerPosition,top:statusTop,opacity: afterHeaderOpacity}"></view>
		<!-- 顶部导航栏 -->
		<view v-if="showHeader" class="header" :style="{ position: headerPosition,top:headerTop,opacity: afterHeaderOpacity }">
			<!-- 搜索框 -->
			<view class="input-box">
				<input confirm-type="search" @confirm="toSearch" @input="onKeyInput" placeholder="请输入关键字搜索" placeholder-style="color:#c0c0c0;" />
				<view class="icon search"></view>
			</view>
		</view>
		
		<view class="rencai-list">
			<view class="rencai" v-for="rencai in rencaiList" :key="rencai.id">
				<!-- <image mode="" :src="rencai.img"></image> -->
				<navigator :url="'../../rencaiinfo/rencaiinfo?id='+rencai.id+'&name='+rencai.title" class="infobox">
					<view class="name">{{rencai.title}}</view>
					<!-- 				<view class="info">
					<view class="price">{{ rencai.price }}</view>
					<view class="slogan">{{ rencai.cate.catename}}</view>
				</view> -->
				</navigator>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				rencaiList: '',
				inputValue: '',
				showHeader:true,
				afterHeaderOpacity: 1,//不透明度
				headerPosition: 'fixed',
				headerTop:"100upx",
				statusTop:null,
				nVueTitle:null,
			}
		},
		onLoad() {
			//加载人才
			var self = this;
			uni.request({
				url: self.$url + 'v1.Taorencai/check_rencai',
				success: function(res) {
					self.rencaiList = res.data;
					// console.log(self.categoryList);
				}
			});
		},

		methods: {
			onKeyInput: function(e) {
				this.inputValue = e.target.value;
			},
			toSearch: function() {
				var self = this;
				//查询数据
				uni.request({
					url: self.$url + 'v1.searchrencai/search', //仅为示例，并非真实接口地址。
					data: {
						inputVal: self.inputValue
					},
					success: (res) => {
						self.rencaiList = res.data;
					}
				});
			}
		},

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

		.addr {
			width: 120upx;
			height: 60upx;
			flex-shrink: 0;
			display: flex;
			align-items: center;
			font-size: 28upx;

			.icon {
				height: 60upx;
				margin-right: 5upx;
				display: flex;
				align-items: center;
				font-size: 42upx;
				color: #ffc50a;
			}
		}

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




	.rencai-list {

		display: flex;
		justify-content: center;
		flex-wrap: wrap;
		margin-top: 110upx;

		.infobox {
			color: #FFFFFF;
			background-color: #f06c7a;
			padding: 10upx;
			margin: 10upx;
			border-radius: 8upx;
		}
	}
</style>
