<template>

    <div id="detail" class="container">
        <!-- <p>Id ove igre je: {{ id }}</p> -->

        <router-link :to="'/katalog'" class="btn btn-success mb-4 mt-4">
            {{ r[jezik].nazadNaKatalog }}
        </router-link>

        <div class="row mb-4">

            <div class="col-md-5">
                <div class="card h-100 d-flex flex-column align-items-center p-4"> 
                    
                    <img :src="uzmiPutanjuSlike(igra.slike[0])" class="card-img-top d-block img-fluid" style="max-height: 350px; object-fit: contain;">
                    
                    <h1 class="mt-3 text-center"><b>{{ igra.naziv[jezik] }}</b></h1>
                    
                    <hr class="w-100 my-3">

                    <div class="row g-3 text-center w-100 justify-content-center">
                        <div class="col-6 col-lg-3">
                            <div class="text-secondary small mb-1 text-nowrap">{{ r[jezik].brojIgraca }}</div>
                            <div class="fw-bold fs-5 text-dark">
                                {{ igra.brIgraca[0] }}-{{ igra.brIgraca[igra.brIgraca.length - 1] }}
                            </div>
                        </div>
                        
                        <div class="col-6 col-lg-3">
                            <div class="text-secondary small mb-1 text-nowrap">{{ r[jezik].uzrast }}</div>
                            <div class="fw-bold fs-5 text-dark">{{ igra.uzrast }}+</div>
                        </div>
                        
                        <div class="col-6 col-lg-3">
                            <div class="text-secondary small mb-1 text-nowrap">{{ r[jezik].trajanje }}</div>
                            <div class="fw-bold fs-5 text-dark">~{{ igra.trajanje }} min</div>
                        </div>
                        
                        <div class="col-6 col-lg-3">
                            <div class="text-secondary small mb-1 text-nowrap">{{ r[jezik].prosecnaOcena }}</div>
                            <div class="fw-bold fs-5 text-dark topcina">
                                {{ prosecnaOcena !== 'Nema' ? prosecnaOcena : "/" }}
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>

            <div class="col-md-7">
                <div class="rating-sekcija p-4 border rounded bg-white h-100 d-flex flex-column justify-content-between text-start">
                    <div>
                        <h1 class="display-5 fw-bold text-dark mb-3">{{ igra.naziv[jezik] }}</h1>
                        
                        <div class="mb-4">
                            <span v-for="kat in igra.kategorija[jezik]" :key="kat" class="badge bg-secondary text-capitalize">
                                {{ kat }}
                            </span>
                            <span v-if="igra.nova" class="badge bg-danger">NOVO</span>
                        </div>

                        <p class=" mb-4" style="text-align: justify;">
                            {{ igra.opis[jezik] }}
                        </p>

                        <hr>

                        <div v-if="isUlogovan">
                            <div class="mb-4 text-center">
                                <p class="fw-bold mb-2">{{ r[jezik].oceniteIgru }}</p>
                                <div class="zvezdice" style="direction: rtl; display: inline-block; text-align: center;">
                                    <input type="radio" id="star5" name="rating" value="5" v-model="novaOcena" style="display: none; cursor: pointer;" /><label for="star5" style="font-size: 30px; color: #ccc; display: inline-block;">★</label>
                                    <input type="radio" id="star4" name="rating" value="4" v-model="novaOcena" style="display: none; cursor: pointer;" /><label for="star4" style="font-size: 30px; color: #ccc; display: inline-block;">★</label>
                                    <input type="radio" id="star3" name="rating" value="3" v-model="novaOcena" style="display: none; cursor: pointer;" /><label for="star3" style="font-size: 30px; color: #ccc; display: inline-block;">★</label>
                                    <input type="radio" id="star2" name="rating" value="2" v-model="novaOcena" style="display: none; cursor: pointer;" /><label for="star2" style="font-size: 30px; color: #ccc; display: inline-block;">★</label>
                                    <input type="radio" id="star1" name="rating" value="1" v-model="novaOcena" style="display: none; cursor: pointer;" /><label for="star1" style="font-size: 30px; color: #ccc; display: inline-block;">★</label>
                                </div>
                            </div>

                            <div class="mb-4 text-center">
                                <p class="fw-bold mb-2">{{ r[jezik].ostaviteKomentar }}</p>
                                
                                <textarea 
                                    id="komentar" 
                                    class="form-control" 
                                    rows="3" 
                                    :placeholder="r[jezik].komentarPlaceholder"
                                    style="resize: none;"
                                    v-model="noviKomentar"
                                ></textarea>     

                                <!-- u localstorage ubacuje sve komentare-->
                                <button id="komentarBtn" class="btn btn-success mt-3" @click="dodajKomentar">
                                    <h3 class="mb-0 fw-bold">{{ r[jezik].posaljiRecenziju }}</h3>
                                </button>
                            </div>

                        </div>

                    </div>
                    
                    <div class="w-100 border-top pt-3 mt-4">
                        <div class="d-flex justify-content-between align-items-center mb-3">
                            <span class="text-secondary fs-5">{{ r[jezik].cenaLabel }}:</span>
                            <div>
                                <template v-if="igra.popust > 0">
                                    <span class="text-muted text-decoration-line-through fs-5">
                                        {{ igra.cena }} RSD
                                    </span>
                                    <span class="text-danger fw-bold fs-2">
                                        {{ Math.round(igra.cena * (1 - igra.popust / 100)) }} RSD
                                    </span>
                                </template>
                                <template v-else>
                                    <span class="text-dark fw-bold fs-2">{{ igra.cena }} RSD</span>
                                </template>
                            </div>
                        </div>

                        <div v-if="isUlogovan">
                            <button  class="btn btn-success w-100" @click="dodajUKorpu">
                                <h3 class="mb-0 fw-bold">{{ r[jezik].dodajUKorpu }}</h3>
                            </button>
                        </div>

                    </div> 

                </div>
            </div>            

        </div>

        <div class="card mb-4 p-4">
            <h1 class="display-6 fw-bold text-dark mb-3">{{ r[jezik].oceneIIskustva }}</h1>
            
            <div class="komentari-holder border rounded p-3">
                <div v-if="filtriraniKomentari.length === 0" class="text-muted text-center">
                    {{ r[jezik].nemaOcena }}
                </div>
                <div v-else>
                    <div v-for="(k, index) in filtriraniKomentari" :key="index" class="border-bottom pb-2 mb-2 text-start">
                        <div class="d-flex justify-content-between align-items-center">
                            <strong class="text-success">{{ k.korisnik }}:</strong>
                            <span class="text-warning fs-5">
                                {{ '★'.repeat(k.ocena) }}{{ '☆'.repeat(5 - k.ocena) }}
                            </span>
                        </div>
                        <p v-if="k.tekst" class="mb-0 text-dark mt-1">{{ k.tekst }}</p>
                    </div>
                </div>
            </div>
        </div>


    </div>
</template>

<style scoped>
    .btn-success {
        background-color: darkcyan;
    }
    .zvezdice label:hover,
    .zvezdice label:hover ~ label,
    .zvezdice input:checked ~ label {
        color: #FFD700 !important;
    }
    #rating-sekcija{
        text-align: center;
    }
    .card{
        background-color: white;
        box-shadow: #2b1810;
        border: 1px solid #d7ccc8;
        /* margin-bottom: 10px; */
        align-content: center;
    }
    .topcina{
        text-shadow: 0 0 8px rgba(231, 156, 7, 0.765);
    }
</style>

<script>
    import podaciOIgrama from '../models/igre.json';
    import inicijalniKomentari from '../models/komentari.json';

    export default {
        name: 'DetaljiIgre',
        props: ['id', 'jezik'],
        data() {
            return {
                korisnik: '',
                igre: [...podaciOIgrama],
                korpa: [],
                isUlogovan: !!localStorage.getItem('ulogovan'),
                noviKomentar: '',
                
                novaOcena: null, 
                sviKomentari: [],


                r: {
                    SRB: {
                        nazadNaKatalog: 'Nazad na katalog',
                        brojIgraca: 'Broj igrača',
                        uzrast: 'Uzrast',
                        trajanje: 'Trajanje',
                        prosecnaOcena: 'Prosečna ocena',
                        oceniteIgru: 'Ocenite društvenu igru (obavezno):',
                        ostaviteKomentar: 'Ostavite komentar (Opciono):',
                        komentarPlaceholder: 'Napišite svoje utiske o ovoj igri...',
                        posaljiRecenziju: 'Pošalji recenziju',
                        cenaLabel: 'Cena',
                        dodajUKorpu: 'Dodaj u korpu',
                        oceneIIskustva: 'Ocene i iskustva:',
                        nemaOcena: 'Nema ocena za ovu igru.',
                        upozorenjeZvezdice: 'Morate izabrati ocenu (zvezdice) pre slanja!'
                    },
                    ENG: {
                        nazadNaKatalog: 'Back to Catalog',
                        brojIgraca: 'Players',
                        uzrast: 'Age',
                        trajanje: 'Duration',
                        prosecnaOcena: 'Average Rating',
                        oceniteIgru: 'Rate the board game (required):',
                        ostaviteKomentar: 'Leave a comment (Optional):',
                        komentarPlaceholder: 'Write your impressions about this game...',
                        posaljiRecenziju: 'Submit Review',
                        cenaLabel: 'Price',
                        dodajUKorpu: 'Add to Cart',
                        oceneIIskustva: 'Ratings & Reviews:',
                        nemaOcena: 'No ratings for this game yet.',
                        upozorenjeZvezdice: 'You must select a rating (stars) before submitting!'
                    }
                }
            }
        },
        computed: {
            igra() {
                return this.igre.find(artikal => artikal.id == this.id);
            },
            filtriraniKomentari() {
                const izJsonFajla = inicijalniKomentari.filter(k => k.igraId == this.id);
        
                const izLocalStoragea = this.sviKomentari.filter(k => k.igraId == this.id);
                
                const sviZajedno=  [...izJsonFajla, ...izLocalStoragea];

                return sviZajedno.filter((komentar, index, self) =>
                    index === self.findIndex((k) => (
                        k.korisnik === komentar.korisnik && k.tekst === komentar.tekst && k.ocena === komentar.ocena
                    ))
                );
            },
            prosecnaOcena() {
                if (this.filtriraniKomentari.length === 0) {
                    return 'Nema';
                }

                const sumaOcena = this.filtriraniKomentari.reduce((acc, k) => acc + k.ocena, 0);
                
                const prosek = sumaOcena / this.filtriraniKomentari.length;
                return prosek.toFixed(1); 
            }
        },
        methods: {
            uzmiPutanjuSlike(putanja) {
                
                if (!putanja) return '';

                //skidanje assets-a sa pocetka
                const cista = putanja.replace(/^(\.\.\/|\/)?assets\//, '');

                const delovi = cista.split('/');    
                
                if (delovi.length === 2) {
                    const kategorija = delovi[0]; //porodicne
                    const fajl = delovi[1];       //catan.png

                    return new URL(`../assets/${kategorija}/${fajl}`, import.meta.url).href;
                }
                return '';
            },
            dodajUKorpu(){
                let trenutnaKorpa = JSON.parse(localStorage.getItem("korpa"));
                
                if(trenutnaKorpa == null){
                    trenutnaKorpa = [];
                    let novItem = {id : this.igra.id, kolicina : 1};
                    trenutnaKorpa.push(novItem);
                } else{
                    let ima = false;
                    trenutnaKorpa.forEach(e => {
                        if(e.id == this.igra.id){
                            e.kolicina++;
                            ima = true;
                        }
                    });
                    if (!ima){
                        let novItem = {id : this.igra.id, kolicina : 1};
                        trenutnaKorpa.push(novItem);
                    }
                }
                
                localStorage.setItem("korpa", JSON.stringify(trenutnaKorpa));

            },
            dodajKomentar() {
                //ocena je obavezna
                if (!this.novaOcena) {
                    alert('Morate izabrati ocenu (zvezdice) pre slanja!');
                    return;
                }

                const noviKomentarObj = {
                    igraId: this.id,
                    korisnik: this.korisnik.korime || this.korisnik.ime || this.korisnik || 'Korisnik',
                    ocena: parseInt(this.novaOcena),
                    tekst: this.noviKomentar.trim()
                };

                this.sviKomentari.push(noviKomentarObj);
                localStorage.setItem('komentari', JSON.stringify(this.sviKomentari));

                //unos
                this.noviKomentar = '';
                this.novaOcena = null; 
            },
        },
    created(){
        let us = localStorage.getItem('ulogovan')
        if(us){
            this.korisnik = JSON.parse(us)
            let k = localStorage.getItem('korpa')
            if(k){
                this.korpa = JSON.parse(k)
            } else {
                this.korpa = []
            }
        } else {
            this.korisnik = ''
        }

        let sacuvaniKomentari = localStorage.getItem('komentari');
        if(sacuvaniKomentari) {
            this.sviKomentari = JSON.parse(sacuvaniKomentari);
        } else {
            this.sviKomentari = [];
        }
        // const trenutnaIgra = this.igre.find(artikal => artikal.id == this.id);
        // if (trenutnaIgra) {
        //     this.$route.meta.breadcrumbs[2].text = trenutnaIgra.naziv;
        //     // document.title = `Dark Dice - ${trenutnaIgra.naziv}`;
        // }

    }
}
</script>