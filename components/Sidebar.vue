
<!-- [ COMPONENT: SIDEBAR ] -->
<template>
<div class="sidebar">

    <!-- nav -->
    <div class="nav">
        <ul>
            <li class = 'navlink'><router-link to='/'>Главная</router-link></li>
            <li class = 'navlink'><router-link to='/ads'>Объявления</router-link></li>
            <li class = 'navlink'><router-link to='/about'>О нас</router-link></li>
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