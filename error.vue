<script setup lang="ts">
const router = useRouter();
useHead({
    title: '',
    link: [
        { rel: '', href: '' }
    ]
})
const props = defineProps({
  error: Object
})

const handleError = () => {
    clearError();
    router.go(-1);
}

</script>

<template>
    <Title>出错啦! - v.hblog.top</Title>
    <NuxtLayout name="publiclayout">
        <div class="error-body">
            <img src="~/assets/img/error.png" alt="">
            <div class="error-body-content">
                <div class="error-massage">
                    <!-- <h1>{{ error.statusCode }} not found</h1>  -->
                    <h3>休息一下吧，或者看看别的吧！</h3>
                </div>
                <div class="error-body-content-button">
                    <button @click="handleError">返回上一页</button>
                </div>
            </div>
        </div>
    </NuxtLayout>
</template>

<style lang="scss" scoped>
.error-body {
    position: relative;
    top: 80px;
    width: 980px;
    height: 600px;
    margin: 0 auto;
    background: #fffefe;
    padding-bottom: 20px;
    display: flow-root;
    img {
        width: 100%;
        width: 100%;
    }
    .error-body-content {

        .error-massage {
            display: flex;
            justify-content: center;
            h3 {
                align-items: center;
                color: $item-color--;
                font-family: "HarmonyOS_Sans_SC_Medium";
            }
        }
        
        .error-body-content-button {
            position: relative;
            top: 20px;
            display: flex;
            justify-content: center;
            border-top: 4px dashed $theme-color;
            button {
                position: relative;
                top: 40px;
                height: 40px;
                width: 160px;
                border-radius: 6px;
                border: none;
                color: #ffffff;
                background-color: $theme-color;
                cursor: pointer;
                font-family: "HarmonyOS_Sans_SC_Medium";
            }

            button:hover {
                background-color: $theme-color-hover;
            }
        }
        
    }

}
</style>