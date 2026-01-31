$file = "components\IndexContent.tsx"
$content = Get-Content $file -Raw
# Replace opacity: '0' with opacity: '1'
$newContent = $content -replace "opacity: '0'", "opacity: '1'"

if ($content -ne $newContent) {
    $newContent | Set-Content -Path $file -Encoding UTF8 -NoNewline
    Write-Host "Fixed opacity in $file"
} else {
    Write-Host "No opacity changes needed in $file"
}
