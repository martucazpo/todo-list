import TaskList from "./TaskList.js"

class TodoList extends HTMLElement {
    constructor(){
        super()
        const shadow = this.attachShadow({mode:'open'})
        const root = document.createElement("div")
        root.setAttribute("class", "wrapper")
        const link = document.createElement("link")
        link.setAttribute("rel", "stylesheet")
        link.setAttribute("href", "./todolist/styles.css")
        shadow.append(link)
        shadow.append(root)
        new TaskList(root).render()
    }
}

export default TodoList