/**
 * @function getAnswer, sesuai namanya, akan mengambil jawaban berdasar pertanyaan
 * yang disampaikan dari params
 * 
 * @param {String} question - pertanyaan yang disampaikan
 * @param {String} algorithm - jenis algorithm yang digunakan, "BM" atau "KMP"
 * @returns {String} answer - jawaban dari pertanyaan terkait
 * 
 */
const getAnswer = ({ question, algorithm }) => {
    fetch("http://localhost:5000/answer", {
    method: "GET",
    body: JSON.stringify({
        question : "haha"
    }),
    headers: {
        "Content-type": "application/json; charset=UTF-8"
    }
    })
    .then((response) => response.json())
    .then((json) => console.log(json));
};

/**
 * @function getPages, meng-capture data pages dari user dengan id tertentu dari user
 * 
 * @param id - id dari pengguna
 * @param token
 * @returns {Array} listQuestion - daftar pertanyaan yang pernah diajukan, kalo gaada return
 * array kosong.
 * 
 */
const getPages = ({ token, id }) => {
    let listQuestion = [];

    return listQuestion;
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
 * @param token - if needed, klo ga hapus aja
 * @param pages - bentuknya list of pair (convo, name)
 * 
 */
const storeData = ({ token, id, pages }) => {

    
};

/**
 * @function updateData - melakukan update data seluruh array pertanyaan sekarang ke database
 * hanya dilakukan kalo user sudah terdaftar dan kalo keluar aja
 * 
 * @param id - id dari pengguna
 * @param token - if needed, klo ga hapus aja
 * 
 */
const updateData = ({ token, id, pages }) => {

    
};

export { getAnswer, getPages, storeData, updateData } ;