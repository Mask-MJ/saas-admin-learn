<script setup lang="ts">
import type { PropType } from 'vue';
import type { UploadFileInfo } from 'naive-ui';
import { isArray } from 'lodash-es';

const emits = defineEmits(['update:fileList']);
const attrs = useAttrs();
const props = defineProps({
  name: { type: String, default: 'file' },
  max: { type: Number },
  type: { type: Array, default: () => [] },
  api: {
    type: Function as PropType<(params: UploadFileParams) => Promise<any>>,
    default: () => {},
  },
  value: {
    type: [String, Array] as PropType<
      { url: string; name: string } | { url: string; name: string }[]
    >,
    default: () => [],
  },
});

const getFileList = computed((): UploadFileInfo[] => {
  if (isArray(props.value)) {
    return props.value.map((item) => ({
      id: item.url,
      name: item.name,
      status: 'finished',
      url: item.url,
    }));
  } else {
    return [
      { id: props.value.url, name: props.value.name, status: 'finished', url: props.value.url },
    ];
  }
});

const beforeUpload = async (data: { file: UploadFileInfo; fileList: UploadFileInfo[] }) => {
  if (props.type.length) {
    if (props.type.includes(data.file.file?.type)) {
      return true;
    } else {
      window.$message.error(`只能上传${props.type}格式的文件，请重新上传`);
      return false;
    }
  }
  return true;
};

const getBindValue = computed(() => ({ ...attrs, name: props.name, max: props.max }));

const customRequest = async ({ file }: { file: UploadFileInfo }) => {
  try {
    if (file.status === 'removed') {
      emits('update:fileList', []);
    } else {
      const result = await props.api({
        file: file.file as File,
        fileName: file.name,
      });
      const updatedFileList = Array.isArray(props.value)
        ? [...props.value, result.data]
        : [props.value, result.data];
      emits('update:fileList', updatedFileList);
      window.$message.success('上传成功');
    }
  } catch (error) {
    window.$message.error('上传失败');
  }
};
</script>
<template>
  <n-upload
    v-bind="getBindValue"
    :file-list="getFileList"
    @before-upload="beforeUpload"
    @change="customRequest"
  >
    <n-button>上传文件</n-button>
  </n-upload>
</template>
