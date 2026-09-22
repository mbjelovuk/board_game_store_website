<template>
    <div id="navbar" class="d-flex align-items-center justify-content-center sakrij-za-print d-print-none">
        <router-link to="/" class="rlink">{{ r[jezik || 'SRB'].pocetna }}</router-link>
        <router-link to="/galerija" class="rlink">{{ r[jezik || 'SRB'].galerija }}</router-link>
        <router-link to="/katalog" class="rlink">{{ r[jezik || 'SRB'].katalog }}</router-link>
        <router-link to="/mojnalog" class="rlink">{{ r[jezik || 'SRB'].mojNalog }}</router-link>
        <router-link to="/onama" class="rlink">{{ r[jezik || 'SRB'].oNama }}</router-link>
    </div>
</template>

<style scoped>
#navbar {
    text-align: center;
    color: white;
    background-image: linear-gradient(rgba(245, 222, 179, 0.6), rgba(245, 222, 179, 0.6)),url('../assets/pozadina.jpg');
    background-repeat: repeat;
    border-top: solid black 1px;
    border-bottom: solid black 1px;
   
    box-sizing: border-box;
    width: 100%;
    flex-wrap: wrap;

    min-height: 10vh;
}
.rlink {
    margin-left: 5px;
    margin-right: 5px;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    font-weight: 700;
    font-size: 3vh;
    letter-spacing: 0.1vh;
    padding: 0.5vh;
    text-transform: uppercase;
    color: black;
    text-decoration: none;
    text-shadow: 
    -3px -3px 0 white,  
     3px -3px 0 white,
    -3px  3px 0 white,
     3px  3px 0 white,
    -3px  0px 0 white,
     3px  0px 0 white,
     0px -3px 0 white,
     0px  3px 0 white,
     4px  4px 5px rgba(0, 0, 0, 0.3);
}
.rlink:hover{
    color: rgb(243, 202, 125);
}
.router-link-exact-active {
    color: darkcyan;
    font-weight: bold;
}
</style>

<script>
export default{
    name: 'Nav',
    props: ['jezik'],
    data(){
        return {
            r: {
                SRB: {
                    pocetna: 'Početna',
                    galerija: 'Galerija',
                    katalog: 'Katalog',
                    mojNalog: 'Moj nalog',
                    oNama: 'O nama'
                },
                ENG: {
                    pocetna: 'Home',
                    galerija: 'Gallery',
                    katalog: 'Catalog',
                    mojNalog: 'My account',
                    oNama: 'About us'
                }
            }
        }
    }
}
</script>