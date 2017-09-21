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
    treeDown:function(ele){
        $(ele).find("p").on("click",function(event){
            $(this).parents(".tree-down-ul").parent().children(".down").attr("needId",$(this).attr("needId"));
            $(this).parents(".tree-down-ul").parent().children(".down").val($(this).attr("needName"));
            $(this).parents(".tree-down-ul").parent().children(".down").attr("title",$(this).attr("needName"));
            if($(this).next("ul").children("li").length==0){
                $(".tree-down-ul").hide();
            }
            COM.stopEventBubble(event);
        });
        $(ele).find("p").on("mouseover",function(){
            $(this).addClass("hover");
        })
        $(ele).find("p").on("mouseout",function(){
            $(this).removeClass("hover");
        })
    },
    CreateTree:function(ele){
        this.tree=$(ele);
        this.data=null;
        this.n=0;
        COM.CreateTree.prototype.init=function(data){
            this.setTree(data,this.tree,this.n);
        }
        COM.CreateTree.prototype.setTree=function(data,ul,n){
            n++;
            var fragment=$(document.createDocumentFragment());
            for(var i = 0;i < data.length;i++){
                var li=$("<li/>");
                var p=$("<p/>");
                p.on("click",function(){
                    $(this).next("ul").toggle();
                    $(this).parent().siblings().find("ul").hide();
                })
                p.attr("needId",data[i].needId);
                p.attr("needName",data[i].needName);
                var i1=$("<i/>");
                i1.addClass("leftIcon");
                i1.addClass("parentBg");
                var i2=$("<i/>");
                i2.addClass("bg");
                i1.append(i2);
                p.append(i1);
                var i3=$("<i/>");
                i3.addClass("rightIcon");
                i3.addClass("parentBg");
                var i4=$("<i/>");
                i4.addClass("bg");
                i3.append(i4);
                p.append(i3);
                var a=$("<a/>");
                a.css("margin-left",10*n+"px");
                a.html(data[i].needName);
                p.append(a);
                li.append(p);
                if(data[i].children!=null){
                    if(data[i].children.length!=0){
                        var newUl=$("<ul/>");
                        newUl.addClass("hidden-ul");
                        newUl.addClass("ul-"+n);
                        this.setTree(data[i].children,newUl,n);
                        li.append(newUl);
                    }
                }
                fragment.append(li);
            }
            ul.append(fragment);
        }
        COM.CreateTree.prototype.setData=function(data,param1,param2,param3,param4){
            var ret=JSON.stringify(data);
            if(param1!=null&&param1!=""){
                ret=ret.replace(new RegExp(param1,'g'),"needId");
            }
            if(param2!=null&&param2!=""){
                ret=ret.replace(new RegExp(param2,'g'),"needName");
            }
            if(param3!=null&&param3!=""){
                ret=ret.replace(new RegExp(param3,'g'),"children");
            }
            if(param4!=null&&param4!=""){
                ret=ret.replace(new RegExp(param4,'g'),"needCode");
            }
            ret=$.parseJSON(ret);
            return ret;
        }
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
var treeDown=new COM.CreateTree($("#treeDown"));
COM.initDown();   //初始化页面下拉元素



$.ajax({
    type: 'get',
    url: 'js/package.json',
    dataType: 'json',
    success: function(rs){
         var treeData1=treeDown.setData(rs.data,"subSystemCode","subSystemName","childrenList");
        treeData1=treeDown.setData(treeData1,"equipmentCode","equipmentName");
        treeData1=treeDown.setData(treeData1,"functionpositionCode","functionpositionName");
        treeDown.init(treeData1);
        COM.treeDown("#treeDown");  //给下拉树注册事件
    }
});