
//Url de la api Fake
API_URL = 'https://my-json-server.typicode.com/LizethMartin/M3U2TrelloAppLizethMartinez';
//Saber estado de la tarjeta que se quiere añadir
state: String;

//leer base de datos fake
function consultar() {
    //consulta peticion get base de datos fake
    axios.get(`${API_URL}/tasks`).then((respuesta) => {
        //for para añadir los datos de la api fake   
        for (i = 0; i < respuesta.data.length; i++) {
            //Llamado de función que crea el card en el html
            this.drawTaskState(respuesta.data[i])
        };
    }).catch((err) => {
        //Alerta por si ocurre algún error
        alert('Ha sucedido un problema:' + err);
    }).finally(
        //Console log que indica que la petición fue realizada
        console.log('done')
    );
}

//Función para conocer donde agregar el nuevo elemento
function specificTask(state) {
    //Se le da el valor del html para saber donde agregar el card
    this.state = state;
}

//Función para darle formato a la fecha
function getDate(date) {
    //retornar fecha con formato
    return moment(date).format("LL")
}

//Función para tomar datos del formulario y crearlo en un object
function addTask() {
    if (this.state == 'done' || this.state == 'process' || this.state == 'to-do') {
        dataForm = {
            "title": $("#title").val(),
            "person": $("#user").val(),
            "details": $("#details").val(),
            "state": this.state,
            "deadline": Number(moment().add($("#deadLine").val(), 'days')),
            "created": Number(moment())
        };
    } else if (this.state === undefined) {
        dataForm = {
            "title": $("#title").val(),
            "person": $("#user").val(),
            "details": $("#details").val(),
            "state": "to-do",
            "deadline": Number(moment().add(Number($("#deadLine").val()), 'days')),
            "created": Number(moment())
        };
    }
    //Llamado de función para realizar el post al api Fake
    this.peticionPost(dataForm);
}

//Funció para crear un nuevo campo en el api Fake
function peticionPost(dataFormE) {
    //peticion post base de datos fake
    axios.post(`${API_URL}/tasks`, dataFormE).then(function (response) {
        //Llamado función para crear los card nuevos
        this.drawTaskState(dataFormE);
        //Borra el formulario
        document.getElementById("newTaskForm").reset();
    }).catch(function (error) {
        console.log(error);
    });
}

//Función para determinar donde crear el card nuevo y llamar la función que lo dibuja
function drawTaskState(task) {
    //Operador ternario para saber si la tarea que se va a agregar pertenece a hecho, por hacer o en proceso y llamar función para agregarlo al html
    task.state == "done" ? $("#done").append(this.drawTask(task))
        : task.state == "to-do" ? $("#toDo").append(this.drawTask(task))
            : $("#process").append(this.drawTask(task));
}

//Función para determinar donde crear el card nuevo 
function drawTask(taskDraw) {
    //Creación variable con html para agregar el card y retorna la variable
    const card = '<div  class="card mt-3 task"" style="width: 18rem;"><div class="card-body"><h5 class="card-title">' + taskDraw.title + '</h5><h6 class="card-subtitle mb-2 text-muted">' + taskDraw.person + '</h6><p class="card-text">' + taskDraw.details + '<br><br><span class="deadline"><b>Deadline: ' + this.getDate(taskDraw.deadline) + '</span></b></p></div></div>';
    return card
}

