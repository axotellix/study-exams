
<!-- [ COMPONENT: SIDEBAR ] -->
<template>
<div class="sidebar">

    <!-- nav -->
    <div class="nav">
        <ul>
            <li class = 'navlink'><nuxt-link to='/'>Главная</nuxt-link></li>
            <li class = 'navlink'><nuxt-link to='/ads'>Объявления</nuxt-link></li>
            <li class = 'navlink'><nuxt-link to='/about'>О нас</nuxt-link></li>
        </ul>
    </div>

    <!-- widget -->
    <div class="widget">
        <h2>Всего объявлений:</h2>
        <p><span>машины:</span> {{ widget.cars }}</p>
        <p><span>квартиры:</span>{{ widget.apartments }}</p>
    </div>

</div>
</template>

<script>
export default {
    // [ Component name ]
    name: 'Sidebar',


    // [ Props ]
    props: ['widget'],

}
</script>