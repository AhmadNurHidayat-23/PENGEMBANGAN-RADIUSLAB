<?php

namespace Tests\Feature;

use Illuminate\Support\Facades\DB;
use Tests\TestCase;

class RadiusLabTest extends TestCase
{
    public function test_editor_is_available_without_database_queries(): void
    {
        DB::listen(function (): void {
            $this->fail('Editor tidak boleh mengakses database.');
        });

        $response = $this->get('/')
            ->assertOk()
            ->assertSee('lang="id"', false)
            ->assertSee('Buat Sudut CSS dengan Mudah.')
            ->assertSee('Sinkronkan semua sudut')
            ->assertSee('Salin CSS')
            ->assertSee('Reset');

        $this->assertSame(4, substr_count($response->getContent(), 'type="range"'));
        $this->assertSame(4, substr_count($response->getContent(), 'min="0" max="200" step="1"'));
    }

    public function test_blade_keeps_scripts_and_styles_separate(): void
    {
        $blade = file_get_contents(resource_path('views/radiuslab.blade.php'));

        $this->assertStringNotContainsString('<script', $blade);
        $this->assertStringNotContainsString('<style', $blade);
        $this->assertDoesNotMatchRegularExpression('/\\s(?:style|on\\w+)\\s*=/i', $blade);
    }

    public function test_design_uses_only_the_three_requested_color_bases(): void
    {
        $css = file_get_contents(resource_path('css/app.css'));
        preg_match_all('/#[a-f0-9]{6}\\b/i', $css, $hex);
        $colors = array_values(array_unique(array_map(strtolower(...), $hex[0])));

        $this->assertEqualsCanonicalizing(['#f3f0ff', '#4b36d1', '#d8f27a'], $colors);

        preg_match_all('/rgba?\\(\\s*(\\d+)\\s*,\\s*(\\d+)\\s*,\\s*(\\d+)/i', $css, $rgb, PREG_SET_ORDER);
        foreach ($rgb as $color) {
            $this->assertSame([75, 54, 209], array_map(intval(...), array_slice($color, 1, 3)));
        }
    }
}
