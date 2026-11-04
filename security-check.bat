@echo off
chcp 65001 >nul

net session >nul 2>&1

if %errorlevel% neq 0 (
    echo 管理者権限で実行してください。
    timeout /t 3 /nobreak >nul
    powershell -NoProfile -Command "Start-Process -FilePath '%~f0' -Verb RunAs"
    exit /b
)

powershell -NoProfile -Command "$s='NDRHQzc3eUI0NEs3NDRLdDQ0T2w0NE9xNDRPRzQ0S2o0NEtzNDRPUTQ0R2c3N3lCQ3VPRGplT0RnK09EaU9PQmkrT0NpZU9EZ09PQ3B1T0RzK09EcmVPRHZPT0RpZU9CbCtPQm4ySmhkT09EbGVPQ29lT0NwT09EcStPQ2t1ZWl1dWlxamVlRW9lT0JsK09CcCtPQmwrT0JpK09DZ3VldW9lZVFodWlBaGVhb3FlbVprT09CcCtXdW4raWhqT09CbWVPQ2krT0JxT09CaStPQ291T0RtKys4bndyamdaUGpnb3pqZ1l6amdxYmpncVRqZzZ2amdybmpnYTdtaVl2bGo2UGpnYURqZ2FQamdaL2pnb3JqZ1puamdvdmpnb2pqZzd3SzVyQ1g0NEtTNDRHazQ0R1I0NEtJNDRHRzQ0R3Q='; [Text.Encoding]::UTF8.GetString([Convert]::FromBase64String([Text.Encoding]::UTF8.GetString([Convert]::FromBase64String($s))))"

chcp 65001 >nul

echo このファイルは30秒後に自動で消失します。
echo 停止するなら Ctrl + C を押してください。
echo.

:: 30秒のカウントダウン
for /l %%i in (30, -1, 1) do (
    echo 残り %%i 秒...
    timeout /t 1 /nobreak >nul
)

echo.
echo 時間切れです。ファイルを削除します...

(goto) 2>nul & del "%~f0"