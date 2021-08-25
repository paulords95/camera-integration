
@echo off

set CHROME_EXE=c:\Program Files (x86)\Google\Chrome\Application\chrome.exe

set CHROME_SETTINGS=
set CHROME_SETTINGS=%CHROME_SETTINGS% --window-size=660,650
set CHROME_SETTINGS=%CHROME_SETTINGS% --app=http://qcolweb01.quimtia.net.br:3000/webcam/%1/%2

start "" "%CHROME_EXE%" %CHROME_SETTINGS%