<template>
  <div class="flex flex-row gap-x-2 items-center">
    <template v-for="n in length" :key="n">
      <input
        ref="otpInputEle"
        v-model="otpArray[n - 1]"
        type="text"
        maxlength="1"
        class="border rounded-lg w-14 px-3 py-5 text-xl text-center border-[#D8DaDc] focus:border-primary-black focus:ring-0 focus:outline-none"
        :class="{ 'border-red-500': otpIsValid !== null && !otpIsValid }"
        @input="handleOtpInput($event, n - 1)"
        @keyup="handleDeleteOnly($event, n - 1)"
      />
    </template>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  length: {
    type: Number,
    default: 4
  },
  otpArr: {
    type: Array,
    required: true
  },
  otpIsValid: {
    type: Boolean,
    default: null
  }
})

// eslint-disable-next-line vue/no-setup-props-destructure
const otpArray = ref(props.otpArr)
const otpInputEle = ref(null)

const handleOtpInput = (e, i) => {
  if (i === 0 && e.data === null) {
    return
  }

  if (e.data === null && e.target.previousElementSibling) {
    e.target.previousElementSibling.focus()
    return
  }

  if (!e.data.match(/^[0-9]$/) && e.data !== null) {
    otpArray.value[i] = ''
    return
  }

  if (e.data && e.data.match(/^[0-9]$/) && e.target.nextElementSibling) {
    e.target.nextElementSibling.focus()
  }
}

function handleDeleteOnly(e, i) {
  if (i === 0) return
  if (e.key === 'Backspace' || e.key === 'Delete') {
    if (otpArray.value[i] === '' || (otpArray.value[i] === null && i > 0)) {
      otpArray.value[i - 1] = ''
      e.target.previousElementSibling.focus()
      return
    }
  } else return
}

onMounted(() => {
  otpInputEle.value[0].focus()
  for (let i = 0; i < props.length; i++) {
    otpArray.value[i] = ''
  }
})
</script>
