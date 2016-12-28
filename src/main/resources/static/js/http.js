function http_get(url,data){
	var R;
	$.ajax({
		url:url,
		type:'GET',
		dataType:'json',
		async:false,
		data:data,
		success:function(rs){
			R = rs;
		}
	});
	return R;
}

function http_post(url,data,token,header){
	var R;
	$.ajax({
		url:url,
		type:'POST',
		dataType:'json',
		async:false,
		data:data,
		beforeSend: function(xhr){
			xhr.setRequestHeader(header, token);
		},
		success:function(rs){
			R = rs;
		}
	});
	return R;

}

