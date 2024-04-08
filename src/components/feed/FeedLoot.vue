<script setup lang="ts"></script>

<template>
    <div v-if="feedStore.activeRoomObject">
        <div class="o-feed__item">
            <img
                class="a-image --contain o-feed__image"
                v-if="feedStore.activeRoomObject.image && !feedStore.activeRoomObject.isSearched"
                :src="feedStore.activeRoomObject.image"
                alt=""
            />
            <img
                class="a-image --contain o-feed__image"
                v-else-if="feedStore.activeRoomObject.imageSearched && feedStore.activeRoomObject.isSearched"
                :src="feedStore.activeRoomObject.imageSearched"
                alt=""
            />
            <p class="a-text">
                {{
                    feedStore.activeRoomObject.isLocked
                        ? `Locked ${feedStore.activeRoomObject.name}`
                        : feedStore.activeRoomObject.name
                }}
            </p>
            <template v-if="feedStore.activeRoomObject.isSearched">
                <template v-if="feedStore.activeRoomObject.items.length">
                    contains:
                    <p v-for="lootItem in feedStore.activeRoomObject.items" :key="lootItem.id" class="a-text">
                        {{ lootItem.name }}
                        <button class="a-button" @click="getItem(feedStore.activeRoomObject!, lootItem)">take</button>
                    </p>
                </template>
                <p v-else>empty!</p>
            </template>
            <button
                v-if="!feedStore.activeRoomObject.isSearched"
                @click="openContainer(feedStore.activeRoomObject!)"
                class="a-button action__button"
            >
                {{ feedStore.activeRoomObject.isLocked ? 'Unlock' : 'Open' }}
            </button>
            <transition name="slide">
                <p v-if="containerMessage" class="test">{{ containerMessage }}</p>
            </transition>
        </div>
    </div>
</template>
