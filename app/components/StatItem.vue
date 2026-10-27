<script setup lang="ts">
withDefaults(
  defineProps<{
    value: string
    label: string
    inverse?: boolean
  }>(),
  { inverse: false },
)
</script>

<template>
  <div class="stat" :class="{ 'stat--inverse': inverse }">
    <dt class="stat__label">{{ label }}</dt>
    <dd class="stat__value">{{ value }}</dd>
  </div>
</template>

<style scoped>
.stat {
  display: flex;
  flex-direction: column-reverse;
  justify-content: flex-end;
  gap: var(--space-3);
  padding-top: var(--space-5);
  border-top: 1px solid var(--color-border-strong);
}

.stat__value {
  margin: 0;
  font-family: var(--font-display);
  font-size: var(--text-3xl);
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1.05;
  color: var(--color-navy-800);
}

.stat__label {
  color: var(--color-text-muted);
  font-size: var(--text-sm);
}

.stat--inverse .stat__value {
  color: #fff;
}

.stat--inverse .stat__label {
  color: var(--color-text-inverse-muted);
}
</style>
