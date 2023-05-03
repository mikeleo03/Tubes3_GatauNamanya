function fill_last_indexes(pattern) {
    let char_last_idx = {};
    let idx = 0;
    for (let c of pattern) {
        char_last_idx[c] = idx;
        idx++;
    }
    return char_last_idx;
}

function booyer_moore(text,pattern) {
    // Isi daftar indeks terakhir setiap karakter dalam pattern
    let char_last_index = fill_last_indexes(pattern);
    let n = text.length;
    let m = pattern.length;
    let i = m-1;
    if (i > n-1) {
        return -1;
    }

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
            let lo = -1;
            if (text[i] in char_last_index) {
                lo = char_last_index[text[i]];
            }
            i = i + m - Math.min(j,lo+1);
            j = m-1;
        }
    } while(i <= n-1);

    return -1;
}

export default booyer_moore;