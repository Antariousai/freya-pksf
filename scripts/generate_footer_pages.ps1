$ErrorActionPreference = 'Stop'

$workspace = Split-Path -Parent $PSScriptRoot
$preferredSource = 'C:\Users\DELL\Downloads\Footer Copies\files (6)'
$fallbackSource = Join-Path $workspace '_footer_import\files (6)'
$sourceDir = if (Test-Path $preferredSource) { $preferredSource } else { $fallbackSource }

if (-not (Test-Path $sourceDir)) {
  throw "Footer source directory not found."
}

$pageMap = [ordered]@{
  'company-about.md'               = 'company-about.html'
  'company-contact.md'             = 'company-contact.html'
  'company-legal.md'               = 'company-legal.html'
  'company-partnerships.md'        = 'company-partnerships.html'
  'faq-comprehensive.md'           = 'faq-comprehensive.html'
  'resources-documentation.md'     = 'resources-documentation.html'
  'resources-help-centre.md'       = 'resources-help-center.html'
  'resources-partner-programme.md' = 'resources-partner-programme.html'
  'resources-webinars.md'          = 'resources-webinars.html'
  'trust-audit-trail.md'           = 'trust-audit-trail.html'
  'trust-human-approval.md'        = 'trust-human-approval.html'
  'trust-role-based-control.md'    = 'trust-role-based-control.html'
  'trust-security.md'              = 'trust-security.html'
}

function Fix-Mojibake {
  param([string]$Text)
  return ($Text -replace '\r\n?', "`n")
}

function Resolve-EmailReplacement {
  param([string]$LocalPart)

  switch ($LocalPart.ToLowerInvariant()) {
    'hello' { return 'the Antarious team' }
    'partnerships' { return 'the partnerships team' }
    'security' { return 'the security team' }
    'legal' { return 'the legal team' }
    'support' { return 'the support team' }
    default { return 'the relevant team' }
  }
}

function Sanitize-Emails {
  param([string]$Text)

  $Text = [regex]::Replace($Text, '\r\n?', "`n")
  $Text = [regex]::Replace($Text, '(?im)^\*\*Email:\*\*.*$', '**Contact channel:** Available on request')
  $Text = [regex]::Replace($Text, '(?im)^\*\*Report to:\*\*.*$', '**Report to:** Available on request')
  $Text = [regex]::Replace($Text, '(?im)^\*\*Secondary CTA:\*\*.*$', '**Secondary CTA:** Contact channel available on request')
  $Text = [regex]::Replace($Text, '(?im)^\*\*Headquarters:\*\*\s*$', '')
  $Text = [regex]::Replace($Text, '(?im)^\*\*Registered Entity:\*\*\s*$', '')
  $Text = [regex]::Replace($Text, '(?im)^\*\*Company Registration:\*\*\s*$', '')
  $Text = [regex]::Replace($Text, '(?im)^\*\*Antarious AI Limited\*\*\s*$', '')
  $Text = [regex]::Replace($Text, '(?im)^\[Address\s*[^\]]*\]\s*$', '')
  $Text = [regex]::Replace($Text, '(?im)^\[Legal entity details\s*[^\]]*\]\s*$', '')
  $Text = [regex]::Replace($Text, '(?im)^\[Registered address\s*[^\]]*\]\s*$', '')
  $Text = [regex]::Replace($Text, '(?im)^\[Registration number\s*[^\]]*\]\s*$', '')
  $Text = [regex]::Replace($Text, '(?im)^Company Registration:\s*\[[^\]]+\]\s*$', '')
  $Text = [regex]::Replace($Text, '(?im)^Registered in England and Wales\s*$', '')
  $Text = [regex]::Replace($Text, '(?im)^.*antarious\.ai/legal.*$', '')
  $Text = [regex]::Replace($Text, '\([^)]*[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}[^)]*\)', '')
  $Text = [regex]::Replace(
    $Text,
    '([A-Za-z0-9._%+-]+)@antarious\.ai',
    {
      param($match)
      Resolve-EmailReplacement $match.Groups[1].Value
    }
  )

  return $Text
}

function Get-AnchorId {
  param([string]$Heading)

  if ($Heading -match '^Section\s+(\d{2})') {
    return "section-$($matches[1])"
  }

  $slug = $Heading.ToLowerInvariant()
  $slug = $slug -replace '[^a-z0-9]+', '-'
  $slug = $slug.Trim('-')

  if ([string]::IsNullOrWhiteSpace($slug)) {
    return 'section'
  }

  return $slug
}

function Resolve-PlaceholderHref {
  param(
    [string]$PageName,
    [string]$Label
  )

  switch -Regex ($Label) {
    'Documentation' { return 'resources-documentation.html' }
    'Webinars' { return 'resources-webinars.html' }
    'FAQ' { return 'faq-comprehensive.html' }
    'Security' { return 'trust-security.html' }
    'Human Approval' { return 'trust-human-approval.html' }
    'Audit Trail' { return 'trust-audit-trail.html' }
    'Role-Based Control' { return 'trust-role-based-control.html' }
    'Request a Demo' { return 'index.html#cta' }
    'Request a Briefing' { return 'index.html#cta' }
    'Partnership Programme' { return 'resources-partner-programme.html' }
    'Partnerships page' { return 'company-partnerships.html' }
    'Help Centre' { return 'resources-help-center.html' }
    default { return '#' }
  }
}

function Convert-InlineMarkdown {
  param(
    [string]$Text,
    [string]$PageName
  )

  $encoded = [System.Net.WebUtility]::HtmlEncode($Text.Trim())

  $encoded = [regex]::Replace(
    $encoded,
    '\[(.+?)\]\((.+?)\)',
    {
      param($match)
      $label = $match.Groups[1].Value
      $href = $match.Groups[2].Value
      if ($href -eq '#') {
        $href = Resolve-PlaceholderHref -PageName $PageName -Label $label
      }
      if ($href -eq '#') {
        return "<span class=""disabled-link"">$label</span>"
      }
      return "<a href=""$href"">$label</a>"
    }
  )

  $encoded = [regex]::Replace($encoded, '\*\*(.+?)\*\*', '<strong>$1</strong>')
  $encoded = [regex]::Replace($encoded, '(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)', '<em>$1</em>')

  return $encoded
}

function Convert-MarkdownToBody {
  param(
    [string]$Text,
    [string]$PageName,
    [hashtable]$Meta
  )

  $lines = $Text -split "`n"
  $builder = New-Object System.Text.StringBuilder
  $paragraph = New-Object System.Collections.Generic.List[string]
  $listItems = New-Object System.Collections.Generic.List[string]
  $tableLines = New-Object System.Collections.Generic.List[string]
  $codeLines = New-Object System.Collections.Generic.List[string]
  $sectionOpen = $false
  $inCtaSection = $false
  $inPageHeader = $false
  $inCodeBlock = $false
  $seenTitle = $false
  $seenSubtitle = $false

  function Is-TableLine {
    param([string]$Line)
    $trimmed = $Line.Trim()
    if ([string]::IsNullOrWhiteSpace($trimmed)) { return $false }
    return $trimmed.StartsWith('|') -and $trimmed.EndsWith('|')
  }

  function Is-SeparatorRow {
    param([string]$Line)
    $trimmed = $Line.Trim()
    if (-not (Is-TableLine $trimmed)) { return $false }
    $parts = $trimmed.Trim('|').Split('|')
    foreach ($part in $parts) {
      $cell = $part.Trim()
      if ($cell -notmatch '^:?-{3,}:?$') {
        return $false
      }
    }
    return $true
  }

  function Flush-Paragraph {
    param($ParagraphRef, $BuilderRef, [string]$CurrentPage)
    if ($ParagraphRef.Count -eq 0) { return }
    $content = ($ParagraphRef | ForEach-Object { Convert-InlineMarkdown -Text $_ -PageName $CurrentPage }) -join '<br>'
    if ($content -match '^<strong>.*</strong>$') {
      [void]$BuilderRef.AppendLine("<p class=""callout-line"">$content</p>")
    } else {
      [void]$BuilderRef.AppendLine("<p>$content</p>")
    }
    $ParagraphRef.Clear()
  }

  function Flush-Code {
    param($CodeRef, $BuilderRef)
    if ($CodeRef.Count -eq 0) { return }
    $encoded = [System.Net.WebUtility]::HtmlEncode(($CodeRef -join "`n").Trim())
    [void]$BuilderRef.AppendLine('<pre class="search-mock" style="white-space:pre-wrap;margin-top:0">' + $encoded + '</pre>')
    $CodeRef.Clear()
  }

  function Flush-List {
    param($ListRef, $BuilderRef, [string]$CurrentPage)
    if ($ListRef.Count -eq 0) { return }
    [void]$BuilderRef.AppendLine('<ul>')
    foreach ($item in $ListRef) {
      $content = Convert-InlineMarkdown -Text $item -PageName $CurrentPage
      [void]$BuilderRef.AppendLine("<li>$content</li>")
    }
    [void]$BuilderRef.AppendLine('</ul>')
    $ListRef.Clear()
  }

  function Flush-Table {
    param($TableRef, $BuilderRef, [string]$CurrentPage)
    if ($TableRef.Count -lt 2) {
      $TableRef.Clear()
      return
    }

    $rows = @($TableRef)
    $headerCells = $rows[0].Trim().Trim('|').Split('|') | ForEach-Object { $_.Trim() }
    $startIndex = 1
    if ($rows.Count -gt 1 -and (Is-SeparatorRow $rows[1])) {
      $startIndex = 2
    }

    [void]$BuilderRef.AppendLine('<div style="overflow-x:auto"><table style="width:100%;border-collapse:collapse;font-size:14px">')
    [void]$BuilderRef.AppendLine('<thead><tr>')
    foreach ($cell in $headerCells) {
      $content = Convert-InlineMarkdown -Text $cell -PageName $CurrentPage
      [void]$BuilderRef.AppendLine('<th style="text-align:left;padding:10px;border:1px solid rgba(15,23,42,.12);background:#F8FBFF">' + $content + '</th>')
    }
    [void]$BuilderRef.AppendLine('</tr></thead>')
    [void]$BuilderRef.AppendLine('<tbody>')

    for ($rowIndex = $startIndex; $rowIndex -lt $rows.Count; $rowIndex++) {
      $cells = $rows[$rowIndex].Trim().Trim('|').Split('|') | ForEach-Object { $_.Trim() }
      [void]$BuilderRef.AppendLine('<tr>')
      foreach ($cell in $cells) {
        $content = Convert-InlineMarkdown -Text $cell -PageName $CurrentPage
        [void]$BuilderRef.AppendLine('<td style="padding:10px;border:1px solid rgba(15,23,42,.12);vertical-align:top">' + $content + '</td>')
      }
      [void]$BuilderRef.AppendLine('</tr>')
    }

    [void]$BuilderRef.AppendLine('</tbody></table></div>')
    $TableRef.Clear()
  }

  foreach ($rawLine in $lines) {
    $line = $rawLine.TrimEnd()
    $trimmed = $line.Trim()

    if ($trimmed -eq '```') {
      if ($inCodeBlock) {
        Flush-Code -CodeRef $codeLines -BuilderRef $builder
        $inCodeBlock = $false
      } else {
        Flush-Paragraph -ParagraphRef $paragraph -BuilderRef $builder -CurrentPage $PageName
        Flush-List -ListRef $listItems -BuilderRef $builder -CurrentPage $PageName
        Flush-Table -TableRef $tableLines -BuilderRef $builder -CurrentPage $PageName
        $inCodeBlock = $true
      }
      continue
    }

    if ($inCodeBlock) {
      $codeLines.Add($line)
      continue
    }

    if (-not $seenTitle -and $trimmed -match '^#\s+(.+)$') {
      $Meta['DocumentTitle'] = $matches[1]
      $seenTitle = $true
      continue
    }

    if (-not $seenSubtitle -and $trimmed -match '^###\s+(.+)$') {
      $Meta['DocumentSubtitle'] = $matches[1]
      $seenSubtitle = $true
      continue
    }

    if ($trimmed -eq '---') {
      Flush-Paragraph -ParagraphRef $paragraph -BuilderRef $builder -CurrentPage $PageName
      Flush-List -ListRef $listItems -BuilderRef $builder -CurrentPage $PageName
      Flush-Table -TableRef $tableLines -BuilderRef $builder -CurrentPage $PageName
      continue
    }

    if ($trimmed -match '^##\s+Page Header$') {
      Flush-Paragraph -ParagraphRef $paragraph -BuilderRef $builder -CurrentPage $PageName
      Flush-List -ListRef $listItems -BuilderRef $builder -CurrentPage $PageName
      Flush-Table -TableRef $tableLines -BuilderRef $builder -CurrentPage $PageName
      $inPageHeader = $true
      continue
    }

    if ($trimmed -match '^##\s+(.+)$') {
      Flush-Paragraph -ParagraphRef $paragraph -BuilderRef $builder -CurrentPage $PageName
      Flush-List -ListRef $listItems -BuilderRef $builder -CurrentPage $PageName
      Flush-Table -TableRef $tableLines -BuilderRef $builder -CurrentPage $PageName
      if ($sectionOpen) {
        [void]$builder.AppendLine('</section>')
      }
      $inPageHeader = $false
      $heading = $matches[1]
      if ($heading -eq 'CTA Block') {
        $inCtaSection = $true
        $sectionOpen = $false
        continue
      }
      $inCtaSection = $false
      $anchor = Get-AnchorId $heading
      [void]$builder.AppendLine("<section class=""doc-section"" id=""$anchor"">")
      [void]$builder.AppendLine("<h2>$([System.Net.WebUtility]::HtmlEncode($heading))</h2>")
      $sectionOpen = $true
      continue
    }

    if ($inPageHeader) {
      continue
    }

    if ($inCtaSection) {
      continue
    }

    if (Is-TableLine $trimmed) {
      Flush-Paragraph -ParagraphRef $paragraph -BuilderRef $builder -CurrentPage $PageName
      Flush-List -ListRef $listItems -BuilderRef $builder -CurrentPage $PageName
      $tableLines.Add($trimmed)
      continue
    }

    if ($tableLines.Count -gt 0) {
      Flush-Table -TableRef $tableLines -BuilderRef $builder -CurrentPage $PageName
    }

    if ([string]::IsNullOrWhiteSpace($trimmed)) {
      Flush-Paragraph -ParagraphRef $paragraph -BuilderRef $builder -CurrentPage $PageName
      Flush-List -ListRef $listItems -BuilderRef $builder -CurrentPage $PageName
      continue
    }

    if ($trimmed -eq '**') {
      continue
    }

    if ($trimmed -match '^>\s+(.+)$') {
      Flush-Paragraph -ParagraphRef $paragraph -BuilderRef $builder -CurrentPage $PageName
      Flush-List -ListRef $listItems -BuilderRef $builder -CurrentPage $PageName
      [void]$builder.AppendLine('<p class="search-mock" style="margin-top:0">' + [System.Net.WebUtility]::HtmlEncode($matches[1]) + '</p>')
      continue
    }

    if ($trimmed -match '^####\s+(.+)$') {
      Flush-Paragraph -ParagraphRef $paragraph -BuilderRef $builder -CurrentPage $PageName
      Flush-List -ListRef $listItems -BuilderRef $builder -CurrentPage $PageName
      [void]$builder.AppendLine("<h3>$([System.Net.WebUtility]::HtmlEncode($matches[1]))</h3>")
      continue
    }

    if ($trimmed -match '^#\s+(.+?)(?:\s*\{#([a-z0-9\-]+)\})?$') {
      Flush-Paragraph -ParagraphRef $paragraph -BuilderRef $builder -CurrentPage $PageName
      Flush-List -ListRef $listItems -BuilderRef $builder -CurrentPage $PageName
      $hText = [System.Net.WebUtility]::HtmlEncode($matches[1])
      $anchor = $matches[2]
      if ($anchor) {
        [void]$builder.AppendLine('<h3 id="' + $anchor + '">' + $hText + '</h3>')
      } else {
        [void]$builder.AppendLine("<h3>$hText</h3>")
      }
      continue
    }

    if ($trimmed -match '^\*\[Search bar.+placeholder text:\s+"([^"]+)"\]\*$') {
      Flush-Paragraph -ParagraphRef $paragraph -BuilderRef $builder -CurrentPage $PageName
      Flush-List -ListRef $listItems -BuilderRef $builder -CurrentPage $PageName
      $placeholder = [System.Net.WebUtility]::HtmlEncode($matches[1])
      [void]$builder.AppendLine("<div class=""search-mock"">$placeholder</div>")
      continue
    }

    if ($trimmed -match '^###\s+(.+)$') {
      Flush-Paragraph -ParagraphRef $paragraph -BuilderRef $builder -CurrentPage $PageName
      Flush-List -ListRef $listItems -BuilderRef $builder -CurrentPage $PageName
      [void]$builder.AppendLine("<h3>$([System.Net.WebUtility]::HtmlEncode($matches[1]))</h3>")
      continue
    }

    if ($trimmed -match '^- (.+)$') {
      Flush-Paragraph -ParagraphRef $paragraph -BuilderRef $builder -CurrentPage $PageName
      $listItems.Add($matches[1])
      continue
    }

    $paragraph.Add($trimmed)
  }

  Flush-Paragraph -ParagraphRef $paragraph -BuilderRef $builder -CurrentPage $PageName
  Flush-List -ListRef $listItems -BuilderRef $builder -CurrentPage $PageName
  Flush-Table -TableRef $tableLines -BuilderRef $builder -CurrentPage $PageName
  Flush-Code -CodeRef $codeLines -BuilderRef $builder

  if ($sectionOpen) {
    [void]$builder.AppendLine('</section>')
  }

  return $builder.ToString()
}

function Get-HeroMeta {
  param([string]$Text)

  $meta = @{}
  foreach ($field in @('Section Label', 'Page Title', 'Tagline', 'Supporting Statement')) {
    $pattern = "\*\*$([regex]::Escape($field)):\*\*\s*(.+)"
    $match = [regex]::Match($Text, $pattern)
    if ($match.Success) {
      $meta[$field] = $match.Groups[1].Value.Trim()
    }
  }
  return $meta
}

function Build-PageHtml {
  param(
    [string]$OutputName,
    [hashtable]$Meta,
    [string]$BodyHtml
  )

  $sectionLabel = if ($Meta['Section Label']) { $Meta['Section Label'] } elseif ($Meta['DocumentSubtitle']) { $Meta['DocumentSubtitle'] } else { '' }
  $sectionLabel = $sectionLabel -replace '(?i)antarious\s*ai', ''
  $sectionLabel = $sectionLabel -replace '^[\s\p{P}\p{S}]+', ''
  $sectionLabel = $sectionLabel -replace '[\s\p{P}\p{S}]+$', ''
  $sectionLabel = $sectionLabel.Trim()
  $pageTitle = if ($Meta['Page Title']) { $Meta['Page Title'] } elseif ($Meta['DocumentTitle']) { $Meta['DocumentTitle'] } else { 'Antarious' }
  $tagline = if ($Meta['Tagline']) { Convert-InlineMarkdown -Text $Meta['Tagline'] -PageName $OutputName } else { '' }
  $supporting = if ($Meta['Supporting Statement']) { Convert-InlineMarkdown -Text $Meta['Supporting Statement'] -PageName $OutputName } else { '' }
  $htmlTitle = [System.Net.WebUtility]::HtmlEncode("$pageTitle | Antarious")

  return @"
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>$htmlTitle</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700;800;900&family=DM+Sans:wght@400;500;700&family=DM+Mono:wght@500;700&display=swap" rel="stylesheet">
  <style>
    :root{--bg:#F8FBFF;--card:#FFFFFF;--ink:#0F172A;--ink2:#334155;--ink3:#64748B;--line:rgba(15,23,42,.08);--teal:#0EA5E9;--teal2:#0284C7;--glow:rgba(14,165,233,.12)}
    *{box-sizing:border-box}
    body{margin:0;font-family:"DM Sans",sans-serif;background:linear-gradient(180deg,#FFFFFF 0%,#F8FBFF 100%);color:var(--ink);line-height:1.75}
    a{text-decoration:none;color:var(--teal2)}
    .shell{min-height:100vh}
    .topbar{position:sticky;top:0;z-index:10;display:flex;align-items:center;justify-content:space-between;padding:18px 24px;background:rgba(255,255,255,.9);backdrop-filter:blur(18px);border-bottom:1px solid var(--line)}
    .brand{display:flex;align-items:center;gap:12px;font-family:"Outfit",sans-serif;font-weight:800;color:var(--ink)}
    .brand img{height:28px;width:auto;display:block}
    .top-actions{display:flex;gap:10px;flex-wrap:wrap}
    .top-link,.top-cta{font-family:"Outfit",sans-serif;font-size:13px;border-radius:12px;padding:9px 16px;transition:all .2s}
    .top-link{color:var(--ink2);border:1px solid rgba(14,165,233,.14);background:linear-gradient(135deg,rgba(14,165,233,.08),rgba(255,255,255,.02))}
    .top-cta{color:#fff;background:linear-gradient(135deg,var(--teal),var(--teal2));border:1px solid transparent;box-shadow:0 8px 22px rgba(14,165,233,.18)}
    .wrap{max-width:1120px;margin:0 auto;padding:40px 24px 72px}
    .hero{padding:28px 0 26px}
    .eyebrow{display:inline-flex;align-items:center;gap:8px;font-family:"DM Mono",monospace;font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:var(--teal2);margin-bottom:16px}
    .eyebrow::before{content:"";width:16px;height:1.5px;background:var(--teal2)}
    h1{font-family:"Outfit",sans-serif;font-size:clamp(34px,5vw,62px);line-height:.98;letter-spacing:-2px;margin:0 0 16px}
    .tagline{font-family:"Outfit",sans-serif;font-size:clamp(18px,2.1vw,28px);font-weight:700;line-height:1.28;color:var(--ink2);max-width:860px;margin:0 0 14px}
    .support{max-width:840px;color:var(--ink3);font-size:16px}
    .doc{display:grid;gap:18px}
    .doc-section{background:var(--card);border:1px solid var(--line);border-radius:28px;padding:28px;box-shadow:0 18px 46px rgba(15,23,42,.05)}
    .doc-section h2{font-family:"Outfit",sans-serif;font-size:22px;line-height:1.1;letter-spacing:-.6px;margin:0 0 18px}
    .doc-section h3{font-family:"Outfit",sans-serif;font-size:17px;line-height:1.25;letter-spacing:-.4px;margin:20px 0 10px;color:var(--ink)}
    .doc-section p{margin:0 0 14px;color:var(--ink2);font-size:15px}
    .doc-section ul{margin:0 0 10px;padding-left:20px;color:var(--ink2)}
    .doc-section li{margin:0 0 9px}
    .doc-section strong{color:var(--ink)}
    .callout-line{font-family:"Outfit",sans-serif;font-weight:700;color:var(--teal2)!important}
    .search-mock{margin:0 0 16px;padding:14px 16px;border-radius:16px;border:1px solid rgba(14,165,233,.18);background:linear-gradient(135deg,rgba(14,165,233,.08),rgba(255,255,255,.92));color:var(--ink3)}
    .disabled-link{color:var(--teal2);font-weight:600}
    .footer-nav{margin-top:34px;display:flex;gap:12px;flex-wrap:wrap}
    .footer-nav a{font-family:"Outfit",sans-serif;font-size:13px;font-weight:700;border-radius:999px;padding:9px 14px;border:1px solid var(--line);background:#fff;color:var(--ink2)}
    @media(max-width:720px){
      .topbar{padding:16px 18px;align-items:flex-start;flex-direction:column;gap:12px}
      .wrap{padding:28px 18px 54px}
      .doc-section{padding:22px}
      .top-actions{width:100%}
    }
  </style>
</head>
<body>
  <div class="shell">
    <div class="topbar">
      <a class="brand" href="index.html"><img src="assets/logos/antarious-main.svg" alt="Antarious"></a>
      <div class="top-actions">
        <a class="top-link" href="index.html">Platform</a>
        <a class="top-link" href="freya.html">Meet Freya</a>
        <a class="top-cta" href="index.html#cta">Request Demo</a>
      </div>
    </div>
    <main class="wrap">
      <header class="hero">
        <div class="eyebrow">$([System.Net.WebUtility]::HtmlEncode($sectionLabel))</div>
        <h1>$([System.Net.WebUtility]::HtmlEncode($pageTitle))</h1>
        <p class="tagline">$tagline</p>
        <p class="support">$supporting</p>
      </header>
      <div class="doc">
$BodyHtml
      </div>
      <div class="footer-nav">
        <a href="index.html">Back to Platform</a>
        <a href="freya.html">Explore Freya</a>
        <a href="faq-comprehensive.html">Read the FAQ</a>
      </div>
    </main>
  </div>
</body>
</html>
"@
}

foreach ($sourceName in $pageMap.Keys) {
  $sourcePath = Join-Path $sourceDir $sourceName
  if (-not (Test-Path $sourcePath)) {
    throw "Missing source file: $sourcePath"
  }

  $raw = Get-Content $sourcePath -Raw -Encoding UTF8
  $normalized = Fix-Mojibake $raw
  $sanitized = Sanitize-Emails $normalized
  $meta = Get-HeroMeta $sanitized
  $body = Convert-MarkdownToBody -Text $sanitized -PageName $pageMap[$sourceName] -Meta $meta
  $html = Build-PageHtml -OutputName $pageMap[$sourceName] -Meta $meta -BodyHtml $body
  $destination = Join-Path $workspace $pageMap[$sourceName]
  Set-Content -LiteralPath $destination -Value $html -Encoding UTF8
}

Write-Host "Generated $($pageMap.Count) footer content pages from $sourceDir"
