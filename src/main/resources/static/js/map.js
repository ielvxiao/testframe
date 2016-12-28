function showPop(longitude,latitude,data){
    
        var rs = rsLongLati(longitude,latitude);
        var _x = Math.floor(svg_width*rs.lon);
        var _y = Math.floor(svg_height*rs.lat);
        var type_length=data.type.length;
        //由于动态获取单位类型，所以要先修改显示框大小。
        $('#pop_wrap_bg').attr('points','418.5,'+(121.102+20*type_length)+' 120.641,'+(121.102+20*type_length)+' 120.641,98.123 0,136.532 120.641,85.181 120.641,0 418.5,0 ');
        //$('#pop_wrap_txt').append('<tspan x="0" y="0" fill="#F8F8F8" font-family="FZLTXHK--GBK1-0" font-size="10.8747">XX66区状况整体状况</tspan><tspan x="0" y="20.541" fill="#F8F8F8" font-family="FZLTXHK--GBK1-0" font-size="10.8747">保密重点单位：2/个</tspan><tspan x="0" y="41.082" fill="#F8F8F8" font-family="FZLTXHK--GBK1-0" font-size="10.8747">保密一般单位：5/个</tspan><tspan x="0" y="61.623" fill="#F8F8F8" font-family="FZLTXHK--GBK1-0" font-size="10.8747">军事工程单位：0/个</tspan><tspan x="0" y="82.165" fill="#F8F8F8" font-family="FZLTXHK--GBK1-0" font-size="10.8747">企业单位单位：15/个</tspan><tspan x="0" y="102.706" fill="#F8F8F8" font-family="FZLTXHK--GBK1-0" font-size="10.8747">客户端在线:23123台</tspan><tspan x="0" y="123.247" fill="#F8F8F8" font-family="FZLTXHK--GBK1-0" font-size="10.8747">客户端不在线：123台</tspan><tspan x="0" y="143.788" fill="#F8F8F8" font-family="FZLTXHK--GBK1-0" font-size="10.8747">预警未处理：69999个</tspan><tspan x="0" y="164.329" fill="#F8F8F8" font-family="FZLTXHK--GBK1-0" font-size="10.8747">待审核：3999个</tspan><tspan x="0" y="184.87" fill="#F8F8F8" font-family="FZLTXHK--GBK1-0" font-size="10.8747">涉密信息数：3000个</tspan>');
        var c = document.createElementNS('http://www.w3.org/2000/svg','tspan');
        c.setAttribute('x',0);
        c.setAttribute('y',0);
        c.setAttribute('fill','#F8F6F8');
        
        var txt = document.createTextNode(data.name+'整体状况');
        c.appendChild(txt);
        //各个单位类型下的涉密文件数和单位数
        
        $('#pop_wrap_txt').children().remove();
        document.getElementById('pop_wrap_txt').appendChild(c);
        $.each(data.type,function(i,n){
              var t=[];
              t[i]=document.createElementNS('http://www.w3.org/2000/svg','tspan');
              t[i].setAttribute('x',0);
              t[i].setAttribute('y',20+20*i);
              t[i].setAttribute('fill','#F8F6F8');
              t[i].appendChild(document.createTextNode(n.name+'：'+n.filenum+'个疑似涉密 / '+n.unitnum+'个单位'));
              document.getElementById('pop_wrap_txt').appendChild( t[i]);
        });
        
        //总统计
        var c6 = document.createElementNS('http://www.w3.org/2000/svg','tspan');
        c6.setAttribute('x',0);
        c6.setAttribute('y',20+20*type_length);
        c6.setAttribute('fill','#F8F6F8');
        
        var txt6 = document.createTextNode('预警未处理总数：'+data.wclzs+'个');
        c6.appendChild(txt6);
        var c8 = document.createElementNS('http://www.w3.org/2000/svg','tspan');
        c8.setAttribute('x',0);
        c8.setAttribute('y',40+20*type_length);
        c8.setAttribute('fill','#F8F6F8');
        
        var txt8 = document.createTextNode('预警已处理总数：'+data.yclzs+'个');
        c8.appendChild(txt8);
 
        var c9 = document.createElementNS('http://www.w3.org/2000/svg','tspan');
        c9.setAttribute('x',0);
        c9.setAttribute('y',60+20*type_length);
        c9.setAttribute('fill','#F8F6F8');
        
        var txt9 = document.createTextNode('客户端在线总数：'+data.khdzx+'台');
        c9.appendChild(txt9);
 
        var c10 = document.createElementNS('http://www.w3.org/2000/svg','tspan');
        c10.setAttribute('x',0);
        c10.setAttribute('y',80+20*type_length);
        c10.setAttribute('fill','#F8F6F8');
        
        var txt10 = document.createTextNode('客户端不在线总数：'+data.khdbzx+'台');
        c10.appendChild(txt10);
 
        document.getElementById('pop_wrap_txt').appendChild(c6);
        document.getElementById('pop_wrap_txt').appendChild(c8);
        document.getElementById('pop_wrap_txt').appendChild(c9);
        document.getElementById('pop_wrap_txt').appendChild(c10);
    
        $('#pop_wrap').attr('transform','translate('+(_x)+','+(_y-137)+')').stop(true,false).show();
    }
  //单位详情
    function showScalePop(longitude,latitude,data){
        var _svg = document.getElementById('main_svg').getBBox();
        var rs = rsLongLati(longitude,latitude);
        var _x = Math.floor(_svg.width*rs.lon)+Math.floor(_svg.x);
        var _y = Math.floor(_svg.height*rs.lat)+Math.floor(_svg.y);
        var c = document.createElementNS('http://www.w3.org/2000/svg','tspan');
        c.setAttribute('x',0);
        c.setAttribute('y',0);
        c.setAttribute('fill','#F8F6F8');
        var txt = document.createTextNode('单位名称：'+data.name);
        c.appendChild(txt);
          
        var c2 = document.createElementNS('http://www.w3.org/2000/svg','tspan');
        c2.setAttribute('x',0);
        c2.setAttribute('y',20);
        c2.setAttribute('fill','#F8F6F8');
        
        var txt2 = document.createTextNode('单位类别：'+data.type_name);
        c2.appendChild(txt2);
 
        var c3 = document.createElementNS('http://www.w3.org/2000/svg','tspan');
        c3.setAttribute('x',0);
        c3.setAttribute('y',40);
        c3.setAttribute('fill','#F8F6F8');
        
        var txt3 = document.createTextNode('客户端在线：'+data.online);
        c3.appendChild(txt3);
 
        var c4 = document.createElementNS('http://www.w3.org/2000/svg','tspan');
        c4.setAttribute('x',0);
        c4.setAttribute('y',60);
        c4.setAttribute('fill','#F8F6F8');
        
        var txt4 = document.createTextNode('客户端不在线：'+data.offline);
        c4.appendChild(txt4);
 
 
 
        var c5 = document.createElementNS('http://www.w3.org/2000/svg','tspan');
        c5.setAttribute('x',0);
        c5.setAttribute('y',80);
        c5.setAttribute('fill','#F8F6F8');
        
        var txt5 = document.createTextNode('未处理：'+data.wclzs);
        c5.appendChild(txt5);
        var c7 = document.createElementNS('http://www.w3.org/2000/svg','tspan');
        c7.setAttribute('x',0);
        c7.setAttribute('y',100);
        c7.setAttribute('fill','#F8F6F8');
        
        var txt7 = document.createTextNode('已处理：'+data.yclzs);
        c7.appendChild(txt7);
 
 
        $('#pop_wrap_txt2').children().remove();
        document.getElementById('pop_wrap_txt2').appendChild(c);
        document.getElementById('pop_wrap_txt2').appendChild(c2);
        document.getElementById('pop_wrap_txt2').appendChild(c3);
        document.getElementById('pop_wrap_txt2').appendChild(c4);
        document.getElementById('pop_wrap_txt2').appendChild(c5);
        document.getElementById('pop_wrap_txt2').appendChild(c7);
 
        $('#pop_wrap2').attr('transform','translate('+(_x)+','+(_y-137)+')').stop(true,false).show();
    }
 
 
 
 
    function svg_back(){
        $('.path-zone').css('opacity','1');
 
        $('#main_g').attr('transform','translate(0,268) scale(1)');
 
        tip_init();
 
        hideScalePop();
 
        $('#u_wrap').hide();
        $('.unit-item').unbind('mouseenter mouseleave').hide();;
 
        //show_txt('txt_ch','113.591688','23.554693');
 
        $('.path-zone').each(function(){
            var _this = $(this);
 
            $(this).hover(function(){
                var _id = $(this).attr('id');
                var _area_id = $(this).attr('data-area');
                popInit(_id,_area_id);
            },function(){
                hidePop();
            });
 
 
        });
    }
 
    function tip_init(){
        $('.txt_wrap').hide();
        //clearUnit();
 
        setTimeout(function(){
            show_txt('txt_ch','113.591688','23.554693');
 
            show_txt('txt_hd','113.227121','23.410632');
 
            show_txt('txt_zc','113.797008','23.273464');
 
            show_txt('txt_by','113.335754','23.271106');
 
            show_txt('txt_yx','113.291609','23.135879');
 
            show_txt('txt_th','113.378499','23.130754');
 
            show_txt('txt_lw','113.235631','23.07919');
 
            show_txt('txt_hz','113.32489','23.089986');
 
            show_txt('txt_hp','113.502269','23.163594');
 
            show_txt('txt_py','113.390575','22.945124');
 
            show_txt('txt_ns','113.56615','22.696755');
 
            $('.txt_wrap').show();
 
        });
        
 
 
    }
 
 
    function tip_update(){
        
        //clearUnit();
 
        setTimeout(function(){
            /*scale_txt3('txt_ch','113.591688','23.554693');
 
            scale_txt3('txt_hd','113.227121','23.410632');
 
            scale_txt3('txt_zc','113.797008','23.273464');
 
            scale_txt3('txt_by','113.335754','23.271106');
 
            scale_txt3('txt_lg','113.514282','23.174988');
 
            scale_txt3('txt_yx','113.291609','23.135879');*/
 
 
 
 
            //遍历u_wrap ， 设置位置
            $('#u_wrap').find('.dot-default').each(function(){
                var _this = $(this);
                var _long = _this.attr('data-long');
                var _lati = _this.attr('data-lati');
                var _id = _this.attr('id');
 
 
                scale_unit(_id,_long,_lati);
 
            });
 
            $('.u_wrap').show();
 
            clicking = false;
            //$('.txt_wrap').show();
        },10);
    }
 
    
 
    function show_txt(id,longitude,latitude){
        var rs = rsLongLati(longitude,latitude);
        //var _svg = document.getElementById('main_svg').getBBox();
        //var _ss = document.getElementById('main_g').getBoundingClientRect();
        var _x = Math.floor(svg_width*rs.lon);
        var _y = Math.floor(svg_height*rs.lat);
        
        //$('#'+id).attr('transform','translate('+_x+','+_y+')');
        $('#'+id).attr({x:_x-20,y:_y-10});
        $('#point_'+id).attr({cx:_x,cy:_y});
 
        if(id=='txt_yx'){
            $('#warning_'+id).attr('transform','translate('+(_x-7)+','+(_y-8)+')');
        }else{
            $('#warning_'+id).attr('transform','translate('+(_x-14)+','+(_y-10)+')');
        }
        
    }
 
 
    function scale_txt3(id,longitude,latitude){
        
        var _svg = document.getElementById('main_svg').getBBox();
 
 
        var rs = rsLongLati(longitude,latitude);
 
        var _x = Math.floor(_svg.width*rs.lon)+Math.floor(_svg.x);
        var _y = Math.floor(_svg.height*rs.lat)+Math.floor(_svg.y);
 
        var nx = _x;
        var ny = _y;
 
        $('#'+id).attr({x:nx-20,y:ny-10});
        $('#point_'+id).attr({cx:nx,cy:ny});
        if(id=='txt_yx'){
            $('#warning_'+id).attr('transform','translate('+(nx-14)+','+(ny-14)+')');
        }else{
            $('#warning_'+id).attr('transform','translate('+(nx-14)+','+(ny-10)+')');
        }
 
    }
 
    function scale_unit(id,longitude,latitude){
        
        var _svg = document.getElementById('main_svg').getBBox();
 
 
        var rs = rsLongLati(longitude,latitude);
 
        var _x = Math.floor(_svg.width*rs.lon)+Math.floor(_svg.x);
        var _y = Math.floor(_svg.height*rs.lat)+Math.floor(_svg.y);
 
        var nx = _x;
        var ny = _y;
 
        $('#'+id).attr('transform','translate('+nx+','+ny+')');
        
 
    }
 
    function scale_txt2(id,longitude,latitude){
        $('.txt_wrap').hide();
 
        var _svg = document.getElementById('main_svg').getBBox();
        var _ss = document.getElementById('main_g').getBoundingClientRect();
 
 
        setTimeout(function(){
            var _svg = document.getElementById('main_svg').getBBox();
            var _ss = document.getElementById('main_g').getBoundingClientRect();
 
            var rs = rsLongLati(longitude,latitude);
 
            var _scale = 1.13;
 
            var _x = Math.floor(_svg.width*rs.lon)/_scale-_svg.x;
            var _y = Math.floor(_svg.height*rs.lat)/_scale+_svg.y;
 
            
 
 
 
            $('#'+id).attr({x:_x,y:_y});
            $('#point_'+id).attr({cx:_x,cy:_y});
 
            $('.txt_wrap').show();
        },100);
 
    }
 
    function scale_txt(id,longitude,latitude){
            $('.txt_wrap').hide();
            $('.point_wrap').hide();
        
            /*var _svg = document.getElementById('main_svg').getBBox();
            var _ss = document.getElementById('main_g').getBoundingClientRect();
        
            /*setTimeout(function(){
                var rs = rsLongLati(longitude,latitude);
 
                var _x = Math.floor(_ss.width*rs.lon-20+_svg.x);
                var _y = Math.floor(_ss.height*rs.lat-10+_svg.y);
                $('#'+id).css('transform','translate('+_x+'px,'+_y+'px)');
                clicking = false;
            },0);*/
        
 
            setTimeout(function(){
                var _svg = document.getElementById('main_svg').getBBox();
                var _ss = document.getElementById('main_g').getBoundingClientRect();
 
 
                setTimeout(function(){
                    var rs = rsLongLati(longitude,latitude);
 
                    var _x = Math.floor(svg_width*rs.lon-20+_ss.left);
                    var _y = Math.floor(svg_width*rs.lat-10);
                    //$('#'+id).attr('transform','translate('+_x+','+_y+')');
                    setTimeout(function(){
                        $('#'+id).attr({x:_x,y:_y});
                        $('#point_'+id).attr({cx:_x+20,cy:_y+10});
                    },0);
                    /*clicking = false;*/
                },0);
 
                clicking = false;
 
                $('.txt_wrap').show();
                $('.point_wrap').show();
 
            },10);
        
                
    }
 
 
    function unitShow(id,name,type,data,longitude,latitude){
 
        var _svg = document.getElementById('main_svg').getBBox();
 
        var rs = rsLongLati(longitude,latitude);
 
        var _x = Math.floor(_svg.width*rs.lon)+Math.floor(_svg.x);
        var _y = Math.floor(_svg.height*rs.lat)+Math.floor(_svg.y);
 
        var nx = _x;
        var ny = _y;
        
        $('#unit_'+id).attr('transform','translate('+(nx-14)+','+(ny-14)+') scale(.3)').show();
        
        $('#unit_'+id).hover(function(){
            
            showScalePop(longitude,latitude,data);
           
        },function(){
            hideScalePop();
 
        });
 
        var _link = $('#unit_'+id).attr('data-link');
        $('#unit_'+id).click(function(){
            window.location.href = _link;
        });
 
    }
 
    function hideUnit(){
        $('.u_wrap').hide();
        $('.unit-item').hide();
        $('#pop_wrap2').hide();
    }
 
 
    function addUnit(id,guid,name,type,data,longitude,latitude,area_id){
        /*var svgdoc = document.documentElement;
 
        var c = document.createElementNS('http://www.w3.org/2000/svg','circle');
        c.setAttribute('cx',0);
        c.setAttribute('cy',0);
        c.setAttribute('fill','#A7D4A1');
        c.r.baseVal.value = 4;
        c.setAttribute('class','dot-default active');
        c.setAttribute('data-long',longitude);
        c.setAttribute('data-lati',latitude);
        c.setAttribute('id','unit_'+id);
 
    addUnit(n.id,n.guid,n.unit,n.unittype,_data,n.longitude,n.latitude,n.area_guid);
 
        document.getElementById('u_wrap').appendChild(c);*/
 
        //创建单位
        var g = document.createElementNS('http://www.w3.org/2000/svg','g');
        g.setAttribute('class','unit-item');
        g.setAttribute('id','unit_'+id);
        g.setAttribute('transform','scale(.3)');
        g.setAttribute('display','none');
        g.setAttribute('data-link','../alarminfo/alarminfo?area_guid='+area_id+'&unit_guid='+guid);
 
 
        var pd = '';
        var bg_color = '';
        if(type=='事业单位'){
            bg_color = '#387EC2';
            pd = 'M144.748,57.972l-85.167,53.229l170.331,0L144.748,57.972L144.748,57.972zM192.651,121.848l5.323,10.647l-0.003,63.874h21.291l0.003-63.876l5.324-10.645L192.651,121.848L192.651,121.848zM150.068,121.848l5.323,10.647l-0.003,63.874h21.291l0.003-63.876l5.324-10.645L150.068,121.848L150.068,121.848zM107.486,121.848l5.323,10.647l-0.003,63.874h21.291l0.003-63.876l5.324-10.645L107.486,121.848L107.486,121.848zM64.903,121.848l5.323,10.647l-0.003,63.874l21.291,0l0.003-63.876l5.323-10.645L64.903,121.848L64.903,121.848z M64.9,207.016l-5.324,21.292l170.331,0l-5.322-21.292L64.9,207.016L64.9,207.016z M155.393,89.911c0,5.879-4.767,10.645-10.647,10.645c-5.879,0-10.646-4.766-10.645-10.645c0-5.881,4.767-10.647,10.646-10.647C150.627,79.264,155.393,84.03,155.393,89.911L155.393,89.911z';
        }else if(type=='重点单位'){
            bg_color = '#E83928';
            pd='M140.435,82.846L140.435,82.846c10.707-0.001,20.441,4.377,27.493,11.425c7.049,7.049,11.426,16.782,11.426,27.491v8.109c-0.601-0.076-1.229-0.124-1.861-0.124l-15.959,0.001v-7.985c0-5.781-2.377-11.06-6.204-14.884c-3.823-3.826-9.104-6.203-14.893-6.202l0,0c-5.794,0-11.072,2.378-14.898,6.204c-3.823,3.825-6.199,9.104-6.199,14.885l0,7.985l-15.478,0.001c-0.803,0-1.588,0.072-2.362,0.2l0-8.184c0-10.709,4.38-20.442,11.431-27.492C119.989,87.225,129.723,82.846,140.435,82.846L140.435,82.846z M177.492,134.202l-73.631,0.004c-7.773,0-14.126,6.362-14.126,14.126l0,64.116c0,7.76,6.362,14.121,14.127,14.12l73.632-0.004c7.77,0,14.132-6.362,14.132-14.122l0-64.116C191.625,140.563,185.271,134.202,177.492,134.202z M153.033,205.367l-23.274,0.001l4.742-27.458c-4.132-2.437-6.909-6.936-6.909-12.083c0-7.742,6.271-14.012,14.014-14.013c7.737,0,14.023,6.269,14.023,14.011c0,5.302-2.948,9.916-7.296,12.303L153.033,205.367z';
        }else if(type=='一般单位'){
            bg_color = '#B38247';
            pd = 'M61.184,138.015v89.05h-3.475v10.432H71.83v-91.763l55.395-19.227v109.914h39.523v-10.445h-8.146V124.128l-20.844-12.277l-22.922,7.933l0-14.883l55.388-25.088v157.022h39.53v-10.512h-8.14V76.666l-21.192-12.925L104.63,98.599v24.653L61.184,138.015z M78.239,151.702v15.972l40.94-11.729v-18.137L78.239,151.702zM78.239,174.29v15.745l40.94-7.605v-18.445L78.239,174.29z M78.239,197.213v15.645l40.94-3.482v-18.472L78.239,197.213zM78.125,220.443v15.645h40.946v-18.465L78.125,220.443z';
        }else if(type=='企业单位'){
            bg_color = '#0E2B4F';
            pd = 'M61.184,138.015v89.05h-3.475v10.432H71.83v-91.763l55.395-19.227v109.914h39.523v-10.445h-8.146V124.128l-20.844-12.277l-22.922,7.933l0-14.883l55.388-25.088v157.022h39.53v-10.512h-8.14V76.666l-21.192-12.925L104.63,98.599v24.653L61.184,138.015z M78.239,151.702v15.972l40.94-11.729v-18.137L78.239,151.702zM78.239,174.29v15.745l40.94-7.605v-18.445L78.239,174.29z M78.239,197.213v15.645l40.94-3.482v-18.472L78.239,197.213z M78.125,220.443v15.645h40.946v-18.465L78.125,220.443z';
        }else{
            bg_color = '#B38247';
            pd = 'M61.184,138.015v89.05h-3.475v10.432H71.83v-91.763l55.395-19.227v109.914h39.523v-10.445h-8.146V124.128l-20.844-12.277l-22.922,7.933l0-14.883l55.388-25.088v157.022h39.53v-10.512h-8.14V76.666l-21.192-12.925L104.63,98.599v24.653L61.184,138.015z M78.239,151.702v15.972l40.94-11.729v-18.137L78.239,151.702zM78.239,174.29v15.745l40.94-7.605v-18.445L78.239,174.29z M78.239,197.213v15.645l40.94-3.482v-18.472L78.239,197.213zM78.125,220.443v15.645h40.946v-18.465L78.125,220.443z';
        }
 
 
        var p1 = document.createElementNS('http://www.w3.org/2000/svg','path');
        p1.setAttribute('fill',bg_color);
        p1.setAttribute('d','M27.477,0L0,6.39l0,31.395c0,7.074,2.947,13.828,8.132,18.64l19.344,17.949l19.344-17.949c5.186-4.812,8.132-11.566,8.132-18.64l0-31.395L27.477,0z');
 
        g.appendChild(p1);
 
 
        var g2 = document.createElementNS('http://www.w3.org/2000/svg','g');
 
 
        var g3 = document.createElementNS('http://www.w3.org/2000/svg','g');
        g3.setAttribute('transform','scale(0.1953125, 0.1953125)');
 
        var p2 = document.createElementNS('http://www.w3.org/2000/svg','path');
        p2.setAttribute('fill','white');
        p2.setAttribute('d',pd)
 
 
        g3.appendChild(p2);
 
        g2.appendChild(g3);
 
        g.appendChild(g2);
 
 
        document.getElementById('u_wrap').appendChild(g);
 
        unitShow(id,name,type,data,longitude,latitude);
 
    }
 
    function clearUnit(){
        $('#u_wrap').children().remove();
    }
 
  //获取单位信息
    function loadUnit(area_id){
        var rs = http_get('../map/countUnit',{area_id:area_id,rand:Math.random()});
        $.each(rs,function(i,n){
            var _data = {name:'',type_name:'',online:0,offline:0,wclzs:0,yclzs:0};
            _data.name = n.unit;
            _data.type_name = n.unittype;
            _data.online = n.online;
            _data.offline = n.offline;
            _data.wclzs =n.allmessage-n.dealmessage;
            _data.yclzs=n.dealmessage;
            addUnit(n.id,n.guid,n.unit,n.unittype,_data,n.longitude,n.latitude,n.area_guid);
        });
    }
 
 
    function rsLongLati(longitude,latitude){
        var lon = ((trueNum(longitude)-trueNum(gz_long.leftLongitude))/(trueNum(gz_long.rightLongitude)-trueNum(gz_long.leftLongitude)));
        var lat =  Math.abs(((trueNum(latitude)-trueNum(gz_long.topLatitude)))/(trueNum(gz_long.topLatitude)-trueNum(gz_long.bottomLatitude)));
        return {
            lon:lon,lat:lat
        }
    }
 
 
 
    function trueNum(str){
        return (str-0)*1000000;
    }
 
 
    function clearInit(){
        $('.txt_wrap').hide();
        //$('.u_wrap').hide();
        hidePop();
 
        //清除事件
        $('.path-zone').unbind('mouseenter mouseleave');
    }
    
 
    
    
    function svg_zoom(id){
 
        clearInit();
 
        //取消其它区显示，同时清除点击事件
        $('.path-zone').not('#'+id).css('opacity','0');
        $('.path-zone').unbind('click');
        
        $('#'+id).css('opacity','1');
 
        var _area_id = $('#'+id).attr('data-area');
 
        switch(id){
            
            case 'path_hz':
                $('#main_g').attr('transform','translate(-979.3657980174683,-451.6151028111472) scale(10.01676787664356)');
                break;
            case 'path_py':
                $('#main_g').attr('transform','translate(-244.03287494711748,-101.57292694609129) scale(2.6666356852083544)');
                break;
            case 'path_ns':
                $('#main_g').attr('transform','translate(-731.7256681244464,-706.4101192620558) scale(4.18869148317141)');
                break;
            case 'path_lw':
                $('#main_g').attr('transform','translate(-652.1168551254909,-273.08003583826377) scale(8.573307540391086)');
                break;
            case 'path_yx':
                $('#main_g').attr('transform','translate(-1097.0416349345896,-273.0575747521306) scale(10.966006889002703)');
                break;
            case 'path_hp':
                $('#main_g').attr('transform','translate(-375.57591934015363,232.42494613619226) scale(2.8711989260395683)');
                break;
            case 'path_th':
                $('#main_g').attr('transform','translate(-703.5477874853018,65.79860375145142) scale(5.8891449779497025)');
                break;
            case 'path_by':
                $('#main_g').attr('transform','translate(-130.58422092675312,296.86853669260637) scale(2.41882798830923)');
                break;
            case 'path_hd':
                $('#main_g').attr('transform','translate(40.60000000000001,389.1114191175328) scale(1.6970600720785447)');
                break;
            
            case 'path_zc':
                $('#main_g').attr('transform','translate(-364.41518643668496,343.2928722917212) scale(1.8975181935041963)');
                break;
            case 'path_ch':
                $('#main_g').attr('transform','translate(-281,560) scale(1.8)');
                break;
        }
 
        //tip_update();
 
        hideUnit();
        clearUnit();
        $('#pop_wrap').hide();
        $('.txt_wrap').hide();
        
        loadUnit(_area_id);
        tip_update();
 
    }
 
 
    
    function hidePop(){
        $('#pop_wrap').stop(true,false).hide();
    }
    function hideScalePop(){
        $('#pop_wrap2').stop(true,false).hide();
    }
 
 
 
 
 
    function popInit(_id,area_id){
        switch(_id){
                    case 'path_ns':
                        showPop('113.56615','22.696755',map_data[area_id-1]); 
                        break;
                    case 'path_hz':
                        showPop('113.32489','23.089986',map_data[area_id-1]); 
                        break;
                    case 'path_py':
                        showPop('113.390575','22.945124',map_data[area_id-1]); 
                        break;
                    case 'path_lw':
                        showPop('113.235631','23.07919',map_data[area_id-1]); 
                        break;
                    case 'path_th':
                        showPop('113.368499','23.150754',map_data[area_id-1]); 
                        break;
                    case 'path_hd':
                        showPop('113.227121','23.410632',map_data[area_id-1]); 
                        break;
                    case 'path_by':
                        showPop('113.335754','23.271106',map_data[area_id-1]); 
                        break;
                    case 'path_yx':
                        showPop('113.291609','23.135879',map_data[area_id-1]);
                        break;
                    case 'path_hp':
                        showPop('113.502269','23.163594',map_data[area_id-1]); 
                        break;
                    case 'path_ch':
                        showPop('113.591688','23.554693',map_data[area_id-1]); 
                        break;
                    case 'path_zc':
                        showPop('113.797008','23.273464',map_data[area_id-1]);
                        break;
 
                }
    }
 
 
    //初始化区域信息    
    function init_area_data(){
    	var _rs;
    	$.ajax({
    		url:'../map/getareacount',
    		type:'GET',
    		dataType:'json',
    		async:false,
    		success:function(rs){
    			_rs = rs;
    			//加载完成加载框删除
    			  var hideload = new Loading().hideLoading();
    		}
    	});
        var guangzhou = _rs.guangzhou;
        var _arr = [];
        _arr.push('<ul>');
        $.each(guangzhou.rows, function(i, n) {
            _arr.push('<li> ' + n.name + ' : ' + n.filenum + ' / ' + n.unitnum
                    + ' 个</li>');
        });
        _arr.push('<li>已处理总数：' + guangzhou.dealed + '</li>');
        _arr.push('<li>未处理总数：' + (guangzhou.allalarm - guangzhou.dealed) + '个</li>');
        _arr.push('</ul>');
        $('#yssmtj').html(_arr.join("\n"));
        $('#online').text(guangzhou.online)
        $('#offline').text(guangzhou.offline)
        for(var i=0;i<11;i++){
            //设置数据
              map_data[i] = {
                type:_rs.area[i].rows,         //整合上边的信息
                wclzs :_rs.area[i].allalarm-_rs.area[i].dealed,
                yclzs:_rs.area[i].dealed,
                khdzx:_rs.area[i].online,
                khdbzx:_rs.area[i].offline,
                name:_rs.area[i].area
        };
        }
        
        
    }