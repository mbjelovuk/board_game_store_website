<template>
  <div>
    <br>
    <h1 class="text-center">{{ isLogin ? r[jezik].naslovLogin : r[jezik].naslovRegister }}</h1>
    <br>
    <div class="container auth-kontejner p-4 text-center">
      <div class="row d-flex justify-content-center">
        <div class="col-2"></div>
        <div class="col-8 d-flex justify-content-center">
          <table>
            <tbody>
              <tr v-if="!isLogin">
                <td>{{ r[jezik].lblIme }}:</td>
                <td>
                  <input type="text" name="ime" v-model="ime">
                </td>
              </tr>
              <tr>
                <td>{{ r[jezik].lblKorime }}:</td>
                <td>
                  <input type="text" name="korime" v-model="korime">
                </td>
              </tr>
              <tr>
                <td>{{ r[jezik].lblLozinka }}:</td>
                <td>
                  <input type="password" name="lozinka" v-model="lozinka">
                </td>
              </tr>
              <tr>
                <td colspan="2">
                  <button @click="log()" class="btn btn-success w-100 dugme">
                    {{ isLogin ? r[jezik].btnPrijava : r[jezik].btnRegistracija }}
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="col-2"></div>
      </div>
      <p class="mt-3 small">
        {{ isLogin ? r[jezik].pitanjeNemate : r[jezik].pitanjeImate }}
        <a href="#" @click.prevent="isLogin = !isLogin" class="text-success fw-bold tekst">
          {{ isLogin ? r[jezik].linkRegistrujSe : r[jezik].linkUlogujSe }}
        </a>
      </p>
      <br> <br>
      <div class="row">
        <div class="col-3">
          <button @click="nazad()" class="btn btn-success dugme">{{ r[jezik].btnNazad }}</button>
        </div>
        <div class="col-9"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dugme{
  background-color: darkcyan;
}
.tekst{
  color: darkcyan !important;
}
.auth-kontejner{
  justify-content: center;
  align-content: center;
}
</style>

<script>
import kor from '../models/korisnik.json'

export default{
  name: 'Login',
  props: ['jezik'],
  data() {
    return {
      isLogin: true,
      ime: '',
      korime: '',
      lozinka: '',
      korisnici: [],
      r: {
        SRB: {
          naslovLogin: 'Ulogujte se na platformu',
          naslovRegister: 'Registrujte se na platformu',
          lblIme: 'Ime',
          lblKorime: 'Korisničko ime',
          lblLozinka: 'Lozinka',
          btnPrijava: 'Prijava',
          btnRegistracija: 'Registracija',
          pitanjeNemate: 'Nemate nalog?',
          pitanjeImate: 'Već imate nalog?',
          linkRegistrujSe: 'Registrujte se',
          linkUlogujSe: 'Ulogujte se',
          btnNazad: 'Nazad na početnu',
          alertGreska: 'Pogrešno korisničko ime/lozinka',
          alertZauzeto: 'Zauzeto korisničko ime',
          alertUspeh: 'Uspešna registracija!'
        },
        ENG: {
          naslovLogin: 'Log in to the platform',
          naslovRegister: 'Register on the platform',
          lblIme: 'Name',
          lblKorime: 'Username',
          lblLozinka: 'Password',
          btnPrijava: 'Login',
          btnRegistracija: 'Register',
          pitanjeNemate: "Don't have an account?",
          pitanjeImate: 'Already have an account?',
          linkRegistrujSe: 'Register here',
          linkUlogujSe: 'Log in here',
          btnNazad: 'Back to home',
          alertGreska: 'Wrong username/password',
          alertZauzeto: 'Username is taken',
          alertUspeh: 'Registration successful!'
        }
      }
    };
  },
  methods: {
    log(){
      let korpa = []
      if(this.isLogin){ //loginn
        const ima = this.korisnici.find(k => k.korime === this.korime && k.lozinka === this.lozinka);
        if(ima){
          localStorage.setItem('ulogovan',JSON.stringify(ima));
          localStorage.setItem('korpa',JSON.stringify(korpa));
          this.$router.push('/');
        }else{
          alert('Pogrešnan mail/lozinka')
        }
      }else{ //registracija
        if (this.korisnici.some(k => k.korime === this.korime)) {
          alert('Zauzeto kor. ime');
          return;
        }
        let kk = {
          'ime': this.ime,
          'korime': this.korime,
          'lozinka': this.lozinka,
          'istorijakorpa':[]
        }
        this.korisnici.push(kk);
        localStorage.setItem('korisnici', JSON.stringify(this.korisnici));
        alert('Uspeh');
        this.ime = '';
        this.korime = '';
        this.lozinka = '';
        this.isLogin = true;
      }
    },
    nazad(){
      this.ime = '';
      this.korime = '';
      this.lozinka = '';
      this.isLogin = true;
      this.$router.push('/');
    }
  },
  created(){
    const users = localStorage.getItem('korisnici');
    if(users){
      this.korisnici = JSON.parse(users);
    }else{
      this.korisnici = kor;
      localStorage.setItem('korisnici',JSON.stringify(kor));
    }
  }
}
</script>
