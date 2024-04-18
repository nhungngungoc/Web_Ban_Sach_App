<template>
    <v-app>
        <HeaderHome />
        <div class="d-flex mx-auto justify-center justify-space-between"
            style="margin-top: 90px;height: 64px;width: 99%;">
            <div class="d-flex flex-column align-center px-2 py-1"
                style="border-radius: 5px;background-color: #EBF2FF;">
                <v-img width="20px" height="20px" :src="hanger_png"></v-img>
                <p style="color: #2979FF;font-size: 14px;">Clothing & Shoes</p>
            </div>
            <div class="d-flex flex-column align-center px-2 py-1">
                <v-img width="20px" height="20px" :src="cinema_png"></v-img>
                <p style="color: #787885;font-size: 14px;">Entertainment</p>
            </div>
            <div class="d-flex flex-column align-center px-2 py-1">
                <v-img width="20px" height="20px" :src="concert_png"></v-img>
                <p style="color: #787885;font-size: 14px;">Music</p>
            </div>

            <div class="d-flex flex-column align-center px-2 py-1">
                <v-img width="20px" height="20px" :src="fitness_png"></v-img>
                <p style="color: #787885;font-size: 14px;">Sport & Lifestyle</p>
            </div>

            <div class="d-flex flex-column align-center px-2 py-1">
                <v-img width="20px" height="20px" :src="pets_png"></v-img>
                <p style="color: #787885;font-size: 14px;">Pets</p>
            </div>

            <div class="d-flex flex-column align-center px-2 py-1">
                <v-img width="20px" height="20px" :src="restaraunt_png"></v-img>
                <p style="color: #787885;font-size: 14px;">Kitchen Accessories</p>
            </div>

            <div class="d-flex flex-column align-center px-2 py-1">
                <v-img width="20px" height="20px" :src="observation_png"></v-img>
                <p style="color: #787885;font-size: 14px;">Travel Equipment</p>
            </div>

            <div class="d-flex flex-column align-center px-2 py-1">
                <v-img width="20px" height="20px" :src="barley_png"></v-img>
                <p style="color: #787885;font-size: 14px;">Growing & Garden</p>
            </div>

            <div class="d-flex flex-column align-center px-2 py-1">
                <v-img width="20px" height="20px" :src="powerstation_png"></v-img>
                <p style="color: #787885;font-size: 14px;">Electrical Tools</p>
            </div>

            <div class="d-flex flex-column align-center px-2 py-1">
                <v-img width="20px" height="20px" :src="babysitter_png"></v-img>
                <p style="color: #787885;font-size: 14px;">Mother Care</p>
            </div>

            <div class="d-flex flex-column align-center px-2 py-1">
                <v-img width="20px" height="20px" :src="nuclear_station_png"></v-img>
                <p style="color: #787885;font-size: 14px;">Toys & Entertainment</p>
            </div>

            <div class="d-flex flex-column align-center px-2 py-1">
                <v-img width="20px" height="20px" :src="ship_wheel_png"></v-img>
                <p style="color: #787885;font-size: 14px;">Vintage</p>
            </div>
        </div>

        <div class="d-flex justify-center" style="width: 100%;">
            <div style="width: 25%;">
                <category-home />
            </div>
            <div style="width: 75%;">
                <ProductView />
            </div>
        </div>
    </v-app>
</template>
<script setup>
import hanger_png from "@/assets/hanger.png"
import cinema_png from "@/assets/cinema.png"
import concert_png from "@/assets/concert.png"
import fitness_png from "@/assets/fitness.png"
import pets_png from "@/assets/pets.png"
import restaraunt_png from "@/assets/restaraunt.png"
import observation_png from "@/assets/observation.png"
import barley_png from "@/assets/barley.png"
import powerstation_png from "@/assets/powerstation.png"
import babysitter_png from "@/assets/babysitter.png"
import nuclear_station_png from "@/assets/nuclear-station.png"
import ship_wheel_png from "@/assets/ship-wheel.png"
import ProductView from "@/views/Home/ProductView.vue"
import HeaderHome from "./components/HeaderHome.vue"
import CategoryHome from "./components/CategoryHome.vue"
</script>