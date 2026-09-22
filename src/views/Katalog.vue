<template>
    <div id = "katalog" class="container">
        <h1 id="naslov">{{ r[jezik].naslov }}</h1>
        
        <!-- menu div, sort, filter blablabla -->
        <div class="row justify-content-center">
            <div class="col-md-3 mb-4 pdf-sadrzaj sakrij-za-print">
                <label for="kat"><h4>{{ r[jezik].izaberiteKategoriju }}</h4></label>
                <select v-model="izabranaKategorija" name="kat" id="kat" class="form-select">
                    <option value="sve" selected>{{ r[jezik].sveKategorije }}</option>
                    <option value="porodicne">{{ r[jezik].porodicne }}</option>
                    <option value="strateske">{{ r[jezik].strateske }}</option>
                    <option value="zabavne">{{ r[jezik].zabavne }}</option>
                </select>
                <br>
                

                <form class="mb-4">
                    <h4>{{ r[jezik].pretragaPoNazivu }}</h4>
                    <div class="input-group mb-3">
                        <input type="search" v-model="tekstZaPretragu" name="naziv" id="search-kategorija" class="form-control" :placeholder="r[jezik].pretraziPlaceholder">
                    </div>


                    <h4>{{ r[jezik].filtrirajtePoCeni }}</h4>
                    <div class="row g-2 mb-3">
                        <div class="col-6">
                            <label for="min-cena" class="form-label">{{ r[jezik].minCena }}</label>
                            <input type="number" id="min-cena" v-model.number="minimalnaCena" class="form-control" placeholder="0">
                        </div>
                        <div class="col-6">
                            <label for="max-cena" class="form-label">{{ r[jezik].maxCena }}</label>
                            <input type="number" id="max-cena" v-model.number="maksimalnaCena" class="form-control" placeholder="10000">
                        </div>
                    </div>




                    <h4 class="mb-1">{{ r[jezik].sortirajPoCeni }}</h4>
                    <div class="mb-3">
                        <label><input type="checkbox" v-model="sortCena" name="sort" true-value="cena-op" false-value="">{{ r[jezik].cenaOpadajuce }}</label><br>
                        <label><input type="checkbox" v-model="sortCena" name="sort" true-value="cena-ras" false-value="">{{ r[jezik].cenaRastuce }}</label>
                    </div>

                    <h4 class="mb-1">{{ r[jezik].sortirajPoNazivu }}</h4>
                    <div class="mb-3">
                        <label><input type="checkbox" v-model="sortNaziv" name="sort" true-value="naziv-ras" false-value=""> {{ r[jezik].nazivRastuce }}</label><br>
                        <label><input type="checkbox" v-model="sortNaziv" name="sort" true-value="naziv-op" false-value=""> {{ r[jezik].nazivOpadajuce }}</label><br>
                    </div>

                </form>

            </div>

            <!-- igre -->
            <div class="col-md-9 ">
                <div class="row justify-content-start g-2">
                    <div v-for="igra in filtriraneIgre" :key="igra.id" class="col-md-3 d-flex align-items-stretch">
                        <!-- ako nema rezultata, dodaj div sa tekstom -->
                        <div class="card w-100 d-flex align-items-strech flex-column col-lg-3 col-md-6">
                            <!-- slika kartice -->
                            <img :src="uzmiPutanjuSlike(igra.slike[0])" class="card-top d-block mx-auto">

                            <div class="card-body d-flex flex-column">
                                <h4 class="font-weight-bold">{{ igra.naziv[jezik] }}</h4>
                                <p class="kategorije-box">{{ r[jezik].kategorijeLabel }}: {{ igra.kategorija[jezik].join(', ') }}</p>
                               
                                <template v-if="igra.popust > 0">
                                    <span class="text-muted text-decoration-line-through me-2">{{ igra.cena }} RSD</span>
                                    <h5 class="text-danger fw-bold d-inline">{{ izracunajPopust(igra.cena, igra.popust) }} RSD</h5>
                                </template>
                                <template v-else>
                                    <h5 class="text-success fw-bold">{{ igra.cena }} RSD</h5>
                                </template>
                                
                                <router-link :to="'/detaljiigre/' + igra.id" class="btn btn-success mt-auto">
                                    {{ r[jezik].pogledajDetaljnije }}
                                </router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="text-center">
            <button class="btn btn-success mt-3 mb-3 sakrij-za-print d-print-none" @click="stampajPDF">
                <h3>{{ r[jezik].preuzmiKatalog }}</h3>
            </button>
        </div>
        
    </div>

    
</template>

<style scoped>
    #naslov{
        text-align: center;
        padding: 5px;
    }
    .card-top{
        height: 150px;
        width: 100%;
        max-width: 150px;
        align-content: center;
        object-fit: contain;
        padding: 5px;
    }
    .card{
        background-color: white;
        box-shadow: #2b1810;
        border: 1px solid #d7ccc8;
        display: flex;
        flex-wrap: nowrap;
        align-content: center;
    }
    .kategorije-box {
        min-height: 50px;
        margin-bottom: 8px;
    }
    .btn-success {
        background-color: darkcyan;
    }

    @media print {
        .sakrij-za-print {
            display: none !important;
        }
        .col-md-9 {
            width: 100% !important;
            flex: 0 0 100% !important;
            max-width: 100% !important;
        }
        .print-kartica {
            width: 33.33% !important;
            flex: 0 0 33.33% !important;
            max-width: 33.33% !important;
            display: inline-flex !important;
            page-break-inside: avoid;
            margin-bottom: 15px;
        }
        .card {
            box-shadow: none !important;
            border: 1px solid #000 !important;
        }
    }

</style>

<script>
    import podaciOIgrama from '../models/igre.json';

    export default{
        name: 'Katalog',
        props : ['jezik'],
        data(){
            return{
                izabranaKategorija: 'sve',
                igre: [...podaciOIgrama], //kopija
                
                tekstZaPretragu: '', //temp
                // sortiranje: [], //temp niz za naziv/cenu

                sortCena : '',
                sortNaziv : '',

                minimalnaCena : '',
                maksimalnaCena: 10000,     

                r: {
                    SRB: {
                        naslov: 'Katalog igara',
                        izaberiteKategoriju: 'Izaberite kategoriju:',
                        sveKategorije: 'Sve kategorije',
                        porodicne: 'Porodične',
                        strateske: 'Strateške',
                        zabavne: 'Zabavne',
                        pretragaPoNazivu: 'Pretraga po nazivu:',
                        pretraziPlaceholder: 'Pretraži po nazivu...',
                        filtrirajtePoCeni: 'Filtrirajte po ceni:',
                        minCena: 'Min cena:',
                        maxCena: 'Max cena:',
                        sortirajPoCeni: 'Sortiraj po ceni:',
                        cenaOpadajuce: 'Ceni - opadajuće',
                        cenaRastuce: 'Ceni - rastuće',
                        sortirajPoNazivu: 'Sortiraj po nazivu:',
                        nazivRastuce: 'Nazivu - rastuće',
                        nazivOpadajuce: 'Nazivu - opadajuće',
                        kategorijeLabel: 'Kategorije',
                        pogledajDetaljnije: 'Pogledaj detaljnije',
                        preuzmiKatalog: 'Preuzmi katalog',
                        nemaRezultata: 'Nema pronađenih igara za unete kriterijume.'
                    },
                    ENG: {
                        naslov: 'Game Catalog',
                        izaberiteKategoriju: 'Select category:',
                        sveKategorije: 'All categories',
                        porodicne: 'Family',
                        strateske: 'Strategy',
                        zabavne: 'Party',
                        pretragaPoNazivu: 'Search by name:',
                        pretraziPlaceholder: 'Search by name...',
                        filtrirajtePoCeni: 'Filter by price:',
                        minCena: 'Min price:',
                        maxCena: 'Max price:',
                        sortirajPoCeni: 'Sort by price:',
                        cenaOpadajuce: 'Price - descending',
                        cenaRastuce: 'Price - ascending',
                        sortirajPoNazivu: 'Sort by name:',
                        nazivRastuce: 'Name - ascending',
                        nazivOpadajuce: 'Name - descending',
                        kategorijeLabel: 'Categories',
                        pogledajDetaljnije: 'View details',
                        preuzmiKatalog: 'Download catalog',
                        nemaRezultata: 'No games found matching the criteria.'
                    }
                }
            }
        },
        computed: {
            filtriraneIgre(){
                let filtrirane=[];
                //kategorija
                // if (!this.izabranaKategorija || this.izabranaKategorija == "sve") filtrirane=[...this.igre]; //sve igre ukoliko nista nije izabrano
                // else filtrirane=this.igre.filter(igra => igra.kategorija.includes(this.izabranaKategorija)); //samo ta kat
                
                if (!this.izabranaKategorija || this.izabranaKategorija == "sve") {
                    filtrirane = [...this.igre];
                } else {
                    filtrirane = this.igre.filter(igra => igra.kategorija['SRB'].includes(this.izabranaKategorija));
                }


                if (this.tekstZaPretragu.trim() !== '') {
                    let rec = this.tekstZaPretragu.toLowerCase();
                    filtrirane = filtrirane.filter(igra => igra.naziv[this.jezik].toLowerCase().includes(rec));
                }

                // if (this.tekstZaPretragu.trim() !== '') {
                //     let rec = this.tekstZaPretragu.toLowerCase();
                //     filtrirane = filtrirane.filter(igra => igra.naziv.toLowerCase().includes(rec));
                // }
                
                //filtriranje cene, sa poljima
                filtrirane = filtrirane.filter(igra => {
                    let trenCena = igra.popust > 0 ? this.izracunajPopust(igra.cena, igra.popust) : igra.cena;
                    let minBool = (this.minimalnaCena === null || this.minimalnaCena === '') ? true : trenCena >= this.minimalnaCena;
                    let maxBool = (this.maksimalnaCena === null || this.maksimalnaCena === '') ? true : trenCena <= this.maksimalnaCena;
                    //zadovoljava sve
                    return minBool && maxBool;
                });

                //naziv sort
                // if(this.sortNaziv === "naziv-ras"){
                //     filtrirane.sort((a, b) => {
                //         if (a.naziv < b.naziv) return -1;
                //         if (a.naziv > b.naziv) return 1;
                //         return 0;
                //     });
                // }
                // if(this.sortNaziv === "naziv-op"){
                //     filtrirane.sort((a, b) => {
                //         if (b.naziv < a.naziv) return -1;
                //         if (b.naziv > a.naziv) return 1;
                //         return 0;
                //     });
                // }

                //naziv sort dvojezicni
                if(this.sortNaziv === "naziv-ras"){
                    filtrirane.sort((a, b) => {
                        if (a.naziv[this.jezik] < b.naziv[this.jezik]) return -1;
                        if (a.naziv[this.jezik] > b.naziv[this.jezik]) return 1;
                        return 0;
                    });
                }
                if(this.sortNaziv === "naziv-op"){
                    filtrirane.sort((a, b) => {
                        if (b.naziv[this.jezik] < a.naziv[this.jezik]) return -1;
                        if (b.naziv[this.jezik] > a.naziv[this.jezik]) return 1;
                        return 0;
                    });
                }

                //cena sort
                if(this.sortCena === "cena-ras"){
                    filtrirane.sort((a, b) => {
                        let cena1 = a.popust > 0 ? this.izracunajPopust(a.cena, a.popust) : a.cena;
                        let cena2 = b.popust > 0 ? this.izracunajPopust(b.cena, b.popust) : b.cena;
                        return cena1 - cena2;
                    });
                }
                if(this.sortCena === "cena-op"){
                    filtrirane.sort((a, b) => {
                        let cena1 = a.popust > 0 ? this.izracunajPopust(a.cena, a.popust) : a.cena;
                        let cena2 = b.popust > 0 ? this.izracunajPopust(b.cena, b.popust) : b.cena;
                        return cena2 - cena1;
                    });
                }

                return filtrirane;
            }
        },
        methods: {
            stampajPDF() {
                window.print();
            },
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
            izracunajPopust(cena, popust) {
                return Math.round(cena * (1 - popust / 100));
            },
        }
    }

</script>