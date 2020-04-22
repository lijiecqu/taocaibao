<template>
	<view class="form-box">
		<form @submit="formSubmit" @reset="formReset">
			<view class="title">姓名</view>
			<input class="uni-input" name="name" focus placeholder="请输入姓名" />
			<view class="title">身份证号</view>
			<input class="uni-input" name="idnum"  placeholder="请输入身份证号码" />
			<view class="title">手机号码</view>
			<input class="uni-input" name="phone"  placeholder="请输入手机号码" />
			<view class="title">工作经历</view>
			<view class="uni-textarea">
				<textarea name="experience" placeholder-style="color:#F76260" placeholder="请输入真实的工作经历" />
				</view>
			<button type="primary" form-type="submit">提交</button>
		 </form>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				jobid:'',
			}
		},
		onLoad(option) {
			// 获得传过来得商品ID 李杰
			this.jobid=option.id;
		},
		methods: {
			formSubmit: function(e) {
			    // console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value))
				var self=this;
			    var formdata = e.detail.value;
				formdata.jobid=self.jobid;
				uni.request({
					url:self.$url+'v1.signup/save',
					data:formdata,
					method:'POST',
					success:function(res){
						if(res.data.code==1){
							uni.showModal({
							    title:res.data.msg,
							    // content: '这是一个模态弹窗',
							    success: function (res) {
							        if (res.confirm) {
							           uni.navigateBack({data:2});
							        }
							    }
							});
							
						}else{
							uni.showToast({
								title:res.data.msg,icon:'none'
							})
						}
					}
				})
			   },
			   formReset: function(e) {
			       console.log('清空数据')
			   }
		}
	}
</script>

<style lang="scss">
	.form-box{
		margin: 10upx 15upx 10upx 15upx;
		input,textarea{
			width: 100%;
			background-color: #c9c7c7;
			border-color:blue;
			border-radius: 5upx;
		}
		button{
			margin-top: 30upx;
		}
	}
</style>
