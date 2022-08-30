
let table = document.querySelector('#table');
let items = document.querySelectorAll('#pagination li');
var div = document.querySelector(".information");
let notesOnPage = 10;
let delete1 = document.getElementById("clear").addEventListener("click",clear);

function clear(){
    div.innerHTML = '';
}


fetch('https://jsonplaceholder.typicode.com/posts')
        .then((response) => response.json())
        .then(function (json) {
            for(let index =  0; index<100; index++){
                let stroka = +json[index].userId + ' ' + json[index].id + ' ' + json[index].title + ' ' + json[index].body;
                console.log(stroka);
                function choosing(){
                    let val1 = document.getElementById("search").value;
                    let num = stroka.indexOf(val1);
                    if(num!=-1){
                            div.innerHTML += `
                                <div class = "card">
                                    <h3 class="card-title">userId: ${json[index].userId}</h3>
                                    <h3 class="card-text">id: ${json[index].id}</h3>
                                    <h4 class="card-title">title: ${json[index].title}</h3>
                                    <p class="card-text">body: ${json[index].body}</p>
                                </div>
                        `
                        }
                    
                }

                let submit1 = document.getElementById("submit").addEventListener("click",choosing);
            }
            })
            


for(let item of items){ //функция и цикл для пагинации
    item.addEventListener('click',function(){
        let active = document.querySelector('#pagination li.active');
        if (active){
            active.classList.remove('active');
        }
        this.classList.add('active');
        let pageNum = +this.innerHTML;
        let start = (pageNum - 1) * notesOnPage;
        let end = start + notesOnPage;
        fetch('https://jsonplaceholder.typicode.com/posts')
        .then((response) => response.json())
        .then(function (json) {
            // console.log(json);
            let notes = json.slice(start,end);

            table.innerHTML = '';

            for(let note of notes){
                let tr = document.createElement('tr');
                table.appendChild(tr);

                let td;

                td = document.createElement('td');
                td.innerHTML = note.userId;
                tr.appendChild(td);

                td = document.createElement('td');
                td.innerHTML = note.id;
                tr.appendChild(td);

                td = document.createElement('td');
                td.innerHTML = note.title;
                tr.appendChild(td);

                td = document.createElement('td');
                td.innerHTML = note.body;
                tr.appendChild(td);
            }
            
            
            
        })
        
    });
}





