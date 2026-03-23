$ErrorActionPreference = 'Stop'

$imageName = 'disperson-fast'
$containerName = 'disperson-local-fast'
$slowContainerName = 'disperson-dev'
$port = 8000
$assetVersion = Get-Date -Format 'yyyyMMddHHmmss'

Write-Host "Stopping slow local container if it is using port $port..."
$slowContainerId = docker ps -aq --filter "name=^${slowContainerName}$"
if ($slowContainerId) {
    docker stop $slowContainerName | Out-Null
}

Write-Host "Removing previous fast container..."
$existingFastContainerId = docker ps -aq --filter "name=^${containerName}$"
if ($existingFastContainerId) {
    docker rm -f $containerName | Out-Null
}

Write-Host "Building fast local image..."
docker build -t $imageName .

Write-Host "Starting fast local container on http://127.0.0.1:$port ..."
docker run -d --rm `
    --name $containerName `
    -p "${port}:80" `
    -e APP_ENV=prod `
    -e APP_DEBUG=0 `
    -e APP_SECRET=local-fast-secret `
    -e DATABASE_URL=sqlite:////var/www/html/var/data.db `
    -e MAILER_DSN=null://null `
    -e MESSENGER_TRANSPORT_DSN=sync:// `
    -e ASSET_VERSION=$assetVersion `
    -e AUTO_MIGRATE=1 `
    -e APP_SEED_DEMO=1 `
    $imageName | Out-Null

Write-Host "Waiting for container warmup..."
Start-Sleep -Seconds 4

$result = curl.exe -o NUL -s -w "code=%{http_code} start=%{time_starttransfer} total=%{time_total}" "http://127.0.0.1:$port/"
Write-Host "Local fast backend ready: $result"
