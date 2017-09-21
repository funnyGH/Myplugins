var COM={
    initDown:function(){
        $(".down,.icon-down").on("click",function(event){
            $(".down-ul").hide();
            $(".tree-down-ul").hide();
            $(this).parent().children(".down-ul").show();
            $(this).parent().children(".tree-down-ul").show();
            COM.stopEventBubble(event);
        });
        $(document).on("click",function(){
            $(".down-ul").hide();
            $(".tree-down-ul").hide();
        });
    },
    treeDown:function(that){
        $(that).parents(".tree-down-ul").parent().children(".down").attr("needId",$(that).attr("needId"));
        $(that).parents(".tree-down-ul").parent().children(".down").val($(that).attr("needName"));
        $(that).parents(".tree-down-ul").parent().children(".down").attr("title",$(that).attr("needName"));
        COM.stopEventBubble(event);
        var olevel = $(that).attr("data-level");
        var oli = $(that).parent("li");
        var oid = $(that).parent("li").attr("id");
        if(olevel == '1'){
            if(oli.children("ul").length == 0){
                $.ajax({
                    type: 'get',
                    url: 'js/child2.json',
                    dataType: 'json',
                    success: function(rs){
                        if(!rs.data || rs.data.length == 0){
                            $(".tree-down-ul").hide();
                        }else {
                            var ohtml = '<ul class="show-ul ul-' + olevel + '">';
                            for (var i = 0; i < rs.data.length; i++) {
                                ohtml += '<li id="li' + olevel + i + '">' +
                                    '<p onclick="COM.treeDown(this)" data-level="2" needid="' + rs.data[i].childCode + '" needname="' + rs.data[i].childName + '" class="">' +
                                    '<i class="leftIcon parentBg"><i class="bg"></i></i>' +
                                    '<i class="rightIcon parentBg"><i class="bg"></i></i>' +
                                    '<a style="margin-left: 20px;">' + rs.data[i].childName + '</a>' +
                                    '</p></li>';
                            }
                            ;
                            ohtml += '</ul>';
                            oli.append(ohtml);
                        }
                    }
                });
            }else{
                oli.children("ul").slideToggle(100);
            }
        }else if(olevel == '2'){
            if(oli.children("ul").length == 0){
                $.ajax({
                    type: 'get',
                    url: 'js/child3.json',
                    dataType: 'json',
                    success: function (rs) {
                        if(!rs.data || rs.data.length == 0){
                            $(".tree-down-ul").hide();
                        }else{
                            var ohtml = '<ul class="show-ul ul-' + olevel + '">';
                            for (var i = 0; i < rs.data.length; i++) {
                                ohtml += '<li id="li'+ olevel + i +'">' +
                                    '<p onclick="COM.treeDown(this)" data-level="3" needid="' + rs.data[i].childCode + '" needname="' + rs.data[i].childName + '" class="">' +
                                    '<i class="leftIcon parentBg"><i class="bg"></i></i>' +
                                    '<i class="rightIcon parentBg"><i class="bg"></i></i>' +
                                    '<a style="margin-left: 40px;">' + rs.data[i].childName + '</a>' +
                                    '</p></li>';
                            }
                            ;
                            ohtml += '</ul>';
                            oli.append(ohtml);
                        }
                    }
                });
            }else{
                oli.children("ul").slideToggle(100);
            }
        }else if(olevel == '3'){
            if(oli.children("ul").length == 0){
                $.ajax({
                    type: 'get',
                    url: 'js/child4.json',
                    dataType: 'json',
                    success: function(rs){
                        if(!rs.data || rs.data.length == 0){
                            $(".tree-down-ul").hide();
                        }else {
                            var ohtml = '<ul class="ul-' + olevel + '">';
                            for (var i = 0; i < rs.data.length; i++) {
                                ohtml += '<li id="li' + olevel + i + '">' +
                                    '<p onclick="COM.treeDown(this)" data-level="4" needid="' + rs.data[i].childCode + '" needname="' + rs.data[i].childName + '" class="">' +
                                    '<i class="leftIcon parentBg"><i class="bg"></i></i>' +
                                    '<i class="rightIcon parentBg"><i class="bg"></i></i>' +
                                    '<a style="margin-left: 60px;">' + rs.data[i].childName + '</a>' +
                                    '</p></li>' +
                                    '</ul>';
                            }
                            ;
                            ohtml += '</ul>';
                            oli.append(ohtml);
                        }
                    }
                });
            }else{
                oli.children("ul").slideToggle(100);
            }
        }else if(olevel == '4'){
            $(".tree-down-ul").hide();
        }
    },
    init:function(ele){
        $.ajax({
            type: 'get',
            url: 'js/child1.json',
            dataType: 'json',
            success: function(rs){
                var ohtml = '';
                for(var i = 0;i < rs.data.length;i++){
                    ohtml += '<li id="li'+ 0 + i +'">' +
                        '<p onclick="COM.treeDown(this)" data-level="1" needid="'+ rs.data[i].childCode +'" needname="'+ rs.data[i].childName +'" class="">' +
                        '<i class="leftIcon parentBg"><i class="bg"></i></i>' +
                        '<i class="rightIcon parentBg"><i class="bg"></i></i>' +
                        '<a>'+ rs.data[i].childName +'</a>' +
                        '</p>' +
                        '</li>';
                };
                $(ele).append(ohtml);
            }
        });
    },
    "stopEventBubble":function(e){
        e.cancelBubble=true;
        e.stopPropagation();
    }
}
/**
 @Name : 阻止冒泡和捕获(无参数)
 */
var StopEventBubble={
    getEvent:function(){
        if(window.event)    {return window.event;}
        func=getEvent.caller;
        while(func!=null){
            var arg0=func.arguments[0];
            if(arg0){
                if((arg0.constructor==Event || arg0.constructor ==MouseEvent
                    || arg0.constructor==KeyboardEvent)
                    ||(typeof(arg0)=="object" && arg0.preventDefault
                    && arg0.stopPropagation)){
                    return arg0;
                }
            }
            func=func.caller;
        }
        return null;
    },
    stopEventBubble:function(){
        var e=this.getEvent();
        if(window.event){
            e.returnValue=false;
            e.cancelBubble=true;
        }else if(e.preventDefault){
            e.preventDefault();
            e.stopPropagation();
        }
    }
};
//下拉树的调用
COM.initDown();   //初始化页面下拉元素
COM.init("#treeDown");