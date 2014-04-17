
var
    // Load native UI library
    gui = require('nw.gui'),

    // browser window object
    win = gui.Window.get(),

    // os object
    os = require('os'),

    // path object
    path = require('path'),

    // fs object
    fs = require('fs'),

    // url object
    url = require('url'),

    isWin;


isWin = (process.platform === 'win32');
isLinux = (process.platform === 'linux');
isOSX = (process.platform === 'darwin');

BUTTON_ORDER = ['close', 'min', 'max'];

if (isWin)   { BUTTON_ORDER = ['min', 'max', 'close']; }
if (isLinux) { BUTTON_ORDER = ['min', 'max', 'close']; }
if (isOSX)   { BUTTON_ORDER = ['close', 'min', 'max']; }

// render header buttons
$("#header").html(_.template($('#header-tpl').html(), {buttons: BUTTON_ORDER}));

// Global App skeleton for backbone
var App = {
  Controller: {},
  View: {},
  Model: {},
  Page: {}
};

// Set the app title (for Windows mostly)
win.title = 'Clear Reader';

// Focus the window when the app opens
win.focus();

/**
 * Show 404 page on uncaughtException
 */
process.on('uncaughtException', function(err) {
    if (console) {
        console.log(err);
    }
});

// Cria o banco de dados
/*var db = openDatabase('clear-reader', '1.0', 'Banco de dados do Clear Reader', 2 * 1024 * 1024);

db.transaction(function (tx) {
  
  tx.executeSql('CREATE TABLE IF NOT EXISTS subscriptions (id unique, title, url)');      
      
      tx.executeSql('SELECT * FROM subscriptions', [], function (tx, results) {
      
        var len = results.rows.length, i;
        
        if(len > 0 && results !== ''){

            for (i = 0; i < len; i++) {
              alert(results.rows.item(i).text);
            }

        }else{

            console.log('entrou no else');

            

        }

        

      });

});*/



/*if( ! Settings.get('userData') ) {
    $('.app-login').removeClass('hidden');

    win.open('http://google.com');

    $('.popcorn-disclaimer .btn.confirmation.continue').click(function(event){
        event.preventDefault();
        userTracking.event('App Disclaimer', 'Accepted', navigator.language.toLowerCase() ).send();
        Settings.set('disclaimerAccepted', 1);
        $('.popcorn-disclaimer').addClass('hidden');
    });
    
}*/
