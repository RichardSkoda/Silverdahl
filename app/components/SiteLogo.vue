<script setup lang="ts">
// Jednoduchý textový wordmark – nejde o oficiální logo společnosti.
// TODO: nahradit oficiálním logem, pokud bude dodáno.
withDefaults(defineProps<{ inverse?: boolean }>(), { inverse: false })
</script>

<template>
  <span class="logo" :class="{ 'logo--inverse': inverse }">
    <svg class="logo__mark" viewBox="0 0 32 32" aria-hidden="true" focusable="false">
      <rect width="32" height="32" rx="6" class="logo__bg" />
      <path d="M9 21.5 16 9l7 12.5" fill="none" class="logo__peak" stroke-width="2.4" stroke-linejoin="round" />
      <path d="M12.2 21.5h7.6" class="logo__base" stroke-width="2.4" />
    </svg>
    <span class="logo__text">Silverdahl</span>
  </span>
</template>

<style scoped>
.logo {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  color: var(--color-navy-800);
}

.logo__mark {
  width: 2rem;
  height: 2rem;
  flex: none;
}

.logo__bg { fill: var(--color-navy-800); }
.logo__peak { stroke: #f4f6fa; }
.logo__base { stroke: var(--color-accent-on-dark); }

.logo--inverse { color: #fff; }
.logo--inverse .logo__bg { fill: #fff; }
.logo--inverse .logo__peak { stroke: var(--color-navy-800); }
.logo--inverse .logo__base { stroke: var(--color-accent); }

.logo__text {
  font-family: var(--font-display);
  font-size: 1.375rem;
  font-weight: 600;
  letter-spacing: 0.01em;
  line-height: 1;
}
</style>
