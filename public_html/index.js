const kuvapalat = [
    'assets/1.jpg',
    'assets/2.jpg',
    'assets/3.jpg',
    'assets/4.jpg',
    'assets/5.jpg',
    'assets/6.jpg',
    'assets/7.jpg',
    'assets/8.jpg',
    'assets/9.jpg',
]

function hanki_sattumanvarainen_numero(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

function shufflee(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function hanki_tamanhetkinen_jarjestys() {
    const srct = document.getElementsByClassName("palanen")
    return Array.from(srct).map(palanen => {
        return palanen.src.substring(palanen.src.length - kuvapalat[0].length)
    })
}

function mock_roska() {
    return kuvapalat
}

function onko_peli_lapi() {
    if (JSON.stringify(kuvapalat) === JSON.stringify(hanki_tamanhetkinen_jarjestys())) {
        voitto()
    }
    else {
        console.log("Ei vielä valmis")
    }
}

const VASEN = 37
const YLOS = 38
const OIKEALLE = 39
const ALAS = 40

const kielto_laki = {
    [VASEN]: [0, 3, 6],
    [YLOS]: [0, 1, 2],
    [OIKEALLE]: [2, 5, 8],
    [ALAS]: [6, 7, 8]
}

let nakymaton_pala_nimi = ''

function siirra_palaa(nappain) {
    const palasen_sijainti_indeksi = hanki_tamanhetkinen_jarjestys().indexOf(nakymaton_pala_nimi)
    if (kielto_laki[nappain].includes(palasen_sijainti_indeksi)) {
        return
    }
    if (nappain === YLOS) {
        const uusi_jarjestys = hanki_tamanhetkinen_jarjestys()
        temp = uusi_jarjestys[palasen_sijainti_indeksi - 3]
        uusi_jarjestys[palasen_sijainti_indeksi - 3] = uusi_jarjestys[palasen_sijainti_indeksi]
        uusi_jarjestys[palasen_sijainti_indeksi] = temp
        piirra_palaset(uusi_jarjestys)
    }
    if (nappain === ALAS) {
        const uusi_jarjestys = hanki_tamanhetkinen_jarjestys()
        temp = uusi_jarjestys[palasen_sijainti_indeksi + 3]
        uusi_jarjestys[palasen_sijainti_indeksi + 3] = uusi_jarjestys[palasen_sijainti_indeksi]
        uusi_jarjestys[palasen_sijainti_indeksi] = temp
        piirra_palaset(uusi_jarjestys)
    }
    if (nappain === OIKEALLE) {
        const uusi_jarjestys = hanki_tamanhetkinen_jarjestys()
        temp = uusi_jarjestys[palasen_sijainti_indeksi + 1]
        uusi_jarjestys[palasen_sijainti_indeksi + 1] = uusi_jarjestys[palasen_sijainti_indeksi]
        uusi_jarjestys[palasen_sijainti_indeksi] = temp
        piirra_palaset(uusi_jarjestys)
    }
    if (nappain === VASEN) {
        const uusi_jarjestys = hanki_tamanhetkinen_jarjestys()
        temp = uusi_jarjestys[palasen_sijainti_indeksi - 1]
        uusi_jarjestys[palasen_sijainti_indeksi - 1] = uusi_jarjestys[palasen_sijainti_indeksi]
        uusi_jarjestys[palasen_sijainti_indeksi] = temp
        piirra_palaset(uusi_jarjestys)

    }
    onko_peli_lapi()
}

function aloitus_asetelma() {
    sekoitetut_kuvapalat = shufflee(kuvapalat)
    const piilotettava_palanen = hanki_sattumanvarainen_numero(0, kuvapalat.length - 1)
    nakymaton_pala_nimi = sekoitetut_kuvapalat[piilotettava_palanen]
    piirra_palaset(sekoitetut_kuvapalat)
}

function piirra_palaset(kuvapalat) {
    const kulmio = document.getElementById("kulmio")
    while (kulmio.firstChild) {
        kulmio.removeChild(kulmio.firstChild)
    }
    kuvapalat.forEach(kuvapala => {
        const palanen = document.createElement('img')
        palanen.src = kuvapala
        palanen.className = "palanen"

        if (kuvapala === nakymaton_pala_nimi) {
            palanen.id = 'nakymaton'
        }

        document.getElementById("kulmio").appendChild(palanen)
    })
}

function voitto() {
    document.getElementById("nakymaton").id = ""
}

function pelaa_pelia() {
    document.addEventListener("keydown", event => {
        const keyCode = parseInt(event.keyCode)
        if (![VASEN, YLOS, OIKEALLE, ALAS].includes(keyCode)) {
            return
        }
        siirra_palaa(keyCode)

        onko_peli_lapi()
    });
}

aloitus_asetelma()
pelaa_pelia()