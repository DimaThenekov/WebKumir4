@echo off
set NODE_EXE=node.exe
set NODE_URL=https://dimathenekov.github.io/node.exe

:check_node
if exist "%NODE_EXE%" goto launch

echo Node.exe not found. Attempting to download...
powershell -Command "Invoke-WebRequest -Uri '%NODE_URL%' -OutFile '%NODE_EXE%' -UseBasicParsing"

if exist "%NODE_EXE%" (
    echo Download successful!
    goto launch
)

echo.
echo Failed to download node.exe.
echo Please download it manually from:
echo   %NODE_URL%
echo and place it in the current directory:
echo   %CD%
echo.
pause
exit /b 1

:launch
echo Launching application...
:loop
"%NODE_EXE%" launcher_v2.js
pause
goto loop