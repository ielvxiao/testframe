function Checkall(id,name,table_wrap){
	this.control_id = id;
	this.checkbox_name = name;
	this.table_wrap = table_wrap

	this.init();
}

Checkall.prototype.init = function(){
	var _this = this;
	$('#'+_this.control_id).click(function(){
		if($(this).is(':checked')){
    		_this.selectAll();
    	}else{
    		_this.cancleSelectAll();
    	}
	});

	$('input[name="'+_this.checkbox_name+'"]').each(function(){
    	
    	$(this).click(function(e){
    		e.stopPropagation();
    		console.log(' dao chagne');
			if(!_this.checkSelectAll()){
    			$('#'+_this.control_id).prop('checked',false);
    		}else{
    			$('#'+_this.control_id).prop('checked',true);
    		}

    		var _checkbox = $(this);
    		setTimeout(function(){
				if(_checkbox.is(':checked')){
					_checkbox.parents('tr').addClass('success');
				}else{
					_checkbox.parents('tr').removeClass('success');
				}
			},0);
    		
    	});

    });


	$('#'+_this.table_wrap+' tbody tr a').click(function(e){
		e.stopPropagation();
	});


    $('#'+_this.table_wrap+' tbody tr').each(function(){
		var _this = $(this);
		var _checkbox = _this.find('input[name="checkbox"]');
		$(this).click(function(e){
			
			_checkbox.trigger('click');
			setTimeout(function(){
				if(_checkbox.is(':checked')){
					_this.addClass('success');
				}else{
					_this.removeClass('success');
				}
			},0);
		});
	});

}

Checkall.prototype.checkSelectAll = function(){
	var _this = this;

	var _selectAll = true;

	$('input[name="'+_this.checkbox_name+'"]').each(function(){
    	var _item = $(this);
        if(!_item.is(':checked')){
            _selectAll = false;
        }
    });
    return _selectAll;
}

Checkall.prototype.selectAll = function(){
	var _this = this;
	$('input[name="'+_this.checkbox_name+'"]').each(function(){
    	var _item = $(this);
        _item.prop('checked',true);
        $('#'+_this.table_wrap+' tbody tr').addClass('success');
    });
}

Checkall.prototype.cancleSelectAll = function(){
	var _this = this;
	$('input[name="'+_this.checkbox_name+'"]').each(function(){
    	var _item = $(this);
        _item.prop('checked',false);
        $('#'+_this.table_wrap+' tbody tr').removeClass('success');
    });
}