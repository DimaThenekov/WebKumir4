@echo off
:loop
"node.exe" --trace-deprecation launcher_v1.js
pause
goto loop