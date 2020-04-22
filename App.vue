<script>
	//定义全局使用的判断是否登录的函数
	global.islogin=function(){
		try{
			var token=uni.getStorageSync('token');
		}catch(e){
			//TODO handle the exception
		}
		if(token==''||token==null||token=='undefined'){
			return false;
		}else{
			return token;
		}
	};
	export default {
		onLaunch: function () {
			console.log('App Launch')
		},
		onShow: function () {
			console.log('App Show')
		},
		onHide: function () {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import "/static/iconfont/font.scss";
</style>
