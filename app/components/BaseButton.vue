<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    to?: string
    variant?: 'primary' | 'secondary' | 'inverse'
    type?: 'button' | 'submit'
    disabled?: boolean
  }>(),
  { to: undefined, variant: 'primary', type: 'button', disabled: false },
)
</script>

<template>
  <NuxtLink v-if="props.to" :to="props.to" class="btn" :class="`btn--${props.variant}`">
    <slot />
  </NuxtLink>
  <button v-else :type="props.type" class="btn" :class="`btn--${props.variant}`" :disabled="props.disabled">
    <slot />
  </button>
</template>

<style scoped>
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  min-height: 3rem;
  padding: 0.75rem 1.4rem;
  border: 1px solid transparent;
  border-radius: var(--radius);
  font: inherit;
  font-size: var(--text-sm);
  font-weight: 600;
  letter-spacing: 0.01em;
  line-height: 1.2;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  transition: background-color var(--transition), border-color var(--transition), color var(--transition);
}

.btn--primary {
  background: var(--color-navy-800);
  color: #fff;
}

.btn--primary:hover {
  background: var(--color-navy-900);
  color: #fff;
}

.btn--secondary {
  background: transparent;
  border-color: var(--color-border-strong);
  color: var(--color-navy-800);
}

.btn--secondary:hover {
  border-color: var(--color-navy-800);
  color: var(--color-navy-900);
}

.btn--inverse {
  background: #fff;
  color: var(--color-navy-800);
}

.btn--inverse:hover {
  background: var(--color-navy-50);
  color: var(--color-navy-900);
}

.btn:disabled {
  opacity: 0.6;
  cursor: progress;
}
</style>
