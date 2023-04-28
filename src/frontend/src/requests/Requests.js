const url = process.env.NODE_ENV === 'production'? process.env.REACT_APP_BACKEND_URL : process.env.REACT_APP_BACKEND_URL_DEV;

const getResponse = (status, message, data) => {
    return {
        status,
        message,
        data,
    };
}
/**
 * @function getAnswer, sesuai namanya, akan mengambil jawaban berdasar pertanyaan
 * yang disampaikan dari params
 * 
 * @param {String} question - pertanyaan yang disampaikan
 * @param {String} algorithm - jenis algorithm yang digunakan, "BM" atau "KMP"
 * @returns {{status: Number, message: String, data: String}} answer - jawaban dari pertanyaan terkait
 * 
 */
const getAnswer = ({ token, question, algorithm }) => {
    fetch(url + "/queries/answer", {
    method: "GET",
    body: JSON.stringify({
        question : question,
        algorithm : algorithm,
    }),
    headers: {
        "Content-type": "application/json; charset=UTF-8",
        'Authorization': `Bearer ${token}`,
    }
    })
    .then((response) => response.json())
    .then((json) => getResponse(json.status, json.message, json.data))
    .catch((err) => getResponse(err.status, err.message, null))
};

/**
 * @function getPages, meng-capture data pages dari user dengan id tertentu dari user
 * 
 * @param id - id dari pengguna
 * @param token
 * @returns {{status: Number, message: String, data: Array<{convo:Array<{question:String, answer:String, answered: Boolean}>, name:String}>}} 
 * listQuestion - daftar pertanyaan yang pernah diajukan, kalo gaada return
 * array kosong.
 * 
 */
const getPages = ({ token, id }) => {

    fetch(url + "/histories", {
        method: "GET",
        body: JSON.stringify({
            userId: id,
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            'Authorization': `Bearer ${token}`,
        }
        })
        .then((response) => response.json())
        .then((json) => getResponse(json.status, json.message, json.data))
        .catch((err) => getResponse(err.status, err.message, null))
};

// Niatnya nambah ke database data page yang ada
// Kalo misal sebelumnya belum ada, berarti add ke database, kalo udah ada, update
// Proses update dan store nya cuma pas quit aja biar ga bolak balik
// Tapi gatau mau taro mana :") (kalo tau bilang aja)

/**
 * @function storeData - menyimpan data seluruh array pertanyaan sekarang ke database
 * hanya dilakukan kalo user sebelumnya belum terdaftar dan kalo keluar aja
 * 
 * @param id - id dari pengguna
 * @param token - request token
 * @param pages - bentuknya list of object {convo, name}
 * @returns {{status: Number, message: String, data: null}}
 * 
 */
const storeData = ({ token, id, pages }) => {
    fetch(url + `/histories/${id}`, {
        method: "POST",
        body: JSON.stringify({
            pages: pages
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            'Authorization': `Bearer ${token}`,
        }
        })
        .then((response) => response.json())
        .then((json) => getResponse(json.status, json.message, null))
        .catch((err) => getResponse(err.status, err.message, null))
};

/**
 * @function updateData - melakukan update data seluruh array pertanyaan sekarang ke database
 * hanya dilakukan kalo user sudah terdaftar dan kalo keluar aja
 * 
 * @param id - id dari pengguna
 * @param token - request token
 * @returns {{status: Number, message: String, data: null}}
 * 
 */
const updateData = ({ token, id, pages }) => {
    fetch(url + `/histories/${id}`, {
        method: "PUT",
        body: JSON.stringify({
            pages: pages
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            'Authorization': `Bearer ${token}`,
        }
        })
        .then((response) => response.json())
        .then((json) => getResponse(json.status, json.message, null))
        .catch((err) => getResponse(err.status, err.message, null))
};

export { getAnswer, getPages, storeData, updateData } ;