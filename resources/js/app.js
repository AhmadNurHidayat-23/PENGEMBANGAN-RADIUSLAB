import { createState, setCorner, setSynchronization, radiusValue, generateCSS } from './radius';

const sliders = [...document.querySelectorAll('input[type="range"][data-index]')];
const sync = document.querySelector('#sync-corners');
const preview = document.querySelector('#preview-shape');
const code = document.querySelector('#css-output');
const copyButton = document.querySelector('#copy-css');
const status = document.querySelector('#status');
let state = createState();
let copyTimer;

function render() {
    clearTimeout(copyTimer);
    copyButton.textContent = '▣ Salin CSS';
    status.textContent = '';
    sliders.forEach((slider, index) => {
        slider.value = String(state.values[index]);
        slider.setAttribute('aria-valuetext', `${state.values[index]} piksel`);
        document.querySelector(`output[for="${slider.id}"]`).value = `${state.values[index]} px`;
    });
    sync.checked = state.synced;
    preview.style.borderRadius = radiusValue(state.values);
    preview.setAttribute('aria-label', `Pratinjau sudut: kiri atas ${state.values[0]}, kanan atas ${state.values[1]}, kanan bawah ${state.values[2]}, kiri bawah ${state.values[3]} piksel.`);
    code.textContent = generateCSS(state.values);
    copyButton.disabled = false;
}

sliders.forEach((slider) => {
    slider.addEventListener('input', () => {
        try {
            state = setCorner(state, Number(slider.dataset.index), slider.value);
            render();
        } catch (error) {
            render();
            status.textContent = error.message;
        }
    });
});

document.querySelector('#radius-form').addEventListener('submit', (event) => event.preventDefault());
sync.addEventListener('change', () => {
    state = setSynchronization(state, sync.checked);
    render();
    status.textContent = state.synced
        ? 'Sinkronisasi aktif. Semua sudut mengikuti nilai kiri atas.'
        : 'Sinkronisasi nonaktif. Setiap sudut dapat diatur secara terpisah.';
});

document.querySelector('#reset-radius').addEventListener('click', () => {
    state = createState();
    render();
    status.textContent = 'Pengaturan dikembalikan ke nilai awal. Sinkronisasi nonaktif.';
});

copyButton.addEventListener('click', async () => {
    const text = generateCSS(state.values);
    try {
        if (!navigator.clipboard?.writeText) throw new Error('clipboard');
        await navigator.clipboard.writeText(text);
        clearTimeout(copyTimer);
        copyButton.textContent = '✓ Berhasil disalin';
        status.textContent = 'Kode CSS berhasil disalin ke papan klip.';
        copyTimer = setTimeout(() => { copyButton.textContent = '▣ Salin CSS'; }, 2200);
    } catch {
        const range = document.createRange();
        range.selectNodeContents(code);
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
        code.parentElement.focus();
        status.textContent = 'Salin otomatis tidak tersedia. Kode dipilih; tekan ⌘C atau Ctrl+C.';
    }
});

render();
