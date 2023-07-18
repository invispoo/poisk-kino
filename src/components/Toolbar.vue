<template>
    <!--Верхняя панель сайта-->
    <div class="toolbar">
        <a-row class="toolbar-container">
            <a-col>
                <p class="toolbar-title">Поиск кино</p>
            </a-col>
            <a-col style="margin-top: 30px; ">
                <slot name="filter"/>
            </a-col>
            <a-col style="margin: 30px 20px 30px 0;" >
                <a-space :size="55">
                    <slot name="buttons"/>
                </a-space>
            </a-col>
        </a-row>
    </div>
</template>

<script>
    import { LikeOutlined } from '@ant-design/icons-vue'
    export default {
        components: {
            LikeOutlined
        }
    }
</script>

<style>
    .toolbar {
        box-sizing: border-box;
        background-color: #616161;
        width: 100%;
        height: 100px;
    }

    .toolbar-container {
        display: flex;
        justify-content: space-around; 
        align-items: start; 
        padding: 0 40px;
    }

    .toolbar-title {
        font-size: 3.2em; 
        font-weight: 600;
        color: #FFFFFF; 
        margin-top: 10px;
    }
</style>