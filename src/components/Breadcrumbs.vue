<template>
    <div v-if="$route.meta.breadcrumbs && $route.meta.breadcrumbs.length > 0" class="w-100">
        <ol class="breadcrumb">
            <li v-for="(crumb, index) in $route.meta.breadcrumbs" :key="crumb.text + index" class="breadcrumb-item">

                <router-link v-if="crumb.link && index < $route.meta.breadcrumbs.length - 1" :to="crumb.link">
                    <!-- {{ crumb.text }} -->
                    {{ prevediTekst(crumb.text) }}
                </router-link>

                <span v-else>
                    <span v-if="crumb.text === 'Detalji igre'">
                        {{ getNazivIgre() }}
                    </span>
                    <span v-else>
                        {{ prevediTekst(crumb.text) }}
                    </span>
                </span>
            </li>
        </ol>
    </div>
</template>

<style scoped>
.breadcrumb{
    margin-block: 1px;
    padding-block: 0px;
}
.breadcrumb-item a {
    color: rgb(42, 24, 16);
    text-decoration: none;
    font-weight: 600;
}
.breadcrumb-item a:hover {
    text-decoration: underline;
}
.breadcrumb-item span {
    color: gray;
}
</style>

<script>
import igre from '../models/igre.json'
export default{
    name: 'Breadcrumbs',
    props: ['jezik'],
    data() {
        return {
            igre: igre,

            r: {
                SRB: {
                    'Početna': 'Početna',
                    'Login': 'Prijava',
                    'Moj Nalog': 'Moj Nalog',
                    'O Nama': 'O Nama',
                    'Katalog': 'Katalog',
                    'Galerija': 'Galerija'
                },
                ENG: {
                    'Početna': 'Home',
                    'Login': 'Login',
                    'Moj Nalog': 'My Account',
                    'O Nama': 'About Us',
                    'Katalog': 'Catalog',
                    'Galerija': 'Gallery'
                }
            }
        }
    },
    methods: {
        prevediTekst(tekst) {
            if (this.r[this.jezik] && this.r[this.jezik][tekst]) {
                return this.r[this.jezik][tekst];
            }
            return tekst;
        },
        getNazivIgre() {
            // let id = this.$route.params.id;
            // let igra = this.igre.find(ig => ig.id == id);
            // return igra ? igra.naziv[jezik] : 'Detalji igre';

            if (!this.jezik) return '...';
            
            let id = this.$route.params.id;
            let igra = this.igre.find(ig => ig.id == id);
            
            // Popravljeno: dodato "this.jezik" umesto samo "jezik"
            if (igra && igra.naziv && igra.naziv[this.jezik]) {
                return igra.naziv[this.jezik];
            }
            return this.jezik === 'SRB' ? 'Detalji igre' : 'Game Details';

        }
    }
}
</script>