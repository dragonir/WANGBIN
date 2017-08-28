var store = {
  save(key,value){
    localStorage.setItem(key,JSON.stringify(value));
  },
  fetch(key){
    return JSON.parse(localStorage.getItem(key)) || [];
  }
}

var list = store.fetch('vue-todo');

var filter = {
  all:function(list){
    return list
  },
  unfinished:function(list){
    return list.filter(function(item){
        return !item.isChecked;
      })
  },
  finished:function(list){
    return list.filter(function(item){
        return item.isChecked;
      })
  }
}

var vm = new Vue({
  el:'.main',
  data:{
   list:list,
   todo:'',
   editorTodos:'',
   beforeTitle:'',
   visibility:'all'
  },
  watch:{
    list:{
      handler:function(){
      store.save('vue-todo',list);
    },
      deep:true
   }
  },
  computed:{
    nocheckedlength: function(){
      return this.list.filter(function(item){
        return !item.isChecked;
      }).length
    },
    filteredList:function(){
      return filter[this.visibility]
              ? filter[this.visibility](list)
              : list ;
    }
  },
  
  methods:{
    addTodo(ev){   
        console.log(ev);
        if(!!this.todo){
        this.list.push({
          title:this.todo,
          isChecked:false
        });
        }
        this.todo = '';
      },
    deleteTodo(todo){
        var index = this.list.indexOf(todo);
        this.list.splice(index,1);
      },
    editorTodo(todo){
        console.log(todo);
        this.beforeTitle = todo.title;
        this.editorTodos = todo;
      },
    editorTodoed(todo){
      this.editorTodos = '';
    },
    cancelTodo(todo){
      todo.title = this.beforeTitle;
      this.beforeTitle = '';
      this.editorTodos = '';
    }
  },
  directives:{
    'focus':{
      update(el,binding){
        if(binding.value){
          el.focus();
        }
      }
    }
  }
})


function watchHashChange(){
  var hash = window.location.hash.slice(1);
  vm.visibility = hash;
  
  console.log(hash);
}

window.addEventListener('hashchange',watchHashChange);