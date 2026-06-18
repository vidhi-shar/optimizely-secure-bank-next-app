$key = "ULQH5up4VU5PvSzJhixQsTZKNLlpLHJjBUQrKGnQTLJqr35e"
$body = '{"query":"query { HeroBannerBlock(limit:1) { items { Heading SubHeading BadgeText CtaPrimaryLabel CtaSecondaryLabel Image { url { default } } ImageAltText } } }"}'

Invoke-RestMethod `
  -Uri "https://cg.optimizely.com/content/v2?auth=$key" `
  -Method POST `
  -ContentType "application/json" `
  -Body $body | ConvertTo-Json -Depth 10