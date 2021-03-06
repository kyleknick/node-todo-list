$(document).ready(function(){
    $.getJSON("/api/todos")
        .then(addTodos)
        
    $('#todoInput').keypress(function(event){
        if(event.which == 13) {
        createTodo();
        }
    });
    $('.list').on('click', 'span', function() {
        removeTodo($(this).parent());
    })
});

function addTodos(todos) {
    //add todos to the page
    todos.forEach(function(todo){
    });
}

function addTodo(todo){
     var newTodo = $('<li class="task">'+todo.name +' <span>X</span></li>');
     newTodo.data('id', todo._id);
    if(todo.completed){
        newTodo.addClass("done");
    }
    $('.list').append(newTodo);
}

function createTodo(){
    //send request to create new todo
    var usrInput = $('#todoInput').val();
    $.post('/api/todos',{name: usrInput })
    .then(function(newTodo){
         $('#todoInput').val('')
        addTodo(newTodo);
    })
    .catch(function(err){
        console.log(err);
    })
}

function removeTodo(todo){
    var clickedId = $(this).parent().data('id');
    var deleteUrl = '/api/todos/' + clickedId;
    $.ajax({
        method: 'DELETE',
        url: deleteUrl
    })
    .then(function(data){
        todo.remove();
    })
}