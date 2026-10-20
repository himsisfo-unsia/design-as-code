$ErrorActionPreference = 'Continue'
$root = $PSScriptRoot
$out = Join-Path $root 'export'
New-Item -ItemType Directory -Force $out | Out-Null
$edge = 'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe'
$ids = 'poster-single','carousel-1','carousel-2','carousel-3'
foreach ($id in $ids) {
  $url = "file:///$(($root -replace '\\','/'))/index.html?only=$id"
  $png = Join-Path $out "$id.png"
  & $edge --headless=new --disable-gpu --hide-scrollbars --force-device-scale-factor=1 --window-size=1080,1350 --virtual-time-budget=8000 --user-data-dir="$env:TEMP\edge-hl" --screenshot="$png" $url 2>$null | Out-Null
  Write-Output "$id -> $((Get-Item $png).Length) bytes"
}
