

APIUrl = '../db.json';
state: String;
formData = document.getElementById('newTaskForm');
//leer base de datos fake
function consultar() {
    //consulta peticion get base de datos fake
    axios.get(APIUrl).then((respuesta) => {
        //for para añadir los datos de la api fake   
        for (i = 0; i < respuesta.data.tasks.length; i++) {
            respuesta.data.tasks[i].state == "done" ? $("#done").append('<div  class="card mt-3 task"" style="width: 18rem;"><div class="card-body"><h5 class="card-title">' + respuesta.data.tasks[i].title + '</h5><h6 class="card-subtitle mb-2 text-muted">' + respuesta.data.tasks[i].person + '</h6><p class="card-text">Deadline: ' + moment(respuesta.data.tasks[i].deadline).format("DD-MM-Y") + '</p></div></div>')
                : respuesta.data.tasks[i].state == "to-do" ? $("#toDo").append('<div class="card mt-3 task" style="width: 18rem;"><div class="card-body"><h5 class="card-title">' + respuesta.data.tasks[i].title + '</h5><h6 class="card-subtitle mb-2 text-muted">' + respuesta.data.tasks[i].person + '</h6><p class="card-text">Deadline: ' + moment(respuesta.data.tasks[i].deadline).format("DD-MM-Y") + '</p></div></div>')
                    : $("#process").append('<div class="card mt-3 task" style="width: 18rem;"><div class="card-body"><h5 class="card-title">' + respuesta.data.tasks[i].title + '</h5><h6 class="card-subtitle mb-2 text-muted">' + respuesta.data.tasks[i].person + '</h6><p class="card-text">Deadline: ' + moment(respuesta.data.tasks[i].deadline).format("DD-MM-Y") + '</p></div></div>');
        };
    }).catch((err) => {
        alert('Ha sucedido un problema:' + err);
    }).finally(console.log('done'));
}

function specificTask(state) {
    this.state = state;

}

function addTask() {
    //consulta peticion get base de datos fake
    if (this.state == 'done' || this.state == 'process' || this.state == 'to-do') {
        data = {
            "id": 4,
            "title": $("#title").val(),
            "person": $("#user").val(),
            "details": "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
            "state": this.state,
            "deadline": Number(moment().add($("#deadLine").val(), 'days').format("X")),
            "created": Number(moment().format("X"))
        };
    } else if (this.state === undefined) {
        data = {
            "id": 4,
            "title": $("#title").val(),
            "person": $("#user").val(),
            "details": "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
            "state": "to-do",
            "deadline": Number(moment().add(Number($("#deadLine").val()), 'days').format("X")),
            "created": Number(moment().format("X"))
        };
    }

    console.log(`${APIUrl}/tasks`)
    axios.post(`${APIUrl}/tasks`, data).then(function (response) {
        console.log(response);
    })
        .catch(function (error) {
            console.log(error);
        });

    console.log(data)
}

