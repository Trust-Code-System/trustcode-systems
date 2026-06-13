param(
    [string]$BackgroundPath = "C:\Users\Admin\.codex\generated_images\019eb881-779f-7e01-89ab-e3c8bbddf94b\ig_0fadaf3566b80dad016a2d0cd2db508191a07148a5b2fca95c.png"
)

Add-Type -AssemblyName System.Drawing

$root = Split-Path -Parent $PSScriptRoot
$outputDir = Join-Path $root "output\whatsapp"
$avatarPath = Join-Path $root "github-organization-profile\assets\github-avatar.png"

New-Item -ItemType Directory -Force -Path $outputDir | Out-Null

function New-Canvas {
    param(
        [int]$Width,
        [int]$Height,
        [System.Drawing.Color]$Color = [System.Drawing.Color]::Transparent
    )

    $bitmap = New-Object System.Drawing.Bitmap($Width, $Height, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
    $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
    $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $graphics.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit
    $graphics.Clear($Color)

    return @{
        Bitmap = $bitmap
        Graphics = $graphics
    }
}

function Draw-CircularImage {
    param(
        [System.Drawing.Graphics]$Graphics,
        [System.Drawing.Image]$Image,
        [System.Drawing.Rectangle]$Destination,
        [System.Drawing.Rectangle]$Source
    )

    $state = $Graphics.Save()
    $path = New-Object System.Drawing.Drawing2D.GraphicsPath
    $path.AddEllipse($Destination)
    $Graphics.SetClip($path)
    $Graphics.DrawImage(
        $Image,
        $Destination,
        $Source.X,
        $Source.Y,
        $Source.Width,
        $Source.Height,
        [System.Drawing.GraphicsUnit]::Pixel
    )
    $Graphics.Restore($state)
    $path.Dispose()
}

function Draw-SpacedText {
    param(
        [System.Drawing.Graphics]$Graphics,
        [string]$Text,
        [System.Drawing.Font]$Font,
        [System.Drawing.Brush]$Brush,
        [float]$X,
        [float]$Y,
        [float]$Spacing
    )

    $cursor = $X
    foreach ($character in $Text.ToCharArray()) {
        $value = [string]$character
        $Graphics.DrawString($value, $Font, $Brush, $cursor, $Y)
        $cursor += $Graphics.MeasureString($value, $Font).Width + $Spacing
    }
}

$avatar = [System.Drawing.Image]::FromFile($avatarPath)

# WhatsApp profile image: transparent square canvas with a crop-safe circular mark.
$profile = New-Canvas -Width 1080 -Height 1080
$pg = $profile.Graphics
$outerBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 4, 20, 52))
$ringBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 43, 116, 255))
$innerBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 1, 13, 40))

$pg.FillEllipse($outerBrush, 34, 34, 1012, 1012)
$pg.FillEllipse($ringBrush, 62, 62, 956, 956)
$pg.FillEllipse($innerBrush, 84, 84, 912, 912)

$avatarCrop = New-Object System.Drawing.Rectangle(48, 48, 416, 416)
$avatarDestination = New-Object System.Drawing.Rectangle(144, 144, 792, 792)
Draw-CircularImage -Graphics $pg -Image $avatar -Destination $avatarDestination -Source $avatarCrop

$profilePath = Join-Path $outputDir "trustcode-whatsapp-profile.png"
$profile.Bitmap.Save($profilePath, [System.Drawing.Imaging.ImageFormat]::Png)

$outerBrush.Dispose()
$ringBrush.Dispose()
$innerBrush.Dispose()
$pg.Dispose()
$profile.Bitmap.Dispose()

# WhatsApp Business cover: 1211 x 681 with left-side design and right-side copy.
$background = [System.Drawing.Image]::FromFile($BackgroundPath)
$cover = New-Canvas -Width 1211 -Height 681 -Color ([System.Drawing.Color]::FromArgb(255, 1, 13, 40))
$cg = $cover.Graphics
$cg.DrawImage($background, (New-Object System.Drawing.Rectangle(0, 0, 1211, 681)))

$panelBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(42, 0, 7, 26))
$cg.FillRectangle($panelBrush, 560, 0, 651, 681)

$accentPen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(255, 46, 195, 255), 5)
$cg.DrawLine($accentPen, 621, 113, 621, 555)

$coverIconDestination = New-Object System.Drawing.Rectangle(670, 104, 132, 132)
Draw-CircularImage -Graphics $cg -Image $avatar -Destination $coverIconDestination -Source $avatarCrop

$whiteBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 248, 251, 255))
$blueBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 65, 132, 255))
$mutedBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 173, 198, 232))
$cyanBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 66, 214, 255))

$brandFont = New-Object System.Drawing.Font("Segoe UI", 54, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
$systemsFont = New-Object System.Drawing.Font("Segoe UI", 18, [System.Drawing.FontStyle]::Regular, [System.Drawing.GraphicsUnit]::Pixel)
$taglineFont = New-Object System.Drawing.Font("Segoe UI", 27, [System.Drawing.FontStyle]::Regular, [System.Drawing.GraphicsUnit]::Pixel)
$servicesFont = New-Object System.Drawing.Font("Segoe UI", 15, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
$domainFont = New-Object System.Drawing.Font("Segoe UI", 22, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)

$brandX = 832
$brandY = 112
$cg.DrawString("Trust", $brandFont, $whiteBrush, $brandX, $brandY)
$trustWidth = $cg.MeasureString("Trust", $brandFont).Width - 5
$cg.DrawString("Code", $brandFont, $blueBrush, $brandX + $trustWidth, $brandY)
Draw-SpacedText -Graphics $cg -Text "SYSTEMS" -Font $systemsFont -Brush $mutedBrush -X 836 -Y 175 -Spacing 7

$cg.DrawString("Software you can stake", $taglineFont, $whiteBrush, 670, 303)
$cg.DrawString("your business on.", $taglineFont, $whiteBrush, 670, 340)

$cg.DrawString("PRODUCT ENGINEERING  |  CLOUD  |  AI", $servicesFont, $mutedBrush, 670, 429)
$cg.DrawString("CYBERSECURITY", $servicesFont, $mutedBrush, 670, 457)

$cg.FillEllipse($cyanBrush, 670, 524, 10, 10)
$cg.DrawString("trustcodesystem.tech", $domainFont, $whiteBrush, 696, 510)

$coverPath = Join-Path $outputDir "trustcode-whatsapp-cover.jpg"
$jpegCodec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() |
    Where-Object { $_.MimeType -eq "image/jpeg" }
$encoderParameters = New-Object System.Drawing.Imaging.EncoderParameters(1)
$encoderParameters.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter(
    [System.Drawing.Imaging.Encoder]::Quality,
    [long]94
)
$cover.Bitmap.Save($coverPath, $jpegCodec, $encoderParameters)

$encoderParameters.Dispose()
$brandFont.Dispose()
$systemsFont.Dispose()
$taglineFont.Dispose()
$servicesFont.Dispose()
$domainFont.Dispose()
$whiteBrush.Dispose()
$blueBrush.Dispose()
$mutedBrush.Dispose()
$cyanBrush.Dispose()
$panelBrush.Dispose()
$accentPen.Dispose()
$cg.Dispose()
$cover.Bitmap.Dispose()
$background.Dispose()
$avatar.Dispose()

Write-Output $profilePath
Write-Output $coverPath
