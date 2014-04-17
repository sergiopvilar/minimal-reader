$('.btn-os.max').on('click', function () {
    if(win.isFullscreen){
      win.toggleFullscreen();
    }else{
      if (screen.availHeight <= win.height) {
        win.unmaximize();
      }
      else {
          win.maximize();
      }
    }
  });

  $('.btn-os.min').on('click', function () {
    win.minimize();
  });

  $('.btn-os.close').on('click', function () {
    win.close();
  });
