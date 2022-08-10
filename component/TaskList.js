

class TaskList {
    constructor(elem){
        this.elem = elem
        this.state = {
            id: "",
            task: "",
            editTask: "",
            tasks: [],
            isEdit: false
        }
        this.elements = []
        this.handleInput = this.handleInput.bind(this)
        this.handleAddTask = this.handleAddTask.bind(this)
        this.handleDeleteTask = this.handleDeleteTask.bind(this)
        this.handleEditForm = this.handleEditForm.bind(this)
        this.handleEditTask = this.handleEditTask.bind(this)
    }
    handleInput(e){
        let { name, value } = e.target
        this.setState({
            ...this.state,
            [name]:value
        })
        return this
    }
    handleAddTask(e){
        e.preventDefault()
        let todo = {}
        todo.id = Math.floor(Math.random()*900000)
        todo.task = this.state.task
        this.setState({
            ...this.state,
            tasks: [todo, ...this.state.tasks],
            task: ""
        })
        this.render()
        return this
    }
    handleDeleteTask(todo){
        let allTheOthers = this.state.tasks.filter(task => task.id !== todo.id)
        this.setState({
            ...this.state,
            tasks: allTheOthers
        })
        this.render()
        return this
    }
    handleEditForm(todo){
        this.setState({
            ...this.state,
            editTask: todo.task,
            id: todo.id,
            isEdit: true
        })
        this.render()
        return this
    }
    handleEditTask(e){
        e.preventDefault()
        let youveChanged = this.state.tasks.map(todo => {
            if(this.state.id === todo.id){
                todo.task = this.state.editTask
            }
            return todo
        })
        this.setState({
            ...this.state,
            tasks: youveChanged,
            id: "",
            editTask: "",
            isEdit: false
        })
        this.render()
        return this
    }
}
TaskList.prototype.setState = function(state){
    this.state = state
    return this
}
TaskList.prototype.setElements = function(arr){
    this.elements = [...arr]
    return this
}
TaskList.prototype.unsetElements = function(){
    this.elements = []
    return this
}
TaskList.prototype.renderList = function(){
    this.elem.innerHTML = ""
    let root = document.createElement("div")
    root.innerHTML = ""
    root.setAttribute("id", "root")
    root.setAttribute("class", "wrapper")
    this.elements.forEach(element => root.append(element))
    this.elem.append(root)
    this.unsetElements()
    return this
}
TaskList.prototype.Header = function(){
    let header = document.createElement("header")
    header.setAttribute("class", "header")
    let h1 = document.createElement("h1")
    h1.innerText = "Things to do"
    header.append(h1)
    return header
}
TaskList.prototype.Form = function(props){
    let form = document.createElement("form")
    form.addEventListener("submit", props.handleSubmit)
    form.setAttribute("class", props.formClass)
    props.inputs.forEach(obj => {
        let input = document.createElement("input")
        input.addEventListener("input", this.handleInput)
        input.setAttribute("name", obj.name)
        input.setAttribute("type", obj.type)
        input.value = obj.value
        input.required = obj.required
        form.append(input)
    })
    const subBtn = document.createElement("button")
    subBtn.setAttribute("type", "submit")
    subBtn.innerText = props.subTxt
    form.append(subBtn)
    return form
}
TaskList.prototype.AddForm = function(){
    let props = {
        handleSubmit: this.handleAddTask,
        formClass: "add-task",
        subTxt: "ADD",
        inputs: [{
            name: "task",
            type: "text",
            value: this.state.task,
            required: true
        }]
    }
    let section = document.createElement("section")
    section.setAttribute("class", "todo-section")
    section.append(this.Form(props))
    return section
}
TaskList.prototype.List = function(){
    let props = {
        handleSubmit: this.handleEditTask,
        formClass: "edit-task",
        subTxt: "CHANGE",
        inputs:[{
            name: "editTask",
            type: "text",
            value: this.state.editTask,
            required: true
        }],
        btns:[{handleClick:this.handleDeleteTask,class:"delete-btn",btnTxt:"X"},
            {handleClick:this.handleEditForm,class:"edit-btn",btnTxt:"EDIT"}]
    }
    let section = document.createElement("section")
    section.setAttribute("class", "list-section")
    if(this.state.tasks.length < 1){
        let h3 = document.createElement("h3")
        h3.setAttribute("class", "nothing-todo")
        h3.innerText = "There is nothing here to do!"
        section.append(h3)
        return section
    }else{
        let ul = document.createElement("ul")
        ul.setAttribute("class", "task-list")
        this.state.tasks.forEach(todo =>{
            if(this.state.isEdit && todo.id === this.state.id){
                let li = document.createElement("li")
                li.append(this.Form(props))
                ul.append(li)
            } else {
                let li = document.createElement("li")
                li.innerText = todo.task
                props.btns.forEach(btn => li.append(this.Btn(btn, todo)))
                ul.append(li)
            }
        })
        section.append(ul)
        return section
    }
}
TaskList.prototype.Btn = function(props, value){
    let button = document.createElement("button")
    button.addEventListener("click", ()=>props.handleClick(value))
    button.setAttribute("type", "button")
    button.setAttribute("class", props.class)
    button.innerText = props.btnTxt
    return button
}
TaskList.prototype.render = function(){
    this.setElements(Array(this.Header(),this.AddForm(),this.List()))
    this.renderList()
    this.unsetElements()
}


export default TaskList