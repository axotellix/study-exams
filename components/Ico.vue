
<!-- [ COMPONENT: ICO ] -->
<template>
<div>

    <!-- ico: arrow sort up -->
    <svg v-if="type == 'arrow-sort-up'" class="ico" :class="this.params ? 'asc' : 'desc'">
        <use xlink:href="/img/icons/sprites.svg#arrow-sort-up"></use>
    </svg>

    <!-- ico: arrow go back -->
    <svg v-if="type == 'arrow-go-back'" class="ico">
        <use xlink:href="/img/icons/sprites.svg#arrow-go-back"></use>
    </svg>

    <!-- ico: search -->
    <svg v-if="type == 'search'" class="ico">
        <use xlink:href="/img/icons/sprites.svg#search"></use>
    </svg>

    <!-- ico: house -->
    <svg v-if="type == 'apartment'" class="ico">
        <use xlink:href="/img/icons/sprites.svg#house"></use>
    </svg>

    <!-- ico: house -->
    <svg v-if="type == 'car'" class="ico">
        <use xlink:href="/img/icons/sprites.svg#car"></use>
    </svg>

</div>
</template>

<script>
export default {
    // [ Component name ]
    name: 'Ico',

    props: ['type', 'params']

}
</script>