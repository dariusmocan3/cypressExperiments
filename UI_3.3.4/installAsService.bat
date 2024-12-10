sc create eController.WebUI binPath= %~dp0eController.WebUI.exe
sc failure eController.WebUI actions= restart/60000/restart/60000/""/60000 reset= 86400
sc start eController.WebUI
sc config eController.WebUI start=auto
pause