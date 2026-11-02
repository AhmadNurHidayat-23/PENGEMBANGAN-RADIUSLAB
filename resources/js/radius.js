export const MIN_RADIUS = 0;
export const MAX_RADIUS = 200;

export function createState() {
    return { values: [64, 128, 32, 128], synced: false };
}

export function validateRadius(raw) {
    const validType = typeof raw === 'number'
        || (typeof raw === 'string' && /^\d+$/.test(raw.trim()));
    const value = validType ? Number(raw) : NaN;
    if (!Number.isInteger(value) || value < MIN_RADIUS || value > MAX_RADIUS) {
        throw new RangeError('Gunakan nilai sudut berupa bilangan bulat 0–200 px.');
    }
    return value;
}

export function setCorner(state, index, raw) {
    if (!Number.isInteger(index) || index < 0 || index > 3) {
        throw new RangeError('Pilih salah satu dari empat sudut.');
    }
    const value = validateRadius(raw);
    return {
        ...state,
        values: state.synced ? Array(4).fill(value)
            : state.values.map((current, corner) => corner === index ? value : current),
    };
}

export function setSynchronization(state, enabled) {
    if (typeof enabled !== 'boolean') throw new TypeError('Pengaturan sinkronisasi tidak valid.');
    return {
        synced: enabled,
        values: enabled ? Array(4).fill(validateRadius(state.values[0])) : [...state.values],
    };
}

export function radiusValue(values) {
    if (!Array.isArray(values) || values.length !== 4) {
        throw new RangeError('Empat nilai sudut diperlukan untuk menghasilkan CSS.');
    }
    return values.map((value) => `${validateRadius(value)}px`).join(' ');
}

export function generateCSS(values) {
    return `border-radius: ${radiusValue(values)};`;
}
