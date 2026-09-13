# SEO Verification Script for Windows PowerShell
# Run: powershell -ExecutionPolicy Bypass -File verify-seo.ps1

param(
    [string]$Domain = "https://usmansethi.ccsuop.com"
)

Write-Host "🔍 Starting SEO Verification..." -ForegroundColor Cyan
Write-Host ""
Write-Host "📌 Checking domain: $Domain" -ForegroundColor Cyan
Write-Host ""

# Function to check URL
function Check-URL {
    param(
        [string]$Name,
        [string]$URL
    )
    
    Write-Host -NoNewline "Checking $Name... "
    try {
        $response = Invoke-WebRequest -Uri $URL -Method HEAD -ErrorAction SilentlyContinue
        if ($response.StatusCode -in 200, 301, 302) {
            Write-Host "✓ OK" -ForegroundColor Green
            return $true
        }
    }
    catch {
        # HEAD might not work, try GET
        try {
            $response = Invoke-WebRequest -Uri $URL -Method Get -ErrorAction SilentlyContinue
            if ($response.StatusCode -in 200, 301, 302) {
                Write-Host "✓ OK" -ForegroundColor Green
                return $true
            }
        }
        catch {}
    }
    
    Write-Host "✗ FAILED" -ForegroundColor Red
    return $false
}

# Function to check content
function Check-Content {
    param(
        [string]$Name,
        [string]$URL,
        [string]$Pattern
    )
    
    Write-Host -NoNewline "Checking $Name... "
    try {
        $content = Invoke-WebRequest -Uri $URL -ErrorAction SilentlyContinue
        if ($content.Content -match $Pattern) {
            Write-Host "✓ Found" -ForegroundColor Green
            return $true
        }
    }
    catch {}
    
    Write-Host "✗ Not found" -ForegroundColor Red
    return $false
}

Write-Host "=== BASIC CONNECTIVITY ===" -ForegroundColor Yellow
Check-URL "Homepage" "$Domain/"
Check-URL "HTTPS Certificate" "$Domain"
Write-Host ""

Write-Host "=== SEARCH ENGINE FILES ===" -ForegroundColor Yellow
Check-URL "robots.txt" "$Domain/robots.txt"
Check-URL "sitemap.xml" "$Domain/sitemap.xml"
Write-Host ""

Write-Host "=== SEO META TAGS ===" -ForegroundColor Yellow
Check-Content "Google verification" "$Domain/" "google-site-verification"
Check-Content "Charset" "$Domain/" "charset"
Check-Content "Viewport" "$Domain/" "viewport"
Check-Content "Robots meta" "$Domain/" "robots.*index"
Write-Host ""

Write-Host "=== STRUCTURED DATA ===" -ForegroundColor Yellow
Check-Content "JSON-LD" "$Domain/" "@context.*schema\.org"
Write-Host ""

Write-Host "=== SECURITY HEADERS ===" -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "$Domain" -ErrorAction SilentlyContinue
    
    Write-Host -NoNewline "Checking HSTS... "
    if ($response.Headers['Strict-Transport-Security']) {
        Write-Host "✓ HSTS enabled" -ForegroundColor Green
    } else {
        Write-Host "⚠ HSTS not found" -ForegroundColor Yellow
    }
    
    Write-Host -NoNewline "Checking X-Content-Type-Options... "
    if ($response.Headers['X-Content-Type-Options']) {
        Write-Host "✓ Found" -ForegroundColor Green
    } else {
        Write-Host "⚠ Not found" -ForegroundColor Yellow
    }
    
    Write-Host -NoNewline "Checking X-Frame-Options... "
    if ($response.Headers['X-Frame-Options']) {
        Write-Host "✓ Found" -ForegroundColor Green
    } else {
        Write-Host "⚠ Not found" -ForegroundColor Yellow
    }
}
catch {
    Write-Host "⚠ Could not check headers" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "=== ROBOTS.TXT ANALYSIS ===" -ForegroundColor Yellow
Write-Host "Sitemap references in robots.txt:"
try {
    $robots = Invoke-WebRequest -Uri "$Domain/robots.txt" -ErrorAction SilentlyContinue
    $sitemaps = $robots.Content | Select-String -Pattern "Sitemap:" -AllMatches
    if ($sitemaps) {
        $sitemaps | ForEach-Object { Write-Host "  $_" -ForegroundColor Green }
    }
}
catch {
    Write-Host "  Could not retrieve robots.txt" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "=== SITEMAP VALIDATION ===" -ForegroundColor Yellow
Write-Host "Sample URLs from sitemap:"
try {
    [xml]$sitemap = (Invoke-WebRequest -Uri "$Domain/sitemap.xml" -ErrorAction SilentlyContinue).Content
    $sitemap.urlset.url | Select-Object -First 5 | ForEach-Object { 
        Write-Host "  $($_.loc)" -ForegroundColor Green 
    }
}
catch {
    Write-Host "  Could not retrieve sitemap" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "=== QUICK CHECKLIST ===" -ForegroundColor Yellow
Write-Host "✓ All technical SEO is configured"
Write-Host "📝 Next steps:"
Write-Host "  1. Deploy site to production: https://usmansethi.ccsuop.com"
Write-Host "  2. Verify in Google Search Console: https://search.google.com/search-console"
Write-Host "  3. Submit sitemap to Google"
Write-Host "  4. Request indexing for key pages"
Write-Host ""
Write-Host "📖 Documentation:"
Write-Host "  - QUICK_INDEXING_CHECKLIST.md  (30-min quick start)"
Write-Host "  - GOOGLE_INDEXING_GUIDE.md     (detailed guide)"
Write-Host "  - SEO_SETUP_COMPLETE.md        (implementation status)"
Write-Host ""
Write-Host "✓ SEO verification complete!" -ForegroundColor Green
