<template>
    <div class="app-bar">
        <button
            class="btn-menu"
            @click="$emit('click', $event)"
        >
            <i class="material-icons md-32">menu</i>
        </button>
        <h1 class="title">{{ title }}</h1>
    </div>
</template>

<script>
export default {
    name: 'app-bar',
    props: {
        title: {
            type: String,
            required: true
        }
    }
}
</script>

<style src="./AppBar.css" scoped></style>
