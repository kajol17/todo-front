function Task(taskname,isdone)
{
    this.taskname=taskname;
    this.isdone=isdone;
}
function addTask(e)
{
    e.preventDefault()
    item = document.querySelector("#value");
    val = item.value;
    item.value = '';
    addTaskInsertHtml(val);
    storageTasks = JSON.parse(window.localStorage.getItem('toDoTasks'));
    if(!storageTasks)
        storageTasks = [];
    task=new Task(val,false);
    storageTasks.push(task);
    console.log(storageTasks)
    window.localStorage.setItem('toDoTasks',JSON.stringify(storageTasks));
}
function addTaskInsertHtml(val)
{
    li = document.createElement("li");
    x=document.createElement("input");
    x.setAttribute("type","checkbox");
    x.setAttribute("class","mr-2");
    x.addEventListener("change",changed);
    li.className = "list-group-item";
    ul = document.querySelector(".list-group");
    li.appendChild(x);
    li.appendChild(document.createTextNode(val));
    ul.appendChild(li);
}
function changed(e)
{
    if(e.target.checked)
    {
        val=e.target.parentNode.textContent;

        par=e.target.parentNode;
        par.textContent="";
        del=document.createElement("s");
        del.appendChild(document.createTextNode(val));
        console.log(par);
        par.appendChild(e.target);
        par.appendChild(del);
    }
    else
    {
        par = e.target.parentNode
        val = e.target.parentNode.textContent;
        par.textContent = "";
        par.appendChild(e.target);
        par.appendChild(document.createTextNode(val));
    }
}
function DeletAllTask()
{
    ul = document.querySelector(".list-group");
    length=ul.children.length;
    var i=0;
    while(i<length)
    {
        if(ul.children[i] && ul.children[i].firstChild)
        {
            if(ul.children[i].firstChild.checked)
            {    
                ul.removeChild(ul.children[i]);
                storageTasks.splice(i-1,1);
                i--;
            }
        
        }                 
        ++i;
    }
    window.localStorage.setItem('toDoTasks',JSON.stringify(storageTasks));
}
document.querySelector("#toDoForm").addEventListener("submit",addTask);
document.querySelector("#delete").addEventListener("click",DeletAllTask);
storageTasks = JSON.parse(window.localStorage.getItem('toDoTasks'));

console.log(typeof(storageTasks));
if(storageTasks)
{
    console.log(storageTasks.length);
    storageTasks.forEach(element => 
    {
        addTaskInsertHtml(element.taskname);
});
}