<template>
    <div id="app-container">
      <header class="d-flex align-items-center p-3 sakrij-za-print d-print-none">
        <div class="flex-fill w-100">
          <img src="./assets/logo.jpg" id="logo">
        </div>
        <h1 class="text-center m-0 head"><b>DARK DICE</b></h1>
        <div class="header-strana text-end flex-fill w-100">
          <div class="jezik-prekidac">
            <span class="lang-btn" :class="{aktivna: jezik==='SRB'}" @click="promeniJezik('SRB')">SRB</span>
            <span class="lang-divider">|</span>
            <span class="lang-btn" :class="{aktivna: jezik==='ENG'}" @click="promeniJezik('ENG')">ENG</span>
          </div>
        </div>
      </header>
      <div v-if="$route.path !== '/login'" class="d-print-none">
        <div v-if="this.korisnik===''" class="text-center py-2 login ">
          <router-link to="/login" class="aa fw-bold">{{ r[jezik].ulogujteSe }}</router-link>
          <span class="text-white-50 mx-2">{{ r[jezik].daBisteKupovali }}</span>
        </div>
        <div v-if="this.korisnik!==''" class="login py-2 text-center">
          {{ r[jezik].dobrodosli }} {{ this.korisnik.ime }}!
          <button class="logout" @click="logout()">{{ r[jezik].izlogujteSe }}</button>
        </div>
        <Nav :jezik="jezik"></Nav>
      </div>
      <Breadcrumbs class="breadcrumbz w-100" :jezik="jezik"></Breadcrumbs>
      <div class="glavni-deo">
        <router-view :jezik="jezik"></router-view>
      </div>
      <footer>
        <h6>Copyright 2026 - {{ r[jezik].autori }}</h6>
        <p class="m-0">{{ r[jezik].fakultet }}</p>
      </footer>
    </div>
</template>

<style>
#app-container{
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
/* #app{
  background-color: rgb(243, 226, 194);
  min-height: 600px;
  margin: 0;
  padding: 0;
  width: 100%;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, sans-serif;
  min-width: 800px;  
} */
html, body, #app{
  background-color: rgb(243, 226, 194);
  min-height: 100vh;
  margin: 0;
  padding: 0;
  width: 100%;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, sans-serif;
}
.breadcrumbz{
  padding-inline: 15px;
  background-color: transparent;
  border-bottom: 1px solid black;
}
.logout{
  background: transparent;
  border: none;
  color: darkcyan;
  font-weight: bold;
  cursor: pointer;
  padding: 0;
}
.logout:hover{
  color: wheat;
  text-decoration: underline;
}
.aa{
  text-decoration: none;
  color: darkcyan !important;
  font-size: medium;
}
.aa:hover{
  color: wheat !important;
  text-decoration: underline;
}
.login{
  background: linear-gradient(135deg, #111111 0%, #222222 100%);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
  color: white;
  border-bottom: 3px solid rgb(243, 202, 125);
}
.glavni-deo{
  flex: 1;
}
footer{
  text-align: center;
  border-top: black solid 2px;
  max-height: 5vh;
  padding: 5px 0;
}
header{
  background: linear-gradient(135deg, #111111 0%, #222222 100%);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
  border-bottom: 1px solid rgb(243, 202, 125);
  color: white;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  height: 14vh;
}
.head{
  text-align: center;
  font-weight: 900;
  letter-spacing: 3px;
  color: rgb(243, 202, 125);
  text-shadow: 0 0 10px rgba(255, 193, 7, 0.3);
  white-space: nowrap;
}
#logo{
  height: 55px;
  margin-left: 10px;
  margin-right: 10px;
  padding: 2px;
}
.jezik-prekidac{
  display: inline-block;
  background-color: rgba(255, 255, 255, 0.1);
  padding: 6px 12px;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  margin-right: 10px;
  margin-left: 10px
}
.lang-btn{
  font-size: small;
  font-weight: bold;
  color: white;
  cursor: pointer;
}
.lang-btn:hover{
  color: white;
}
.lang-btn.aktivna{
  color: darkcyan;
}
.lang-divider{
  color: grey;
  margin: 0 8px;
}
</style>

<script>
import Breadcrumbs from './components/Breadcrumbs.vue';
import Nav from './components/Nav.vue'

export default {
  name: 'App',
  components: {
    Nav, Breadcrumbs
  },
  data(){
    return{
      korisnik: '',
      jezik: localStorage.getItem('izabraniJezik') || 'SRB',
      r: {
        SRB: {
          dobrodosli: 'Dobrodošli',
          ulogujteSe: 'Ulogujte se',
          daBisteKupovali: 'da biste mogli da kupujete online!',
          izlogujteSe: 'Izlogujte se',
          autori: 'autori: Bjelovuk Aleksandar i Bjelovuk Milica',
          fakultet: 'Odsek za softversko inženjerstvo Elektrotehničkog fakulteta Univerziteta u Beogradu'
        },
        ENG: {
          dobrodosli: 'Welcome',
          ulogujteSe: 'Log in',
          daBisteKupovali: 'to be able to shop online!',
          izlogujteSe: 'Log out',
          autori: 'authors: Bjelovuk Aleksandar and Bjelovuk Milica',
          fakultet: 'Department of Software Engineering, School of Electrical Engineering, University of Belgrade'
        }
      }
    }
  },
  methods: {
    promeniJezik(j) {
      this.jezik = j;
      localStorage.setItem('izabraniJezik', j);
    },
    loguser() {
      let u = localStorage.getItem('ulogovan');
      if (u) {
        this.korisnik = JSON.parse(u);
      } else {
        this.korisnik = '';
      }
    },
    logout(){
      localStorage.removeItem('ulogovan');
      localStorage.removeItem('korpa');
      this.loguser();
      if (this.$route.path !== '/') {
        this.$router.push('/');
      }
    }
  },
  created() {
    this.loguser();
  },
  watch: {
    $route() {
      this.loguser(); //kao doc.onready u jquery
    }
  }
}
</script>
