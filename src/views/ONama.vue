<template>
    <div class="container my-5">
        <div class="row align-items-stretch mb-5">
            <div class="col-md-6 mb-4 mb-md-0">
                <div class="p-4 rounded istorija h-100 d-flex flex-column justify-content-center"> 
                    <h3 class="naslov text-center"> -- {{ r[jezik].istorijatNaslov }} --</h3>
                    <p>{{ r[jezik].istorijatTekst }}</p>
                </div>
            </div>
            <div class="col-md-6 mb-4 mb-md-0 text-center">
                <div class="p-4 rounded kartica d-flex flex-column justify-content-center">
                    <h5 class="naslov mb-3">{{ r[jezik].misijaNaslov }}</h5>
                    <p>{{ r[jezik].misijaTekst }}</p>
                    <img src="../assets/slike/mislja.jpg" alt="misijaslika" class="slicica w-100 align-self-center">
                </div>
            </div>
        </div>
        <hr class="w-100">
        <h3 class="naslov text-center mb-4"><u>{{ r[jezik].nagradeNaslov }}</u></h3>
        <div class="row mb-5 g-3">
            <div class="col-md-4">
                <div class="card p-4 text-center h-100 shadow-sm">
                    <div class="ikona mb-2">🏆</div>
                    <h5 class="fw-bold">{{ r[jezik].kockicaNaslov }}</h5>
                    <p class="card-text small">{{ r[jezik].kockicaTekst }}</p>
                </div>
            </div>
            <div class="col-md-4">
                <div class="card p-4 text-center h-100 shadow-sm">
                    <div class="ikona mb-2">🎲</div>
                    <h5 class="fw-bold">{{ r[jezik].zajednicaNaslov }}</h5>
                    <p class="card-text small">{{ r[jezik].zajednicaTekst }}</p>
                </div>
            </div>
            <div class="col-md-4">
                <div class="card p-4 text-center h-100 shadow-sm">
                    <div class="ikona mb-2">⭐</div>
                    <h5 class="fw-bold">Premium Partner</h5>
                    <p class="card-text small">{{ r[jezik].partnerTekst }}</p>
                </div>
            </div>
        </div>
        <hr class="w-100">
        <div class="row g-4">
            <div class="text-center p-4">
                <h3 style="background-color: white;">✨ {{ r[jezik].meniNaslov }} ✨</h3>
                <img v-if="jezik === 'SRB'" src="../assets/slike/meni.png" alt="meni" class="meni">
                <img v-else src="../assets/slike/menu.jpg" alt="menu" class="meni">            
            </div>
        </div>
        <hr class="w-100">
        <div class="row g-4">
            <div class="col-md-6">
                <div class="kartica p-4">
                    <h4 class="mb-4 text-center"><b><u>{{ r[jezik].kontaktNaslov }}</u></b></h4>
                    <div class="mb-3">
                        <h5>📞 {{ r[jezik].telEmail }}</h5>
                        <p class="ps-3 m-0">{{ r[jezik].telefon }}:  011/ 420-6767</p>
                        <p class="ps-3">E-mail:  kontakt@darkdice.rs</p>
                    </div> 
                    <div class="mb-3">
                        <h5>📍 {{ r[jezik].adresaNaslov }}</h5>
                        <p class="ps-3">{{ r[jezik].adresa }}</p>
                    </div>
                    <hr>
                    <div>
                        <h5>🕒 {{ r[jezik].radnoVremeNaslov }}</h5>
                        <ul class="list-unstyled ps-3">
                        <li><b>{{ r[jezik].radniDani }}:</b> 10:00 - 22:00</li>
                        <li><b>{{ r[jezik].vikend }}:</b> 12:00 - 00:00</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="col-md-6 mapa">
                <iframe 
                    src="https://maps.google.com/maps?q=Dobra%C4%8Dina+5%2C+Beograd&t=&z=17&ie=UTF8&iwloc=&output=embed"
                    width="100%" 
                    height="100%"
                    class="rounded" 
                    allowfullscreen="" 
                    loading="lazy">
                </iframe>
            </div>
        </div>
    </div>
</template>

<style scoped>
.meni{
    max-height: 100%;
    max-width: 100%;
    border: white 2px dashed;
}
.slicica{
    max-height: 70%;
    max-width: 90%;
    border: wheat 2px dotted;
}
.mapa{
    border: 0;
    min-height: 350px;
}
.istorija{
    border: dashed 1px black;
}
.naslov{
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, sans-serif;
    font-weight: 800;
    color: rgb(42, 24, 16);
    margin-bottom: 1.5rem;
}
.kartica{
    background-color: white;
    box-shadow: rgb(43, 24, 16);
    border: 1px solid rgb(215, 204, 200);
    height: 100%;
}
.ikona{
    border: solid 1px black;
    border-radius: 10px;
    width: 25px;
    justify-content: center;
    text-align: center;
    align-items: center;
}
</style>

<script>
export default{
    name: 'ONama',
    props: ['jezik'],
    data() {
        return {
            r: {
                SRB: {
                    istorijatNaslov: 'Kratki istorijat',
                    istorijatTekst: 'Sve je počelo 2024. godine iz čiste ljubavi prema kartama, pijunima, kockicama i okupljanju društva za dobar provod! DARK DICE je nastao kao ideja da se stvori zajednica — bilo da ste ljubitelj teških strategija, brzih kartičnih ili laganih porodičnih igara. Počeli smo kao sasvim mala ali funkcionalna online prodavnica društvenih igara, no ubrzo nam se sreća osmehnula i otvorili smo naš prvi lokal/dom u Beogradu. Sada možete uživo kupiti igre na našoj lokaciji, popiti neko piće ili se poslužiti grickalicama, ali pre svega, zaigrati društvene igre! Naše divne kolege su tu da vam odgovore na bilo kakva pitanja ili da vas nauče kako se igraju igre iz naše ponude. Dobrodošli!!!',
                    misijaNaslov: 'Naša Misija',
                    misijaTekst: '„Naša misija je da sklonimo ljude od ekrana, prekinemo doom skrolovanje i ponovo spojimo ljude za istim stolom uz smeh, strategiju i dobar provod.“',
                    nagradeNaslov: 'Nagrade i Priznanja',
                    kockicaNaslov: 'Zlatna Kockica',
                    kockicaTekst: 'Proglašeni za najbolji novi klub društvenih igara u regionu 2025. godine.',
                    zajednicaNaslov: 'Zajednica Godine',
                    zajednicaTekst: 'Priznanje za organizaciju preko 50 besplatnih turnira za studente i mlade.',
                    partnerTekst: 'Sertifikovani novi distributer najvećih svetskih izdavača društvenih igara.',
                    meniNaslov: 'Aktuelan Meni',
                    kontaktNaslov: 'Kontakt & Lokacija',
                    telEmail: 'Telefon & Email',
                    telefon: 'Telefon',
                    adresaNaslov: 'Adresa',
                    adresa: 'Dobračina 5, 11000 Beograd',
                    radnoVremeNaslov: 'Radno Vreme',
                    radniDani: 'Ponedeljak - Petak',
                    vikend: 'Subota - Nedelja'
                },
                ENG: {
                    istorijatNaslov: 'Short History',
                    istorijatTekst: 'It all started in 2024 out of pure love for cards, pawns, dice, and gathering friends for a good time! DARK DICE was born as an idea to create a community — whether you are a fan of heavy strategies, fast card games, or light family games. We started as a very small but functional online board game shop, but soon fortune smiled upon us and we opened our first club/home in Belgrade. Now you can buy games live at our location, have a drink or grab some snacks, but above all, play board games! Our wonderful colleagues are here to answer any questions or teach you how to play the games from our offer. Welcome!!!',
                    misijaNaslov: 'Our Mission',
                    misijaTekst: '“Our mission is to step people away from screens, stop doom scrolling, and bring people back together around the same table with laughter, strategy, and good times.”',
                    nagradeNaslov: 'Awards & Recognition',
                    kockicaNaslov: 'Golden Die',
                    kockicaTekst: 'Awarded the best new board game club in the region in 2025.',
                    zajednicaNaslov: 'Community of the Year',
                    zajednicaTekst: 'Recognition for organizing over 50 free tournaments for students and youth.',
                    partnerTekst: 'Certified new distributor of the world\'s largest board game publishers.',
                    meniNaslov: 'Current Menu',
                    kontaktNaslov: 'Contact & Location',
                    telEmail: 'Phone & Email',
                    telefon: 'Phone',
                    adresaNaslov: 'Address',
                    adresa: '5 Dobracina St, 11000 Belgrade',
                    radnoVremeNaslov: 'Opening Hours',
                    radniDani: 'Monday - Friday',
                    vikend: 'Saturday - Sunday'
                }
            }
        }
    }
}
</script>