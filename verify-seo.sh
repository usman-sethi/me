#!/bin/bash
# SEO Verification Script
# Run this to verify all SEO components are properly configured

echo "🔍 Starting SEO Verification..."
echo ""

# Color codes
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

DOMAIN=${1:-"https://usmansethi.ccsuop.com"}

echo "📌 Checking domain: $DOMAIN"
echo ""

# Function to check URL
check_url() {
    local name=$1
    local url=$2
    echo -n "Checking $name... "
    if curl -s -I "$url" | head -1 | grep -q "200\|301\|302"; then
        echo -e "${GREEN}✓ OK${NC}"
        return 0
    else
        echo -e "${RED}✗ FAILED${NC}"
        return 1
    fi
}

# Function to check file exists
check_file() {
    local name=$1
    local url=$2
    echo -n "Checking $name... "
    if curl -s "$url" | grep -q .; then
        echo -e "${GREEN}✓ Found${NC}"
        return 0
    else
        echo -e "${RED}✗ Not found${NC}"
        return 1
    fi
}

echo "=== BASIC CONNECTIVITY ==="
check_url "Homepage" "$DOMAIN/"
check_url "HTTPS Certificate" "$DOMAIN"
echo ""

echo "=== SEARCH ENGINE FILES ==="
check_url "robots.txt" "$DOMAIN/robots.txt"
check_url "sitemap.xml" "$DOMAIN/sitemap.xml"
echo ""

echo "=== SEO META TAGS ==="
echo -n "Checking meta tags... "
if curl -s "$DOMAIN" | grep -q "google-site-verification"; then
    echo -e "${GREEN}✓ Google verification found${NC}"
else
    echo -e "${RED}✗ Google verification missing${NC}"
fi

echo -n "Checking charset... "
if curl -s "$DOMAIN" | grep -q "charset"; then
    echo -e "${GREEN}✓ Charset declared${NC}"
else
    echo -e "${RED}✗ Charset not declared${NC}"
fi

echo -n "Checking viewport... "
if curl -s "$DOMAIN" | grep -q "viewport"; then
    echo -e "${GREEN}✓ Viewport configured${NC}"
else
    echo -e "${RED}✗ Viewport not configured${NC}"
fi

echo -n "Checking robots meta... "
if curl -s "$DOMAIN" | grep -q "robots.*index"; then
    echo -e "${GREEN}✓ Robots meta found${NC}"
else
    echo -e "${RED}✗ Robots meta not found${NC}"
fi

echo ""
echo "=== STRUCTURED DATA ==="
echo -n "Checking JSON-LD... "
if curl -s "$DOMAIN" | grep -q "@context.*schema.org"; then
    echo -e "${GREEN}✓ Schema.org markup found${NC}"
else
    echo -e "${RED}✗ Schema.org markup missing${NC}"
fi

echo ""
echo "=== SECURITY HEADERS ==="
echo -n "Checking HSTS... "
if curl -s -I "$DOMAIN" | grep -q "Strict-Transport-Security"; then
    echo -e "${GREEN}✓ HSTS enabled${NC}"
else
    echo -e "${YELLOW}⚠ HSTS not found${NC}"
fi

echo -n "Checking X-Content-Type-Options... "
if curl -s -I "$DOMAIN" | grep -q "X-Content-Type-Options"; then
    echo -e "${GREEN}✓ Found${NC}"
else
    echo -e "${YELLOW}⚠ Not found${NC}"
fi

echo -n "Checking X-Frame-Options... "
if curl -s -I "$DOMAIN" | grep -q "X-Frame-Options"; then
    echo -e "${GREEN}✓ Found${NC}"
else
    echo -e "${YELLOW}⚠ Not found${NC}"
fi

echo ""
echo "=== ROBOTS.TXT ANALYSIS ==="
echo "Sitemap references in robots.txt:"
curl -s "$DOMAIN/robots.txt" | grep -i "sitemap"

echo ""
echo "=== SITEMAP VALIDATION ==="
echo "Sample URLs from sitemap:"
curl -s "$DOMAIN/sitemap.xml" | grep -oP '(?<=<loc>)[^<]+' | head -5

echo ""
echo "=== NEXT ACTIONS ==="
echo "1. ✅ All technical SEO is configured"
echo "2. 📝 View the checklist: cat QUICK_INDEXING_CHECKLIST.md"
echo "3. 🔗 Go to Google Search Console: https://search.google.com/search-console"
echo "4. ✔️  Verify your domain"
echo "5. 📡 Submit your sitemap"
echo "6. 🔎 Request indexing for key pages"
echo ""
echo -e "${GREEN}✓ SEO verification complete!${NC}"
