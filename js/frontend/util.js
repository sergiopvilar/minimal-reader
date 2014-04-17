// Cria a função de retorno pros models
function Retorno(){

    this.callback_error = false;
    this.callback_success = false;

    this.done = function(a){
        if(typeof a === 'function'){
            this.callback_success = a;
        }else{
            this.callback_success(a);
        }
    };

    this.error = function(a){
        if(typeof a === 'function'){
            this.callback_error = a;
        }else{
            this.callback_error(a);
        }
    }

};