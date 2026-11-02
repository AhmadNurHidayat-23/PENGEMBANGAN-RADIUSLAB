<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="Atur empat sudut elemen secara visual, lihat pratinjau langsung, dan salin kode CSS border-radius. Gratis, tanpa login atau database.">
    <meta name="theme-color" content="#F3F0FF">
    <title>PENGEMBANGAN RADIUSLAB — Generator Border Radius</title>
    <link rel="icon" href="{{ asset('favicon.svg') }}" type="image/svg+xml">
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body>
<header class="shell site-header"><a class="brand" href="{{ route('home') }}" aria-label="RadiusLab, beranda">radiuslab<span>.</span></a><nav aria-label="Navigasi utama"><a href="#editor">Editor radius <span aria-hidden="true">↗</span></a><span class="header-note">Empat sudut. Banyak kemungkinan.</span></nav></header>
<main class="shell">
    <section class="hero" aria-labelledby="headline"><p class="eyebrow"><i aria-hidden="true"></i> EKSPERIMEN KECIL, BENTUK BERBEDA</p><h1 id="headline">Buat Sudut CSS dengan Mudah.</h1><p class="description">Atur lengkungan setiap sudut secara visual dan salin kode CSS secara instan.</p></section>
    <section id="editor" class="workspace" aria-label="Editor border-radius">
        <form id="radius-form" class="controls-panel">
            <div class="panel-heading"><div><p class="step">01 / ATUR SUDUT</p><h2>Mulai dari lengkungannya.</h2></div><span class="unit-tag">0–200 px</span></div>
            <div class="sliders">
                @foreach (['top-left' => 'Kiri atas', 'top-right' => 'Kanan atas', 'bottom-right' => 'Kanan bawah', 'bottom-left' => 'Kiri bawah'] as $corner => $label)
                    <div class="corner-control"><div class="slider-label"><label for="corner-{{ $corner }}"><span aria-hidden="true">0{{ $loop->iteration }}</span> {{ $label }}</label><output id="value-{{ $corner }}" for="corner-{{ $corner }}">0 px</output></div><input type="range" id="corner-{{ $corner }}" data-index="{{ $loop->index }}" min="0" max="200" step="1" value="0" aria-describedby="slider-hint"></div>
                @endforeach
            </div>
            <div class="sync-control"><label for="sync-corners"><input type="checkbox" id="sync-corners"><span>Sinkronkan semua sudut</span><span class="sync-symbol" aria-hidden="true">↔</span></label><p>Saat aktif, satu slider mengatur keempat sudut.</p></div>
            <p class="control-hint" id="slider-hint">Gunakan tombol panah untuk penyesuaian 1 px.</p>
        </form>
        <div class="preview-panel">
            <div class="panel-heading"><div><p class="step">02 / LIHAT BENTUKNYA</p><h2>Lengkungan, langsung terlihat.</h2></div><span class="live"><i aria-hidden="true"></i>Langsung</span></div>
            <div class="preview-stage"><div id="preview-shape" class="preview-shape" role="img" aria-label="Pratinjau elemen dengan empat sudut yang dapat diatur"><span aria-hidden="true">radiuslab.</span></div></div>
            <div class="code-heading"><span>HASIL CSS</span><span aria-hidden="true">↳</span></div>
            <pre class="code-output" tabindex="0" aria-label="Kode CSS border-radius"><code id="css-output">Menyiapkan kode CSS…</code></pre>
            <div class="result-actions"><button type="button" class="primary" id="copy-css" disabled><span aria-hidden="true">▣</span> Salin CSS</button><button type="button" class="reset" id="reset-radius"><span aria-hidden="true">↺</span> Reset</button></div>
            <p class="preview-note">Radius besar mengikuti penyesuaian otomatis browser.</p>
        </div>
    </section>
    <p id="status" class="status" role="status" aria-live="polite"></p>
    <noscript><p class="status">Aktifkan JavaScript untuk mengatur sudut dan menyalin CSS.</p></noscript>
</main>
<footer class="shell"><p>PENGEMBANGAN RADIUSLAB</p><span>Atur. Amati. Terapkan. <i aria-hidden="true">↗</i></span></footer>
</body>
</html>
