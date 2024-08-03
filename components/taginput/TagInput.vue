<template>
    <div class="tag-input">
        <div class="tag-input-container" :class="isFocus ? 'isfocus' : ''">
            <div class="tag-pre-wrp">
                <div class="label-item-container" v-for="(item, index) in tags" :key="index">
                    <p class="label-item-content">{{ item }}</p>
                    <el-icon  @click="removeTag(index)"><ElIconClose /></el-icon>
                </div>
            </div>
            <div class="input-instance">
                <el-input
                    type="text"
                    maxlength="20"
                    placeholder="按回车键Enter创建标签"
                    class="input-val"
                    v-model="input"
                    @focus="isFocus = true;"
                    @blur="isFocus = false;"
                    @keyup.enter="addTag"
                />
            </div>
            <p class="tag-last-wrp">还可以添加{{ 10 - tags.length }}个标签</p>
        </div>
    </div>
</template>
<script setup lang="ts">
const isFocus = ref(false);
const input = ref('');
const tags = ref<string[]>([]);
const emit = defineEmits(['updateTags']);
const props = defineProps({
    // 用于接收点击添加的标签，在watch里监听变化，使用v-model:sendTag进行双向绑定
    sendTag: {
        type: String,
        default() {
            return "";
        }
    }
})
const addTag = () => {
    const tag = input.value.trim();
    if (tag.length <= 0 || tags.value.length >= 10) {
        return;
    }
    if (tags.value.findIndex(curr=>curr==tag) != -1) {
        ElMessage.error("标签已存在，不能重复添加");
        return;
    }
    tags.value.push(tag);
    input.value = "";
    // console.log("添加的标签: ", tags.value);
    // console.log("添加的标签: ", this.tags);
    emit("updateTags", tags.value);
}
const removeTag = (index: number) => {
    tags.value.splice(index, 1);
    emit("updateTags", tags.value);
}
watch(
    () => props.sendTag,
    (newVal, oldVal) => {
        if (tags.value.length >= 10) {
            return;
        }
        if (newVal != oldVal && newVal != "") {
            tags.value.push(newVal);
            // console.log("添加的标签: ", tags.value);
            emit("updateTags", tags.value);
        }
    }
)


</script>
<style lang="scss" scoped>
.tag-input {
    width: 100%;
    .tag-input-container {
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        border: 1px solid #dcdfe6;
        border-radius: 4px;
        padding: 0 12px;
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        transition: border .3s ease;

        &:hover {
            border: 1px solid #00a1d6;
        }

        .tag-pre-wrp {
            display: flex;
            flex-wrap: wrap;

            .label-item-container {
                margin: 4px 6px 4px 0;
                background: #00a1d6;
                border-radius: 4px;
                display: flex;
                align-items: center;
                padding: 0 9px 0 11px;
                color: #ffffff;
                height: 30px;
                cursor: pointer;

                .label-item-content {
                    line-height: 30px;
                    height: 30px;
                    max-width: 240px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    -webkit-user-select: none;
                    -moz-user-select: none;
                    -ms-user-select: none;
                    user-select: none;
                    font-size: 12px;
                }
            }
        }

        .input-instance {
            flex: 1;
            min-width: 240px;
            margin: 6px 0;

            .input-val {
                display: block;
                width: 100%;
                color: #222;
                line-height: 22px;
                height: 22px;
                font-size: 14px;
                outline: 0;
                -webkit-appearance: none;
                -moz-appearance: none;
                appearance: none;
                border: 0;
                background-color: transparent;

                :deep(.el-input__wrapper) {
                    padding: unset;
                    box-shadow: none;
                    width: 100%;
                }

                :deep(.el-input__inner) {
                    height: unset;
                    line-height: unset;
                }
            }
        }

        .tag-last-wrp {
            font-size: 14px;
            color: #858585;
            margin: 10px 0 10px 12px;
            cursor: default;
        }
    }

    .isfocus {
        border: 1px solid $theme-color;
    }
}

</style>