<template>
    <div class="toolbar">
        <a-row style="display: flex; justify-content: space-around; align-items: start; padding: 0 40px;">
            <a-col>
                <p style="font-size: 3.2em; color: #FFFFFF; margin-top: 10px">Поиск кино</p>
            </a-col>
            <a-col style="margin-top: 30px; ">
                <slot name="filter"/>
            </a-col>
            <a-col style="margin: 30px 20px 30px 0;" >
                <a-space :size="55">
                    <slot name="buttons">
                        <svg fill="transparent" width="35px" height="35px" viewBox="0 0 1920 1920" xmlns="http://www.w3.org/2000/svg" stroke="transparent" stroke-width="65" style="padding-top: 5px;">
                            <path d="m960.481 1412.11 511.758 307.054V170.586c0-31.274-25.588-56.862-56.862-56.862H505.586c-31.274 0-56.862 25.588-56.862 56.862v1548.578l511.757-307.055ZM1585.963 1920 960.48 1544.711 335 1920V170.586C335 76.536 411.536 0 505.586 0h909.79c94.05 0 170.587 76.536 170.587 170.586V1920Z"/>
                        </svg>
                        <LikeOutlined style="font-size: 35px; color: transparent"/> 
                    </slot>
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
</style>