@echo off
REM Create project directory structure

REM Create app directories
mkdir src\app\(auth)\login
mkdir src\app\(auth)\register
mkdir src\app\(auth)\forgot-password
mkdir src\app\dashboard
mkdir src\app\(years)\seconde\[theme]
mkdir src\app\(years)\premiere\[theme]
mkdir src\app\(years)\terminale\[theme]
mkdir src\app\exercises\[id]
mkdir src\app\subscription
mkdir src\app\api\auth
mkdir src\app\api\user
mkdir src\app\api\progress
mkdir src\app\api\subscription

REM Create component directories
mkdir src\components\layout
mkdir src\components\auth
mkdir src\components\dashboard
mkdir src\components\math
mkdir src\components\exercises

REM Create lib directories
mkdir src\lib\firebase
mkdir src\lib\utils
mkdir src\lib\types

REM Create other directories
mkdir src\hooks
mkdir src\context

REM Create data directories
mkdir src\data\seconde
mkdir src\data\premiere
mkdir src\data\terminale

echo Directory structure created successfully.