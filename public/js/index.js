setTimeout(function(){
	$.ajax({
		url:'/list.action',
		method:'get',
		//返回数组
		success:function(data){
			var str = "";
			data.map(function (ele) {
				str += '<li>' + ele + '</li>';
			});
			$("#list-item").html(str);
		},
		error:function(error){
			console.log(error)
		}
	});
	$.ajax({
		url:'/user.action',
		method:'get',
		//返回数组
		success:function(data) {
			var str = '';
			for (var key in data) {
				str += '<li><span>' + key + ':</span><span>' + data[key] + '</span></li>';
			}
			$("#user-content").html(str);
		},
		error:function(error){
			console.log(error)
		}
	});
},1000)