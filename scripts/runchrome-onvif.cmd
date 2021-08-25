
@echo off

set CHROME_EXE=c:\Program Files (x86)\Google\Chrome\Application\chrome.exe

set CHROME_SETTINGS=
set CHROME_SETTINGS=%CHROME_SETTINGS% --window-size=1050,600
set CHROME_SETTINGS=%CHROME_SETTINGS% --app=http://qcolweb01.quimtia.net.br:3000/placa-frente/%1/%2

start "" "%CHROME_EXE%" %CHROME_SETTINGS%