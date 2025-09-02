@echo off
:loop
"node.exe" --trace-deprecation launcher_v2.js
pause
goto loop