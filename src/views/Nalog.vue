<template>
    <div class="container nalog">
        <div v-if="this.korisnik==''" class="d-flex align-items-center justify-content-center text-center neulogovan">
            <br>
            <h2><b>{{ r[jezik].porukaLogin }}</b></h2>
        </div>
        <div v-else>
            <h1>{{ r[jezik].naslovKorpa }}:</h1> <br>
            <div class="korpa w-100 d-flex justify-content-center">
                <div v-if="this.korpa.length===0" class="text-center">
                    <b>{{ r[jezik].praznaKorpa }}</b>
                </div>
                <div v-else style="width: 100%">
                    <div>
                        <table class="table align-middle text-center border-secondary">
                            <thead style="background-color: lightgray;">
                                <tr class="align-middle" style="min-height: 60px;">
                                    <th style="width: 40%;">{{ r[jezik].thProizvodi }}</th>
                                    <th style="width: 2%;"></th>
                                    <th style="width: 22%;">{{ r[jezik].thKolicina }}</th>
                                    <th style="width: 2%;"></th>
                                    <th style="width: 22%;">{{ r[jezik].thCena }}</th>
                                    <th style="width: 2%;"></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="proizvod in korpa" :key="proizvod.id">
                                    <td class="fw-bold">{{ getIme(proizvod.id) }}</td>
                                    <td colspan="3">
                                        <button class="btn fw-bold" @click="smanji(proizvod)">-</button>
                                        <span>{{ proizvod.kolicina }}</span>
                                        <button class="btn fw-bold" @click="povecaj(proizvod)">+</button>
                                    </td>
                                    <td class="text-success pe-3">
                                        {{ proizvod.kolicina * getCenaIgre(proizvod.id) }} RSD
                                    </td>
                                    <td class="pe-3">
                                        <button class="btn" @click="ukloni(proizvod)">🗑️ {{ r[jezik].btnObrisi }}</button>
                                    </td>
                                </tr>
                                <tr style="background-color: lightgray;">
                                    <td colspan="4" class="text-center fw-bold">{{ r[jezik].ukupnoPorudzbina }}: </td>
                                    <td colspan="2" class="text-center fw-bold text-success">
                                        <span>{{ cenaKorpe }} RSD</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <button class="btn btn-success poruci" @click="poruci()">{{ r[jezik].btnPoruci }}</button>
                    </div>
                </div>
            </div>
            <br> <hr>
            <h1>{{ r[jezik].naslovIstorija }}:</h1> <br>
            <div class="w-100 istorija d-flex justify-content-center">
                <!-- mozda dodati da ako nema istorije prikaze da je prazna ili neka poruka idk -->
                <table class="table table-striped table-bordered border-secondary align-middle">
                    <thead class="table-dark align-items-center">
                        <tr class="align-middle" style="min-height: 60px;">
                            <th style="width: 20%;">{{ r[jezik].thDatum }}</th>
                            <th style="width: 40%;">{{ r[jezik].thProizvodi }}</th>
                            <th style="width: 20%;">{{ r[jezik].thKomada }}</th>
                            <th style="width: 20%;">{{ r[jezik].thUkupnaCena }}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="porudzbina in sortIstorija" :key="porudzbina.datum">
                            <td class="fw-bold text-secondary">{{ porudzbina.datum }}</td>
                            <td>
                                <ul class="m-0">
                                    <li v-for="artikal in porudzbina.proizvodi" :key="artikal" class="py-1">
                                        <strong>{{ getIme(artikal) }}</strong> 
                                        <span class="badge bg-secondary ms-2">x{{ artikal.kolicina }}</span>
                                    </li>
                                </ul>
                            </td>
                            <td class="fw-bold text-dark pe-3">
                                {{ getUkupnoKomada(porudzbina.proizvodi) }}
                            </td>
                            <td class="fw-bold text-success pe-3">
                                {{ getUkupnaCena(porudzbina.proizvodi) }} RSD
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<style scoped>
h1{
    text-decoration: underline;
    margin-left: 10px;
}
table{
    text-align: left;
    align-items: center;
    background-color: white;
    border: solid black 2px;;
}
.poruci{
    background-color: darkcyan;
}
.nalog{
    margin-top: 20px;
    margin-bottom: 20px;
}
.neulogovan{
    min-height: 60vh;
    background-image: linear-gradient(rgba(245, 222, 179, 0.6), rgba(245, 222, 179, 0.6)),url('../assets/pozadina.jpg');
    background-repeat: repeat;
    /* margin-block: 20px; */
    font-weight: 900;
    width: 100%;
}
.korpa{
    font-size: x-large;
    text-align: center;
}
.istorija{
    font-size: medium;
    margin-bottom: 20px;
}
</style>

<script>
import ig from '../models/igre.json'

export default{
    name: 'Nalog',
    props: ['jezik'],
    data(){
        return{
            korisnik: '',
            korpa: [],
            istorijakorpa: [],
            igre: ig,
            r: {
                SRB: {
                    porukaLogin: 'Da biste videli korpu i istoriju porudžbina, molimo Vas da se ulogujete!',
                    naslovKorpa: 'Moja korpa',
                    praznaKorpa: 'Vaša korpa je trenutno prazna!',
                    thProizvodi: 'Kupljeni proizvodi',
                    thKolicina: 'Količina',
                    thCena: 'Cena',
                    btnObrisi: 'Obriši',
                    ukupnoPorudzbina: 'UKUPNA CENA PORUDŽBINE',
                    btnPoruci: 'PORUČI',
                    naslovIstorija: 'Istorija porudžbina',
                    thDatum: 'Datum porudžbine',
                    thKomada: 'Ukupno komada',
                    thUkupnaCena: 'Ukupna cena',
                    alertPrazno: 'Vaša korpa je prazna!',
                    alertUspeh: 'Uspešna porudžbina!'
                },
                ENG: {
                    porukaLogin: 'To view your cart and order history, please log in!',
                    naslovKorpa: 'My Cart',
                    praznaKorpa: 'Your cart is currently empty!',
                    thProizvodi: 'Purchased Products',
                    thKolicina: 'Quantity',
                    thCena: 'Price',
                    btnObrisi: 'Delete',
                    ukupnoPorudzbina: 'TOTAL ORDER PRICE',
                    btnPoruci: 'PLACE ORDER',
                    naslovIstorija: 'Order History',
                    thDatum: 'Order Date',
                    thKomada: 'Total Pieces',
                    thUkupnaCena: 'Total Price',
                    alertPrazno: 'Your cart is empty!',
                    alertUspeh: 'Order successful!'
                }
            }
        }
    },
    methods: {
        getIme(artikal) {
            let id = artikal.igra || artikal.id || artikal
            let igra = this.igre.find(i => i.id === id);
            return igra ? igra.naziv[this.jezik] : `Igra #${id}`;
        },
        getCenaIgre(id) {
            let igra = this.igre.find(i => i.id === id);
            if (!igra) return 0;
            if (igra.popust > 0) {
                return igra.cena * (1 - igra.popust / 100);
            }
            return igra.cena;
        },
        getUkupnoKomada(proizvodi) {
            let komada = 0;
            proizvodi.forEach(artikal=>{
                komada += artikal.kolicina
            });
            return komada;
        },
        getUkupnaCena(proizvodi) {
            let sum = 0;
            proizvodi.forEach(artikal => {
                const currid = artikal.igra || artikal.id;
                const cenaart = this.getCenaIgre(currid);
                sum += cenaart * artikal.kolicina;
            });
            return sum;
        },
        povecaj(proizvod){
            proizvod.kolicina++;
            this.refreshKorpa();
        },
        smanji(proizvod){
            if(proizvod.kolicina!=1){
                proizvod.kolicina--;
            } else {
                this.ukloni(proizvod);
            }
            this.refreshKorpa();
        },
        ukloni(proizvod){
            this.korpa = this.korpa.filter(p => p.id !== proizvod.id);
            this.refreshKorpa();
        },
        refreshKorpa(){
            localStorage.setItem('korpa',JSON.stringify(this.korpa));
        },
        refreshKorisnici(){
            let korisnici = JSON.parse(localStorage.getItem('korisnici'));
            let index = korisnici.findIndex(k => k.korime === this.korisnik.korime);
            if(index !== -1){
                korisnici[index] = this.korisnik;
                localStorage.setItem('korisnici', JSON.stringify(korisnici));
            }
        },
        poruci(){
            if (this.korpa.length === 0) {
                alert('Vaša korpa je prazna!');
                return;
            }
            const danas = new Date();
            const datumdanas = `${danas.getDate()}.${danas.getMonth()+1}.${danas.getFullYear()}.`;
            let data = {
                datum: datumdanas,
                proizvodi: [...this.korpa]
            }
            this.istorijakorpa.push(data);

            this.korisnik.istorijakorpa = this.istorijakorpa;
            localStorage.setItem('ulogovan', JSON.stringify(this.korisnik));
            this.refreshKorisnici();

            this.korpa = []
            this.refreshKorpa();
            alert('Uspešna porudžbina');
        }
    },
    computed: {
        sortIstorija() {
            return [...this.istorijakorpa].sort((a, b) => {
                const datum = (datumtr) => {
                    //glupa tacka na kraju 
                    const delovi = datumtr.replace(/\.$/, '').split('.');
                    return new Date(delovi[2], delovi[1] - 1, delovi[0]);
                };
                return datum(a.datum) - datum(b.datum);
            });
        },
        cenaKorpe(){
            let sum = 0;
            this.korpa.forEach(p => {
                sum += p.kolicina * this.getCenaIgre(p.id);
            });
            return sum;
        }
    },
    created(){
        let us = localStorage.getItem('ulogovan')
        if(us){
            this.korisnik = JSON.parse(us)
            this.istorijakorpa = this.korisnik.istorijakorpa || []
            let k = localStorage.getItem('korpa')
            if(k){
                this.korpa = JSON.parse(k)
            } else {
                this.korpa = []
            }
        } else {
            this.korisnik = ''
        }
    }
}
</script>
