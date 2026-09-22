<template>
    <div class="container my-5" id="pocetna">
        <div class="row popusti my-5">
            <h2 class="mb-4 paznja"><i>{{ r[jezik].naslovPopusti }}</i></h2>
            <div class="karusel-traka">
                <div v-for="igra in igreNaPopustu" :key="igra.id" class="karusel-kartica col-lg-3 col-md-6 col-12 d-flex align-items-stretch">
                    <div class="card w-100 d-flex flex-column igra-kartica-bela">
                        <div class="pozicija-bedza d-flex">
                            <span v-if="igra.nova===true" class="badge bg-success">{{ r[jezik].bedzNovo }}</span>
                            <span class="badge bg-danger">-{{ igra.popust }}%</span>
                        </div>                        <img :src="uzmiPutanjuSlike(igra.slike[0])" class="card-top d-block mx-auto slika-igre">
                        <div class="card-body d-flex flex-column">
                            <h4 class="fw-bold">{{ igra.naziv[jezik] }}</h4>
                            <p class="kategorije-box small">{{ r[jezik].txtKategorije }}: {{ igra.kategorija[jezik].join(', ') }}</p>
                            <div class="mt-auto mb-3">
                                <span class="text-muted text-decoration-line-through me-2 small">{{ igra.cena }} RSD</span>
                                <h5 class="text-danger fw-bold m-0">{{ izracunajPopust(igra.cena, igra.popust) }} RSD</h5>
                            </div>
                            <router-link :to="'/detaljiigre/' + igra.id" class="btn btn-success dugme-detalji w-100">
                                {{ r[jezik].btnDetaljnije }}
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="row novo my-5">
            <h2 class="mb-4 novitet"><u>{{ r[jezik].naslovNovo }}</u></h2>
            <div class="karusel-traka">
                <div v-for="igra in noveIgre" :key="igra.id" class="karusel-kartica col-lg-3 col-md-6 col-12 d-flex align-items-stretch">
                    <div class="card w-100 d-flex flex-column igra-kartica-bela">
                        <div class="pozicija-bedza d-flex">
                            <span class="badge bg-success">{{ r[jezik].bedzNovo }}</span>
                            <span v-if="igra.popust > 0" class="badge bg-danger">-{{ igra.popust }}%</span>
                        </div>
                        <img :src="uzmiPutanjuSlike(igra.slike[0])" class="card-top d-block mx-auto slika-igre">
                        <div class="card-body d-flex flex-column">
                            <h4 class="fw-bold">{{ igra.naziv[jezik] }}</h4>
                            <p class="kategorije-box small">{{ r[jezik].txtKategorije }}: {{ igra.kategorija[jezik].join(', ') }}</p>
                            <div class="mt-auto mb-3">
                                <div v-if="igra.popust > 0">
                                    <span class="text-muted text-decoration-line-through me-2 small">{{ igra.cena }} RSD</span>
                                    <h5 class="text-danger fw-bold m-0">{{ izracunajPopust(igra.cena, igra.popust) }} RSD</h5>
                                </div>
                                <div v-else>
                                    <h5 class="text-success fw-bold m-0">{{ igra.cena }} RSD</h5>
                                </div>
                            </div>
                            <router-link :to="'/detaljiigre/' + igra.id" class="btn btn-success dugme-detalji w-100">
                                {{ r[jezik].btnDetaljnije }}
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="row najbolje my-5">
            <h2 class="mb-4 topcina"><b>{{ r[jezik].naslovTop3 }} ⭐</b></h2>
            <div class="karusel-traka">
                <div v-for="igra in top3" :key="igra.id" class="karusel-kartica col-lg-3 col-md-6 col-12 d-flex align-items-stretch" >
                    <div class="card w-100 d-flex flex-column igra-kartica-bela">
                        <div class="pozicija-bedza d-flex">
                            <span v-if="igra.nova===true" class="badge bg-success">{{ r[jezik].bedzNovo }}</span>
                            <span v-if="igra.popust > 0" class="badge bg-danger">-{{ igra.popust }}%</span>
                        </div>
                        <img :src="uzmiPutanjuSlike(igra.slike[0])" class="card-top d-block mx-auto slika-igre">
                        <div class="card-body d-flex flex-column">
                            <h4 class="fw-bold">{{ igra.naziv[jezik] }}</h4>
                            <p class="text-warning fw-bold small mb-1">
                                ⭐ {{ nadjiProsekZaIgru(igra.id) }} / 5
                            </p>
                            <p class="kategorije-box small">{{ r[jezik].txtKategorije }}: {{ igra.kategorija[jezik].join(', ') }}</p>
                            <div class="mt-auto mb-3">
                                <div v-if="igra.popust > 0">
                                    <span class="text-muted text-decoration-line-through me-2 small">{{ igra.cena }} RSD</span>
                                    <h5 class="text-danger fw-bold m-0">{{ izracunajPopust(igra.cena, igra.popust) }} RSD</h5>
                                </div>
                                <div v-else>
                                    <h5 class="text-success fw-bold m-0">{{ igra.cena }} RSD</h5>
                                </div>
                            </div>                            
                            <router-link :to="'/detaljiigre/' + igra.id" class="btn btn-success dugme-detalji w-100">
                                {{ r[jezik].btnDetaljnije }}
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <br><br>

        <div class="row najave p-4">
            <h2 class="text-center"><b>{{ r[jezik].naslovNajave }}</b></h2>
            <br> <br> <hr> <br>
            <div class="col-md-8">
                <h6>14.7.2026 - {{ r[jezik].dogadjaj1Naslov }}</h6>
                <p>{{ r[jezik].dogadjaj1Tekst }}</p>
                <hr>
                <h6>26.7.2026 - {{ r[jezik].dogadjaj2Naslov }}</h6>
                <p>{{ r[jezik].dogadjaj2Tekst }}</p>
                <hr>
                <h6>3.8.2026. - <i>{{ r[jezik].dogadjaj3Naslov }}</i></h6>
                <p>{{ r[jezik].dogadjaj3Tekst }}</p>
                <hr>
                <h6>14.8.2026 - {{ r[jezik].dogadjaj4Naslov }}</h6>
                <p>{{ r[jezik].dogadjaj4Tekst }}</p>
                <hr>
                <h6>9.9.2026.</h6>
                <p>stay tuned...👀</p>
                <hr>
                <p>...</p>
            </div>
            <div class="col-md-4 link-kartica">
                <br>
                <h4 class="text-center"><i>{{ r[jezik].naslovLinkovi }}</i></h4> <br>
                <ul>
                    <li><a class="linkovi" href="https://boardgamegeek.com/">{{ r[jezik].linkBgg }}</a></li> <br>
                    <li><a class="linkovi" href="https://www.facebook.com/groups/boardgamesbelgrade/">{{ r[jezik].linkFb }}</a></li> <br>
                    <li><a class="linkovi" href="https://pitchwise.net/adresa-klub-drustvenih-igara/">{{ r[jezik].linkAdresar }}</a></li> <br>
                    <li><a class="linkovi" href="https://www.ana.rs/forum/index.php?topic=224682.165">{{ r[jezik].linkForum }}</a></li> <br>
                    <li><a class="linkovi" href="https://www.youtube.com/@gamesrsrbija/playlists">{{ r[jezik].linkYoutube }}</a></li> <br>
                </ul>
            </div>
        </div>
        <div class="row">
            <div class="text-center p-4">
                <h3 style="background-color: white;">✨ {{ r[jezik].naslovAkcije }} ✨</h3>
                <img v-if="jezik === 'SRB'" src="../assets/slike/akcije.png" alt="akcije" class="akcije">
                <img v-else src="../assets/slike/promotions.png" alt="akcije" class="akcije">
            </div>
        </div>
        <div class="row text-center p-4">
            <h3 style="background-color: white;">-{{ r[jezik].naslovPartneri }}-</h3>
            <div class="text-center najave">
                <div class="sponzor col-6 col-md-3">
                    <img class="logo img-fluid mx-auto" src="../assets/slike/mipl.png" alt="mipl">
                    <div class="preko">
                        <span class="alt-tekst">MIPL</span>
                    </div>
                </div>
                <div class="sponzor col-6 col-md-3">
                    <img class="logo img-fluid mx-auto" src="../assets/slike/cola.png" alt="cola">
                    <div class="preko">
                        <span class="alt-tekst">COLA</span>
                    </div>
                </div>
                <div class="sponzor col-6 col-md-3">
                    <img class="logo img-fluid mx-auto" src="../assets/slike/rosa.png" alt="rosa">
                    <div class="preko">
                        <span class="alt-tekst">ROSA</span>
                    </div>
                </div>
                <div class="sponzor col-6 col-md-3">
                    <img class="logo img-fluid mx-auto" src="../assets/slike/etf.png" alt="etf">
                    <div class="preko">
                        <span class="alt-tekst">ETF</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
h6{
    font-style: bold;
    font-weight: 900;
    color: darkcyan
}
#pocetna{
    color: black;
}
.paznja{
    text-shadow: 0 0 8px rgba(255, 51, 51, 0.6);
}
.novitet{
    text-shadow: 0 0 8px rgba(51, 255, 136, 0.6);
}
.topcina{
    text-shadow: 0 0 8px rgba(231, 156, 7, 0.765);
}
.dugme-detalji{
    background-color: darkcyan;
}
.sponzor{
    position: relative;
    display: inline-block;
    border-radius: 4px;
    max-width: 200px;
    width: 100%;
}
.preko{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
}
.logo{
    max-height: 200px;
    max-width: 200px;
    object-fit: contain;
    display: block;
}
.alt-tekst{
    color: darkcyan;
    font-weight: 800;
    font-size: medium;
    letter-spacing: 1px;
}
.sponzor:hover .preko {
    opacity: 1;
}
.sponzor:hover .logo {
    filter: blur(1px) brightness(0.8);
}
.link-kartica{
    background-color: wheat;
    border: solid 1px wheat;
    border-radius: 5px;
    max-width: fit-content;
    max-height: 70%;
    margin-top: 10px;
    margin-bottom: 10px;
    padding: 5px;
}
.linkovi{
    color: darkcyan;
}
.linkovi:hover{
    color: black;
}
.najave{
    background-color: white;
    box-shadow: rgb(43, 24, 16);
    border: 1px solid rgb(206, 195, 191);
    height: 100%;
}
.akcije{
    max-height: 100%;
    max-width: 100%;
    border: white 2px dashed;
}
.karusel-traka{
    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto;
    padding: 15px 5px;
    scroll-behavior: smooth;
}
.karusel-traka::-webkit-scrollbar{
    height: 8px;
}
.karusel-traka::-webkit-scrollbar-thumb{
    background: rgb(215, 204, 200);
    border-radius: 10px;
}
.karusel-kartica{
    padding: 0 10px;
    flex-shrink: 0;
}
.slika-igre{
    height: 160px;
    object-fit: contain;
    padding: 10px;
}
.igra-kartica-bela{
    border: 1px solid rgb(215, 204, 200);
    border-radius: 8px;
    position: relative;
    box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}
.pozicija-bedza{
    position: absolute;
    top: 10px;
    left: 10px;
    padding: 6px 10px;
    font-size: 0.8rem;
    z-index: 15;
    display: flex;
    flex-direction: row;
    gap: 10px;
}
</style>

<script>
import igre from '../models/igre.json';
import inicijalniKomentari from '../models/komentari.json';

export default{
    name: 'Pocetna',
    props: ['jezik'],
    data() {
        return {
            igre: igre,
            sviKomentari: [],
            proseci: [],
            r: {
                SRB: {
                    naslovPopusti: 'AKTUELNI POPUSTI',
                    naslovNovo: 'Novo u ponudi!',
                    naslovTop3: 'Top 3 igre',
                    naslovNajave: 'Uskoro, na našim prostorima',
                    naslovLinkovi: 'Korisni linkovi',
                    naslovAkcije: 'Akcije',
                    naslovPartneri: 'Ponosni partneri i sponzori-',
                    bedzNovo: 'NOVO',
                    txtKategorije: 'Kategorije',
                    btnDetaljnije: 'Pogledaj detaljnije',
                    dogadjaj1Naslov: 'Catan turnir #420',
                    dogadjaj1Tekst: 'Ponovo kod nas, nezaobilazna igra, prosto morate da budete tamo. Vidimo se u 12h.',
                    dogadjaj2Naslov: 'Bazar društvenih igara',
                    dogadjaj2Tekst: 'Dragi dobri ljudi, dođite u 16h u klub. Sav prihod ide macama i kucama koje nemaju dom.',
                    dogadjaj3Naslov: 'ROĐENDAN KLUBA',
                    dogadjaj3Tekst: 'U skladu sa običajima i propisima, organizujemo opasnu žžžžurku. 20h. Budite tamo. Ili nemojte.',
                    dogadjaj4Naslov: 'Jamb turnir #67',
                    dogadjaj4Tekst: 'Novi mesec novi turnir, ko sme da stane na crtu prethodnom šampionu Masnobradom? Isto mesto, 14h.',
                    linkBgg: 'Sve o društvenim igrama što može da vas zanima - na svetskom nivou',
                    linkFb: 'Facebook zajednica društvenih igara u Beogradu',
                    linkAdresar: 'Adresar najboljih klubova društvenih igara u celoj Srbiji',
                    linkForum: 'Domaći o najpoznatijim društvenim igrama na svetu',
                    linkYoutube: 'Domaći youtube kanal sa aktuelnim temama'
                },
                ENG: {
                    naslovPopusti: 'CURRENT DISCOUNTS',
                    naslovNovo: 'New Arrivals!',
                    naslovTop3: 'Top 3 Games',
                    naslovNajave: 'Coming Soon to Our Spaces',
                    naslovLinkovi: 'Useful Links',
                    naslovAkcije: 'Special Offers',
                    naslovPartneri: 'Proud Partners & Sponsors',
                    bedzNovo: 'NEW',
                    txtKategorije: 'Categories',
                    btnDetaljnije: 'View Details',
                    dogadjaj1Naslov: 'Catan Tournament #420',
                    dogadjaj1Tekst: 'Back again, an absolute must-play game, you just have to be there. See you at 12 PM.',
                    dogadjaj2Naslov: 'Board Game Bazaar',
                    dogadjaj2Tekst: 'Dear good people, come to the club at 4 PM. All proceeds go to stray cats and dogs without a home.',
                    dogadjaj3Naslov: 'CLUB BIRTHDAY',
                    dogadjaj3Tekst: 'In accordance with customs and regulations, we are throwing a wild party. 8 PM. Be there. Or don\'t.',
                    dogadjaj4Naslov: 'Yahtzee Tournament #67',
                    dogadjaj4Tekst: 'New month, new tournament, who dares to challenge the previous champion Masnobradi? Same place, 2 PM.',
                    linkBgg: 'Everything you want to know about board games - on a global scale',
                    linkFb: 'Facebook board gaming community in Belgrade',
                    linkAdresar: 'Directory of the best board game clubs across Serbia',
                    linkForum: 'Local forum discussions about the world\'s most famous board games',
                    linkYoutube: 'Local YouTube channel featuring trending topics'
                }
            }
        }
    },
    computed: {
        igreNaPopustu() {
            return this.igre.filter(igra => igra.popust > 0);
        },
        noveIgre() {
            return this.igre.filter(igra => igra.nova === true);
        },
        top3(){
            // return [...this.igre]
            //     .sort((a, b) => b.cena - a.cena)
            //     .slice(0, 3);
            const ids = this.proseci.slice(0, 3).map(p => p.igra);
            return ids.map(id => this.igre.find(igra => igra.id == id)).filter(Boolean);
        }
    },
    methods: {
        izracunajProsekPoIgrama() {
            const komentari = this.sviKomentari; 
            const mapeIgara = komentari.reduce((acc, k) => {
                if (!acc[k.igraId]) {
                    acc[k.igraId] = { suma: 0, cnt: 0 };
                }
                acc[k.igraId].suma += k.ocena;
                acc[k.igraId].cnt += 1;
                return acc;
            }, {});
            this.proseci = Object.keys(mapeIgara).map(igraId => {
                const prosek = mapeIgara[igraId].suma / mapeIgara[igraId].cnt;
                return {
                    igra: Number(igraId), 
                    prosecnaocena: Number(prosek.toFixed(1))
                };
            });
            this.proseci.sort((a,b) => b.prosecnaocena - a.prosecnaocena);
        },
        uzmiPutanjuSlike(putanja) {
            if (!putanja) return '';
            const cista = putanja.replace(/^(\.\.\/|\/)?assets\//, '');
            const delovi = cista.split('/');    
            if (delovi.length === 2) {
                const kategorija = delovi[0];
                const fajl = delovi[1];
                return new URL(`../assets/${kategorija}/${fajl}`, import.meta.url).href;
            }
            return '';
        },
        izracunajPopust(cena, popust) {
            return Math.round(cena * (1 - popust / 100));
        },
        nadjiProsekZaIgru(igraId) {
            const prosek = this.proseci.find(p => p.igra === Number(igraId));
            return prosek ? prosek.prosecnaocena : 0;
        }
    },
    created(){
        let sacuvaniKomentari = localStorage.getItem('komentari');
        if(sacuvaniKomentari) {
            this.sviKomentari = JSON.parse(sacuvaniKomentari);
            this.izracunajProsekPoIgrama();
        } else {
            this.sviKomentari = inicijalniKomentari;
            localStorage.setItem('komentari', JSON.stringify(inicijalniKomentari));
            this.izracunajProsekPoIgrama();
        }

    }
}
</script>