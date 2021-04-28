let agenda = document.getElementsByClassName( 'agenda' )[0];
let btn = document.getElementById( 'btnAdd' );

agenda.addEventListener( 'click', action, false );
btn.addEventListener( 'click', insert, false );

list();

function insert() {
    let tarefa = document.getElementById( 'tarefa' );
    tarefas = [];

    if ( localStorage.getItem( 'tarefas' ) ) {
        tarefas = localStorage.getItem( 'tarefas' );
        tarefas = JSON.parse( tarefas );
    }

    tarefas.push( { descricao: tarefa.value, confirma: false } );
    localStorage.setItem( 'tarefas', JSON.stringify( tarefas) );

    tarefa.value = '';
    tarefa.focus();

    list();
}

let lastTarget = null;

function action( e ) {
    let target = e.target;
    let id;

    e.preventDefault(); 

    id = target.dataset.id;

    if( ( innerWidth < 968 && lastTarget === id ) || ( innerWidth >= 968 ) ) {
        if ( target.classList.contains( 'btn-delete' ) ) {
            remove( id );
        }
    
        if ( target.classList.contains( 'btn-confirm' ) ) {
            confirm( id );    
        }
    }
    
    lastTarget = id;
}

function load() {
    let tarefas = localStorage.getItem( 'tarefas' );
    tarefas = JSON.parse( tarefas );
    
    return tarefas;
}

function save( tarefas ) {
    localStorage.setItem( 'tarefas', JSON.stringify( tarefas ) );
}

function remove( id ) {
    let tarefas = load();
    tarefas.splice( id, 1 );
    
    save( tarefas );
    
    list();
}

function confirm( id ) {
    tarefas = load();  
        
    tarefas[ id ].confirma = true;
    save( tarefas );
     
    list();
}


function list() {
    let msg = '';
    
    if ( localStorage.getItem( 'tarefas' ) ) {
        let tarefas, tam;

        tarefas = load();
        tam = tarefas.length;

        for ( let i = 0; i < tam; i += 1 ) {
                msg += '<p tableIndex="' + i + '">' + tarefas[i].descricao + '<a href="#" class="btn btn-confirm" data-show="' + tarefas[i].confirma +'" data-id="' + i + '">V</a><a href="#" class="btn btn-delete" data-id="' + i + '">X</a></p>';
        }
    }
    
    agenda.innerHTML = msg;
}