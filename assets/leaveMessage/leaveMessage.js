window.onload = function(){
	new Vue({
		el: ".container",
		data: {
			username:'',
			age:'',
			nowIndex: -100,
			myData: []
		},
		methods: {
			add: function(){
				this.myData.push({
					name: this.username,
					age: this.age
				});
			this.username = '';
			this.age = '';
			},
			deleteMsg: function(n){
				if(n==-1){
					this.myData = [];
				}
				else{
					this.myData.splice(n,1);
				}
			}
		}
	})
}