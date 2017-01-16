angular.module("ngSafiDep",[]).directive("ngSafi",function(){
  var threads={};
  return {
    restrict:'A',
    link:function(s,e,a){
      var text=a.t;
      var x=Math.round(Math.random()*1000);

      threads["x"+x]={
        s:function (text,ele) {
          let reg=/\*([^\*]+)\*/mg;
          this.newtext=[];
          console.log("create satyping",this.newtext)
          this.text="";
          this.index=0;
          this.array=[];
          this.paramater={};
          this.operationRepeat=0;
          this.selector=null;
          this.status="writing";
          let self=this;
          self.statusFunctions={
            writing:function(o) {
                self.newtext.push({txt:self.text.substr(self.index,1),c:"ngsafiT"});
            },
            delete:function(o) {
              self.newtext.pop();
              self.index--;
            },
            select:function(o) {
                self.newtext.push({txt:self.text.substr(self.index,1),c:"ngsafiTS"});
            },
            selectinverse:function(o) {
               for (var i = self.newtext.length-1; i >self.newtext.length-1-o.s; i--) {
                 self.newtext[i].c="ngsafiTS";
               }
            }
          }
          this.toHtml=function(){
            return (function () {
              //console.log(self.newtext);
              let texts="";
              $.each(self.newtext,function(k,v){
                  texts+="<span class='"+v.c+"'>"+v.txt+"</span>";
              })
              return texts;
            })();
          }
          this.getStatusByRole=function(r) {
            let m;
            if( (m=(/^\-(\d)$/g).exec(r))!==null ){
              console.log("delete",m[1]);
              self.operationRepeat=m[1]-1;
              self.index+=r.length+2;
              self.status="delete";
            }else if( (m=(/^s(\d+)$/g).exec(r))!==null ){
              console.log("select",m[1]);
              self.operationRepeat=m[1]-1;
              self.index+=r.length+2;
              self.status="select";
            }else if( (m=(/^sx(\d+)$/g).exec(r))!==null ){
              self.paramater={s:m[1]};
              self.operationRepeat=0;
              self.index+=r.length+1;
              self.status="selectinverse";
              console.log("select inverse",m[1],r.length);
            }
          }
          this.indexExist=function(){
            if(self.operationRepeat>0){
              self.operationRepeat--;
              return;
            }
            self.status="writing";
            $.each(self.array,function(k,v){
                if(v.index==self.index){
                  self.getStatusByRole(v[1])
                }
            });
          }
          this.itirat=function(x){
            self.indexExist();
            self.statusFunctions[self.status](self.paramater);
            self.index++;
            $(self.selector).find(".textcontent").first().html(self.toHtml());
            $(self.selector).find(".textcontent").first().toggleClass("cursorx");
            setTimeout(function(){
              if(self.index<self.text.length){
                  self.itirat(x);
              }else{
                $(self.selector).find(".textcontent").first().removeClass("cursorx");
              }
            },x);
          }
          this.startTyping=function(array,txt,selector,x=150){
            $(selector).html('<div class="textcontent"></div></div>');
            self.text=txt;
            self.array=array;
            self.selector=selector;
            self.itirat(x);
          }
          this.init=function(text,o){
            console.log("init")
            let arr=[];
            for (let match; (match = reg.exec(text)) !== null;)
                arr.push(match);
                self.startTyping(arr,text,$(o));
          }
          self.init(text,ele);
        }
      }
      threads["x"+x]["s"](text,$(e));
    }
  }
});
