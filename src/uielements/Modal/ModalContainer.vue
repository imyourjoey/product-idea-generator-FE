<template>
  <div
    class="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full flex"
  >
    <div class="relative w-full max-w-2xl max-h-full m-auto">
      <div class="relative bg-white rounded-lg shadow">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
