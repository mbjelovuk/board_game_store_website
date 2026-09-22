<template>
    <div>
        <br> <br>
        <div id="galerija" class="w-100">
            <div class="container gallery-container" id="galleryContainer">
                <h2 class="text-center mb-5"><b><u>{{ r[jezik].foto }}</u></b></h2>
                <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">                    
                    <div class="col" v-for="img in images" :key="img.alt">
                        <img :src="img.src" 
                            :class="['img-fluid', 'rounded', 'gallery-item']" 
                            :alt="img.alt"
                            loading="lazy">
                    </div>
                </div>
            </div>
        </div>
        <br> <br>
        <div class="w-a00 videi">
            <div class="container">
                <h2 class="text-center mb-4"><b><u>{{ r[jezik].video }}</u></b></h2> <br>
                <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                    <div class="col" v-for="(video, index) in videos" :key="index">
                        <div class="video-card position-relative rounded overflow-hidden shadow-sm bg-black" @click="playVideo(index)">                        
                            <iframe v-if="activeVideoIndex === index"
                                :src="`https://www.youtube.com/embed/${video.id}?autoplay=1`" 
                                frameborder="0" 
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                allowfullscreen
                                class="w-100 h-100 position-absolute top-0 start-0">
                            </iframe>
                            <template v-else>
                                <img 
                                    :src="`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`" 
                                    class="w-100 h-100 position-absolute top-0 start-0 video-thumb" 
                                    :alt="video.title">
                                <div class="play-btn">
                                    <svg viewBox="0 0 68 48" width="68" height="48">
                                        <path class="btn-bg" d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z" fill="#212121" opacity="0.9"></path>
                                        <polygon points="26,33 45,24 26,15" fill="#fff"></polygon>
                                    </svg>
                                </div>
                                <div class="video-title p-2 text-truncate position-absolute bottom-0 start-0 w-100 text-white">{{ video.title }}</div>
                            </template>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.videi{
    /* margin-left: 20px;
    margin-right: 20px; */
    margin-bottom: 20px;
}
.gallery-container {
    overflow: visible;
}
.gallery-item {
    /* cursor: pointer; */
    object-fit: cover;
    height: 220px;
    width: 100%;
    transition: transform 0.3s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.3s ease, z-index 0.3s;
    position: relative;
    z-index: 1;
}
.gallery-item:hover {
    transform: scale(1.03);
    box-shadow: 0 5px 15px rgba(0,0,0,0.3);
}
.video-card {
    width: 100%;
    padding-bottom: 56.25%;
    height: 0;
    cursor: pointer;
}
.video-thumb {
    object-fit: cover;
    transition: transform 0.2s ease;
}
.play-btn {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
}
.btn-bg {
    transition: fill 0.2s ease;
}
.video-card:hover .video-thumb {
    transform: scale(1.03);
}
.video-card:hover .btn-bg {
    fill: red;
}
.video-title {
    background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
    font-size: 0.95rem;
    z-index: 2;
}
</style>

<script>
    export default{
        name: 'Galerija',
        props: ['jezik'],
        data() {
            return {
                images: [
                    { src: '/slike/enterijer1.jpg', alt: 'Slika 1' },
                    { src: '/slike/enterijer2.jpg', alt: 'Slika 2' },
                    { src: '/slike/enterijer3.jpg', alt: 'Slika 3' },
                    { src: '/slike/enterijer4.jpg', alt: 'Slika 4' },
                    { src: '/slike/enterijer5.jpg', alt: 'Slika 5' },
                    { src: '/slike/enterijer6.jpg', alt: 'Slika 6' },
                    { src: '/slike/ppl1.jpg', alt: 'Slika 7' },
                    { src: '/slike/game1.jpg', alt: 'Slika 10' },
                    { src: '/slike/game2.jpg', alt: 'Slika 11' },
                    { src: '/slike/game4.jpg', alt: 'Slika 13' },
                    { src: '/slike/game5.jpg', alt: 'Slika 14' },
                    { src: '/slike/game6.jpg', alt: 'Slika 15' }
                ],
                activeVideoIndex: null,
                videos: [
                    { id: 'ItihOOB9_Ec', title: 'Top 10 Best Beginner Board Games Of All Time' },
                    { id: 'zQVHkl8oQEU', title: 'How to Play Codenames in 3 Minutes' },
                    { id: 'T4VIsCPxVZE', title: 'Top 5 best card games of all time' },
                    { id: 'oGg-6PxCjIk', title: 'Kako se igra? Catan!' },
                    { id: 'mA-WneYAdPY', title: '5 party igara za praznike - Šta igrati sa društvom i familijom?' },
                    { id: 'XQls9E2PXWM', title: 'Catan TURNIR, 26. jun, Subotica / Najava' }
                ],
                r: {
                    SRB: {
                        foto: 'Galerija slika',
                        video: 'Video galerija'
                    },
                    ENG: {
                        foto: 'Photo Gallery',
                        video: ' Video Gallery'
                    }
                }
            }
        },
        methods: {
            playVideo(index) {
                this.activeVideoIndex = index;
            }
        }
    }
</script>