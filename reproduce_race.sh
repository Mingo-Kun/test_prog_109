#!/bin/bash

# Base URL
BASE_URL="http://localhost:3000/api/checkout"

# Tenant and Product
TENANT="brand-a"
PRODUCT="p1"
# p1 has 10 stock initially.

echo "Starting Race Condition Test..."
echo "Target: $TENANT / $PRODUCT"

# Function to make a checkout request
checkout() {
  curl -s -X POST "$BASE_URL" \
    -H "Content-Type: application/json" \
    -d "{\"tenantId\": \"$TENANT\", \"productId\": \"$PRODUCT\", \"quantity\": 1}" &
}

# Launch 15 concurrent requests (Stock is 10)
for i in {1..15}; do
  checkout
done

wait
echo ""
echo "All requests sent. Check server logs or product page to see if stock went below 0."
