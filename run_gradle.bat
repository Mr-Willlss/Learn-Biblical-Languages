@echo off
setlocal
set "JAVA_HOME=C:\Users\Samuel Williams\.bubblewrap\jdk\jdk-17.0.11+9"
set "ANDROID_SDK_ROOT=C:\Users\Samuel Williams\.bubblewrap\android_sdk"
cd /d "%~dp0twa"
"%~dp0twa\gradlew.bat" app:assembleRelease --stacktrace > "%~dp0twa\gradle_run.out" 2>&1
echo %ERRORLEVEL% > "%~dp0twa\gradle_run.code"
endlocal
