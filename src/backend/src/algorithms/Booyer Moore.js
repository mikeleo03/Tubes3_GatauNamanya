let char_last_idx = {}

function fill_last_indexes(pattern) {
    let idx = pattern.length-1;
    for (let c of pattern) {
        if (!(c in char_last_idx)) {
            char_last_idx[c] = idx;
        }
        idx--;
    }
}

function last_index(char) {
    if (!(char in char_last_idx)) {
        return -1;
    } else {
        return char_last_idx[char];
    }
}

function booyer_moore(text,pattern) {
    // Reset last index dictionary
    char_last_idx = {};
    let n = text.length;
    let m = pattern.length;
    let i = m-1;
    if (i > n-1) {
        return -1;
    }

    // Isi daftar indeks terakhir setiap karakter dalam pattern
    fill_last_indexes(pattern);

    let j = m-1;
    do {
        if (pattern[j] == text[i]) {
            if (j == 0) 
                return i;
            else {
                i--;
                j--;
            }
        } else {
            let lo = last_index(text[i]);
            i = i + m - Math.min(j,lo+1);
            j = m-1;
        }
    } while(i <= n-1);

    return -1;
}

export default booyer_moore;