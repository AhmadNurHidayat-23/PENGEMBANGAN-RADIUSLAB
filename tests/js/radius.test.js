import test from 'node:test';
import assert from 'node:assert/strict';
import { createState, validateRadius, setCorner, setSynchronization, radiusValue, generateCSS } from '../../resources/js/radius.js';

test('generator memakai urutan CSS kiri atas, kanan atas, kanan bawah, kiri bawah', () => {
    assert.equal(generateCSS([10, 20, 30, 40]), 'border-radius: 10px 20px 30px 40px;');
    assert.equal(radiusValue([10, 20, 30, 40]), '10px 20px 30px 40px');
});

test('semua bilangan bulat dalam rentang slider diterima', () => {
    for (let value = 0; value <= 200; value++) {
        assert.equal(validateRadius(value), value);
        assert.equal(validateRadius(String(value)), value);
        assert.equal(generateCSS(Array(4).fill(value)),
            `border-radius: ${value}px ${value}px ${value}px ${value}px;`);
    }
});

test('nilai kosong, pecahan, di luar batas, dan CSS yang disisipkan ditolak', () => {
    for (const value of ['', ' ', null, undefined, true, [], {}, -1, 201, 1.5,
        NaN, Infinity, '12px', '1e2', '0; color: lime', 'url(test)']) {
        assert.throws(() => validateRadius(value), RangeError);
    }
    assert.throws(() => generateCSS([1, 2, 3]), RangeError);
    assert.throws(() => generateCSS([1, 2, 3, 201]), RangeError);
    assert.throws(() => generateCSS('10px'), RangeError);
});

test('mode terpisah hanya mengubah satu sudut dan mempertahankan state sebelumnya', () => {
    const initial = createState();
    const changed = setCorner(initial, 2, 200);
    assert.deepEqual(changed.values, [64, 128, 200, 128]);
    assert.deepEqual(initial.values, [64, 128, 32, 128]);
    assert.equal(changed.synced, false);
});

test('mengaktifkan sinkronisasi memakai nilai kiri atas saat ini', () => {
    const independent = setCorner(createState(), 0, 75);
    const synced = setSynchronization(independent, true);
    assert.deepEqual(synced, { values: [75, 75, 75, 75], synced: true });
    assert.deepEqual(independent.values, [75, 128, 32, 128]);
});

test('setiap slider mengubah seluruh sudut ketika sinkronisasi aktif', () => {
    for (let index = 0; index < 4; index++) {
        const synced = setSynchronization(createState(), true);
        assert.deepEqual(setCorner(synced, index, 0).values, [0, 0, 0, 0]);
        assert.deepEqual(setCorner(synced, index, 200).values, [200, 200, 200, 200]);
    }
});

test('mematikan sinkronisasi menjaga nilai sebelum perubahan berikutnya', () => {
    const synced = setCorner(setSynchronization(createState(), true), 3, 150);
    const independent = setSynchronization(synced, false);
    assert.deepEqual(independent.values, [150, 150, 150, 150]);
    assert.deepEqual(setCorner(independent, 1, 20).values, [150, 20, 150, 150]);
    assert.throws(() => setSynchronization(independent, 'true'), TypeError);
    assert.throws(() => setCorner(independent, 4, 100), RangeError);
});

test('reset menghasilkan nilai awal baru dan sinkronisasi nonaktif', () => {
    const changed = setCorner(setSynchronization(createState(), true), 0, 200);
    const reset = createState();
    assert.deepEqual(reset, { values: [64, 128, 32, 128], synced: false });
    reset.values[0] = 0;
    assert.equal(createState().values[0], 64);
    assert.equal(changed.values[0], 200);
});
