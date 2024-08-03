<template>
    <div class="no-login-popover-container">
        <div class="no-login-popover-item-title">
            <span>{{ props.content }}</span>
        </div>
        <div class="no-login-popover-item-submit">
            <button @click="gologin">立即登录</button>
        </div>
    </div>
</template>
<script setup lang="ts">
const emit = defineEmits(['isLogin']);
const props = defineProps({
    content: {
        type: String,
        default: ''
    }
})
const gologin = () => {
    emit('isLogin',true)
}
</script>

<style scoped lang="scss">
.no-login-popover-container {
    box-sizing: border-box;
    width: 350px;
    height: 130px;
    padding: 20px;
    display: grid;
    place-items: center;
    cursor: pointer;

    .no-login-popover-item-title {
        height: 30px;
        width: 100%;
        text-align: center;
        font-size: 14px;
        color: $text-color;
        margin-bottom: 5px;
        margin-top: 10px;
        span{
            line-height: 14px;
            font-size: 14px;
            color: $text-color;
        }
    }

    .no-login-popover-item-submit {
        width: 100%;
        height: 50px;
        margin-top: 5px;

        button {
            width: 100%;
            height: 36px;
            background-color: $theme-color;
            font-size: 14px;
            color: #ffffff;
            border-radius: 6px;
            border: none;
            cursor: pointer;

            &:hover {
                background-color: $theme-color-hover;
            }
        }        
    }
    
}
</style>